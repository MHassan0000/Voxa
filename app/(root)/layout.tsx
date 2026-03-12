import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#0d0d12' }}>
      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex lg:w-[260px] lg:flex-shrink-0 border-r border-white/[0.06]"
        style={{ backgroundColor: '#131320' }}
      >
        <Sidebar className="w-full" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: '#0d0d12' }}>
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}