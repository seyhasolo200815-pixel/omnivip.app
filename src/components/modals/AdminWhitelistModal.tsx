import React, { useState, useEffect } from 'react';
import {
  Shield,
  X,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Users,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  getVipWhitelist,
  saveVipWhitelist,
  resetVipWhitelist,
  addEmailToVipWhitelist,
  removeEmailFromVipWhitelist,
  DEFAULT_VIP_ACCOUNTS,
} from '../../data/vipWhitelist';

interface AdminWhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmailForTest?: (email: string) => void;
}

export const AdminWhitelistModal: React.FC<AdminWhitelistModalProps> = ({
  isOpen,
  onClose,
  onSelectEmailForTest,
}) => {
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');

  useEffect(() => {
    if (isOpen) {
      const list = getVipWhitelist();
      setWhitelist(list);
      setBulkText(list.join('\n'));
      setStatusMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredList = whitelist.filter((e) =>
    e.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const res = addEmailToVipWhitelist(newEmail.trim());
    if (res.success) {
      setWhitelist(res.updatedList);
      setBulkText(res.updatedList.join('\n'));
      setNewEmail('');
      setStatusMsg({ text: `✓ បានបញ្ចូល ${newEmail.trim().toLowerCase()} ទៅក្នុងបញ្ជី`, type: 'success' });
    } else {
      setStatusMsg({ text: res.message, type: 'error' });
    }
  };

  const handleRemove = (email: string) => {
    const updated = removeEmailFromVipWhitelist(email);
    setWhitelist(updated);
    setBulkText(updated.join('\n'));
    setStatusMsg({ text: `✓ បានលុប ${email}`, type: 'success' });
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(whitelist.join('\n'));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('តើអ្នកពិតជាចង់កំណត់បញ្ជីទៅ 100 VIP Accounts ដើមវិញមែនទេ?')) {
      const reset = resetVipWhitelist();
      setWhitelist(reset);
      setBulkText(reset.join('\n'));
      setStatusMsg({ text: '✓ បានកំណត់ឡើងវិញទៅ 100 Preset VIP Accounts ដើម', type: 'success' });
    }
  };

  const handleSaveBulk = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l && l.includes('@'));

    if (lines.length === 0) {
      setStatusMsg({ text: 'សូមបញ្ចូល Gmail យ៉ាងតិច 1', type: 'error' });
      return;
    }

    saveVipWhitelist(lines);
    const updated = getVipWhitelist();
    setWhitelist(updated);
    setIsBulkMode(false);
    setStatusMsg({ text: `✓ បានរក្សាទុក ${updated.length} គណនីជោគជ័យ`, type: 'success' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-khmer">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#0B1120] border border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 flex flex-col justify-between overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Admin Access: VIP Accounts Database
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                  {whitelist.length} Authorized
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                គ្រប់គ្រងបញ្ជី Gmail VIP Whitelist សម្រាប់ផ្ទៀងផ្ទាត់ និងដោះសោសិទ្ធិ VIP Pro។
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`my-2 p-2 rounded-xl text-xs flex items-center justify-between ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/70 border border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-[10px] hover:underline px-1"
            >
              បិទ
            </button>
          </div>
        )}

        {/* Toolbar & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 shrink-0">
          {/* Quick Filter Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរក Gmail ក្នុងបញ្ជី..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsBulkMode(!isBulkMode)}
              type="button"
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBulkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isBulkMode ? 'បញ្ជីធម្មតា' : 'Bulk Edit'}</span>
            </button>

            <button
              onClick={handleCopyAll}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'បានចម្លង!' : 'Copy All'}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              type="button"
              title="កំណត់ទៅ 100 Preset VIP ដើមវិញ"
              className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden my-2">
          {isBulkMode ? (
            /* Bulk Edit Mode */
            <div className="h-full flex flex-col space-y-2">
              <label className="text-xs text-slate-400">
                កែប្រែបញ្ជី Gmail ទាំងមូល (១ បន្ទាត់ = ១ Gmail):
              </label>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={12}
                className="w-full flex-1 bg-black/60 border border-slate-700 rounded-2xl p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 resize-none no-scrollbar leading-relaxed"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setIsBulkMode(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleSaveBulk}
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  រក្សាទុកការផ្លាស់ប្តូរ
                </button>
              </div>
            </div>
          ) : (
            /* List Mode */
            <div className="h-full flex flex-col justify-between">
              {/* Add Single Email bar */}
              <form onSubmit={handleAddEmail} className="flex gap-2 mb-2 shrink-0">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="បញ្ចូល Gmail ថ្មី (ឧ: vip.user@gmail.com)..."
                  className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>បន្ថែម</span>
                </button>
              </form>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 no-scrollbar border border-slate-800/80 rounded-2xl p-2 bg-black/40">
                {filteredList.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    រកមិនឃើញ Gmail ត្រូវគ្នានឹង "{searchQuery}" ទេ
                  </div>
                ) : (
                  filteredList.map((email, idx) => {
                    const isDefault = DEFAULT_VIP_ACCOUNTS.includes(email);
                    return (
                      <div
                        key={email}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-slate-800/60 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-[10px] font-mono text-slate-500 w-7 text-right">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-slate-200 group-hover:text-cyan-300 truncate">
                            {email}
                          </span>
                          {isDefault && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 text-[9px] font-bold border border-amber-500/20 shrink-0">
                              Preset 100
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {onSelectEmailForTest && (
                            <button
                              onClick={() => {
                                onSelectEmailForTest(email);
                                onClose();
                              }}
                              type="button"
                              title="ប្រើ Gmail នេះក្នុងទម្រង់ VIP"
                              className="px-2 py-0.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-semibold border border-cyan-500/30 flex items-center gap-1 transition-colors"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>សាកល្បង</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleRemove(email)}
                            type="button"
                            aria-label={`Remove ${email}`}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">Database Active · LocalStorage Synced</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            បិទផ្ទាំង
          </button>
        </div>
      </div>
    </div>
  );
};
