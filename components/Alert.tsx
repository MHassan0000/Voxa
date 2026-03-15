import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';

interface PermissionCardProps {
    title: string;
    iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
    return (
        <section className="flex items-center justify-center h-screen w-full p-4 sm:p-8 text-zinc-100">
            <div className="glass-card w-full max-w-md rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-8 shadow-2xl border border-white/10 bg-black/60">
                <div className="flex flex-col items-center gap-6">
                    {iconUrl && (
                        <div className="flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10">
                            <Image src={iconUrl} width={48} height={48} alt="icon" className="opacity-80" />
                        </div>
                    )}
                    <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        {title}
                    </h2>
                </div>

                <div className="w-full h-px bg-white/5" />

                <Button 
                    asChild 
                    className="w-full rounded-xl py-6 text-base font-medium text-white transition-all hover:brightness-110 shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                    style={{
                        background: 'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
                    }}
                >
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </section>
    );
};

export default Alert;