'use client';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/4 px-4 py-4">
      <div className="max-w-275 mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Voxa. All rights reserved.</p>
        <p className="text-zinc-600">Built for seamless video conferencing</p>
      </div>
    </footer>
  );
}
