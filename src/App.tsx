import React, { useState } from 'react';
import { useAppStore } from './services/store';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { ToastContainer } from './components/common/ToastContainer';
import { DeliverableModal } from './components/deliverables/DeliverableModal';
import { SplitScreenViewer } from './components/documents/SplitScreenViewer';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkbenchPage } from './pages/WorkbenchPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { NetworkPage } from './pages/NetworkPage';
import { EvidencePage } from './pages/EvidencePage';
import { VerificationPage } from './pages/VerificationPage';
import { ToolsPage } from './pages/ToolsPage';
import { FirewallPage } from './pages/FirewallPage';
import { AuditPage } from './pages/AuditPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  const store = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // If logged out / unauthenticated, show sovereign gateway
  if (!store.isAuthenticated) {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  const renderActivePage = () => {
    switch (store.currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'workbench':
        return <WorkbenchPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'network':
        return <NetworkPage />;
      case 'evidence':
        return <EvidencePage />;
      case 'verification':
        return <VerificationPage />;
      case 'tools':
        return <ToolsPage />;
      case 'firewall':
        return <FirewallPage />;
      case 'audit':
        return <AuditPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <WorkbenchPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090e] text-slate-100 font-sans">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <TopBar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Dynamic Route Viewport */}
        <main className="flex-1 overflow-hidden relative">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <DeliverableModal
        isOpen={store.deliverableModalOpen}
        onClose={() => store.setDeliverableModalOpen(false)}
      />

      {store.selectedDocumentForViewer && (
        <SplitScreenViewer
          document={store.selectedDocumentForViewer}
          onClose={() => store.setDocumentForViewer(null)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
