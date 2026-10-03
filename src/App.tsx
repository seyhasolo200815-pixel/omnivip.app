import React, { useState } from 'react';
import { AppStatusBar } from './components/AppStatusBar';
import { AppHeader } from './components/AppHeader';
import { SubHeaderBanner } from './components/SubHeaderBanner';
import { ToolCard } from './components/ToolCard';
import { BottomNav, NavTab } from './components/BottomNav';
import { ToolModal } from './components/modals/ToolModal';
import { VipModal } from './components/modals/VipModal';
import { SideDrawer } from './components/modals/SideDrawer';
import { AdminWhitelistModal } from './components/modals/AdminWhitelistModal';
import {
  ToolsDirectoryTab,
  ImmersiveChatTab,
  HistoryTab,
  AccountTab,
} from './components/tabs/TabViews';
import { ToolItem, TOOLS_DATA } from './data/toolsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [favorites, setFavorites] = useState<string[]>(['langgo']);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'kh'>('en');
  const [isVipActive, setIsVipActive] = useState<boolean>(false);
  const [vipEmail, setVipEmail] = useState<string>('seyhasolo200815@gmail.com');

  // Toggle favorite stars
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectTool = (tool: ToolItem) => {
    setSelectedTool(tool);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'kh' : 'en'));
  };

  return (
    <div className="w-full min-h-screen bg-[#06090F] text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fluid Responsive Canvas spanning up to max-w-7xl across the monitor */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between">
        {/* 1. Mobile Status Bar (visible only on mobile) */}
        <AppStatusBar time="9:41" />

        {/* 2. Top App Header with Adaptive Desktop Navigation */}
        <AppHeader
          onOpenVip={() => setIsVipModalOpen(true)}
          onOpenMenu={() => setIsSideDrawerOpen(true)}
          hasUnreadNotifications={true}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isVipActive={isVipActive}
        />

        {/* 3. Screen Views based on Navigation Dock */}
        {activeTab === 'home' && (
          <div className="flex-1 flex flex-col w-full pb-4">
            {/* Hero Sub-Header Banner */}
            <SubHeaderBanner
              onRobotClick={() => {
                const kchatTool = TOOLS_DATA.find((t) => t.id === 'kchat');
                if (kchatTool) setSelectedTool(kchatTool);
              }}
            />

            {/* Adaptive 10-Box Modular App Grid: 5 columns on desktop, 3 on tablet, 2 on mobile */}
            <main className="w-full pb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full">
                {TOOLS_DATA.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelect={handleSelectTool}
                  />
                ))}
              </div>
            </main>
          </div>
        )}

        {activeTab === 'tools' && (
          <ToolsDirectoryTab
            onSelectTool={handleSelectTool}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'chat' && (
          <ImmersiveChatTab onOpenVip={() => setIsVipModalOpen(true)} />
        )}

        {activeTab === 'history' && <HistoryTab />}

        {activeTab === 'account' && (
          <AccountTab
            onOpenVip={() => setIsVipModalOpen(true)}
            isVipActive={isVipActive}
            vipEmail={vipEmail}
          />
        )}

        {/* 4. Bottom Navigation Dock for Mobile Devices */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 5. Tool Interactive Studio Modal */}
      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        onOpenVip={() => setIsVipModalOpen(true)}
        isVipActive={isVipActive}
      />

      {/* 6. Luxury VIP Pro Modal */}
      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        initialEmail={vipEmail}
        onUpgradeSuccess={(email) => {
          setIsVipActive(true);
          setVipEmail(email);
        }}
      />

      {/* 7. Side Menu Drawer */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        favorites={favorites}
        tools={TOOLS_DATA}
        onSelectTool={handleSelectTool}
        onOpenVip={() => setIsVipModalOpen(true)}
        onOpenAdminWhitelist={() => setIsAdminModalOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 8. Admin Whitelist Management Modal (Root level) */}
      <AdminWhitelistModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSelectEmailForTest={(email) => {
          setVipEmail(email);
          setIsVipModalOpen(true);
        }}
      />
    </div>
  );
}
