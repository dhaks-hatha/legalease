import React, { useState } from 'react';
import { Scale, Bell, Plus, Menu, X, FileText, Bot, FolderOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'templates', label: 'Templates' },
    { id: 'my-documents', label: 'My Documents' },
    { id: 'assistant', label: 'AI Assistant', action: onOpenAssistant }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/30 transition-colors">
                <Scale className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  LegalEase
                  <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/60">
                    Draft AI
                  </span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.action) {
                    link.action();
                  } else {
                    onNavigate(link.id);
                  }
                }}
                className={`transition-colors py-1 relative ${
                  currentView === link.id
                    ? 'text-teal-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {currentView === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions & User Info */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-300 bg-teal-950/60 border border-teal-800/60 rounded-lg hover:bg-teal-900/40 transition-colors"
              title="Open LegalEase AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Ask Assistant</span>
            </button>

            <button
              onClick={() => {
                setShowNotificationToast(true);
                setTimeout(() => setShowNotificationToast(false), 3000);
              }}
              className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full" />
            </button>

            <button
              onClick={() => onNavigate('templates')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm focus:outline-none"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Document</span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1" />

            {/* User profile avatar badge */}
            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-teal-300">
                AR
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-medium text-slate-200 leading-tight">Alex Rivera</p>
                <p className="text-[11px] text-slate-400 leading-tight">Founder Plan</p>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('templates')}
              className="p-1.5 text-white bg-blue-600 rounded-lg text-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast Alert */}
      {showNotificationToast && (
        <div className="absolute top-18 right-6 z-50 bg-slate-800 text-white text-xs border border-slate-700 shadow-xl rounded-lg p-3 w-72 animate-in fade-in slide-in-from-top-2">
          <p className="font-semibold text-teal-400">Legal Document System Alert</p>
          <p className="text-slate-300 mt-0.5">California 2026 worker classification & non-compete statutory updates loaded into templates.</p>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setMobileMenuOpen(false);
                if (link.action) {
                  link.action();
                } else {
                  onNavigate(link.id);
                }
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentView === link.id
                  ? 'bg-slate-800 text-teal-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Signed in as Alex Rivera</span>
            <button onClick={onOpenAssistant} className="text-teal-400 font-medium">Ask Assistant</button>
          </div>
        </div>
      )}
    </header>
  );
};
