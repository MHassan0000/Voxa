import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#050507' }}
    >
      {/* Ambient background */}
      <div
        className="fixed top-[-30%] left-[-15%] w-150 h-150 rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'rgba(108, 99, 255, 0.03)' }}
      />
      <div
        className="fixed bottom-[-30%] right-[-15%] w-125 h-125 rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'rgba(108, 99, 255, 0.02)' }}
      />

      {/* Logo */}
      <div className="relative z-10 mb-8 flex items-center gap-3">
        <Image
          src="/images/VOXA.png"
          alt="Voxa"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <span className="text-xl font-semibold tracking-wide text-zinc-200">
          Voxa
        </span>
      </div>

      {/* Clerk form */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
