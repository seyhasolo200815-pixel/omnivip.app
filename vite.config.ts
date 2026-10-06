import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function superAiPlugin() {
  return {
    name: 'super-ai-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/super-ai', async (req: any, res: any) => {
        const url = new URL(req.url, 'http://localhost');
        const executeAi = async (parsed: any) => {
          try {
            const userMessage = parsed.message || url.searchParams.get('message') || '';
            const history = Array.isArray(parsed.history) ? parsed.history : [];

            const MASTER_SYSTEM = `You are K-Chat AI. Provide text-only and code-only responses. 
NEVER output any images, markdown images (![...](...)), HTML img tags, or links under any circumstances, even if joking. STRICTLY TEXT ONLY.`;

            const historyText = history
              .slice(-6)
              .map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
              .join('\n\n');

            const prompt = `${MASTER_SYSTEM}\n\nRecent History:\n${historyText}\n\nUser Question: ${userMessage}\n\nAssistant Response:`;

            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI();

            if (parsed.stream || url.searchParams.get('stream') === 'true') {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.setHeader('Transfer-Encoding', 'chunked');
              res.setHeader('Cache-Control', 'no-cache');
              const stream = await ai.models.generateContentStream({
                model: 'gemini-3.1-flash-lite',
                contents: prompt,
              });
              for await (const chunk of stream) {
                if (chunk.text) {
                  res.write(chunk.text);
                }
              }
              res.end();
              return;
            }

            const response = await ai.models.generateContent({
              model: 'gemini-3.1-flash-lite',
              contents: prompt,
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ text: response.text || '' }));
          } catch (err: any) {
            console.error('Super AI server error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          }
        };

        if (req.method === 'GET') {
          await executeAi({});
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });

        req.on('end', async () => {
          let parsed: any = {};
          if (body) {
            try {
              parsed = JSON.parse(body);
            } catch (_) {}
          }
          await executeAi(parsed);
        });
      });

      // Dedicated, CORS-enabled Audio Streaming Proxy for Google Translate TTS
      server.middlewares.use('/api/tts', async (req: any, res: any) => {
        try {
          const url = new URL(req.url, 'http://localhost');
          const text = url.searchParams.get('q') || '';
          const lang = url.searchParams.get('tl') || 'km';

          if (!text) {
            res.statusCode = 400;
            res.end();
            return;
          }

          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
            text
          )}&tl=${lang}&client=tw-ob`;

          const response = await fetch(googleUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              Referer: 'https://translate.google.com/',
            },
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end();
            return;
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Content-Length', buffer.length.toString());
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.end(buffer);
        } catch (err: any) {
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), superAiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
