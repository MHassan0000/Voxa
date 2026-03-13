import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StreamVideoProvider from '@/providers/streamclientprovider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StreamVideoProvider>
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#050507' }}>
        {/* Desktop sidebar — fixed width, never collapses */}
        <div
          className="hidden lg:flex lg:flex-col shrink-0 border-r border-white/4"
          style={{ backgroundColor: '#0a0a0f', width: '240px' }}
        >
          <Sidebar className="w-full" />
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