export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: '#0d0d12' }}
    >
      {/* Ambient background glows */}
      <div
        className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(79, 70, 229, 0.12)' }}
      />
      <div
        className="fixed bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(139, 92, 246, 0.08)' }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
