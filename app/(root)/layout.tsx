'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StreamVideoProvider from '@/providers/streamclientprovider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <StreamVideoProvider>
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#050507' }}>
        {/* Desktop sidebar — collapsible */}
        <div
          className="hidden lg:flex lg:flex-col shrink-0 border-r border-white/4 transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: '#0a0a0f',
            width: sidebarCollapsed ? '72px' : '240px',
          }}
        >
          <Sidebar
            className="w-full"
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((prev) => !prev)}
          />
        </div>

        {/* Main content area — fills remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ backgroundColor: '#050507' }}>
          <Navbar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-5 lg:px-8 py-5">
            {children}
          </main>
        </div>
      </div>
    </StreamVideoProvider>
  );
}