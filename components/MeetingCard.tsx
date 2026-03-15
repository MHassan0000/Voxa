'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    return (
        <section className="glass-card flex min-h-55 w-full flex-col justify-between rounded-2xl border border-white/6 px-6 py-7 transition-all hover:border-white/10">
            {/* Top: Icon + Meeting Info */}
            <article className="flex flex-col gap-4">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(108, 99, 255, 0.05) 100%)',
                        border: '1px solid rgba(108, 99, 255, 0.2)',
                    }}
                >
                    <Image src={icon} alt="meeting-type" width={20} height={20} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg font-semibold text-zinc-100 line-clamp-1">
                        {title}
                    </h2>
                    <p className="text-sm text-zinc-400">{date}</p>
                </div>
            </article>

            {/* Bottom: Avatars + Actions */}
            <article className="mt-5 flex items-center justify-between">
                {/* Stacked Avatars */}
                <div className="relative flex max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendee"
                            width={36}
                            height={36}
                            className={cn(
                                'rounded-full border-2 border-[#0e0e14]',
                                index > 0 && 'absolute'
                            )}
                            style={{ top: 0, left: index * 24 }}
                        />
                    ))}
                    <div
                        className="absolute flex items-center justify-center text-xs font-medium text-zinc-300 rounded-full border-2 border-[#0e0e14]"
                        style={{
                            left: avatarImages.length * 24,
                            top: 0,
                            width: 36,
                            height: 36,
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        +5
                    </div>
                </div>

                {/* Action Buttons */}
                {!isPreviousMeeting && (
                    <div className="flex gap-2 max-sm:w-full max-sm:flex-col">
                        <Button
                            onClick={handleClick}
                            className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
                            style={{
                                background:
                                    'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
                            }}
                        >
                            {buttonIcon1 && (
                                <Image
                                    src={buttonIcon1}
                                    alt="action"
                                    width={18}
                                    height={18}
                                    className="mr-1.5"
                                />
                            )}
                            {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast.success('Link Copied', {
                                    description: 'Meeting link has been copied to your clipboard.',
                                });
                            }}
                            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="copy"
                                width={16}
                                height={16}
                                className="mr-1.5"
                            />
                            Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;