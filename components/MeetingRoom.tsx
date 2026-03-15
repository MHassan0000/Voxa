'use client';
import { useState } from 'react';
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const router = useRouter();
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState } = useCallStateHooks();

    // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader />;

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="h-screen w-full flex flex-col overflow-hidden text-zinc-100 bg-[#050507]">
            {/* Top Area: Video Grid */}
            <div className="flex-1 w-full relative min-h-0 bg-black/40 p-2 sm:p-4 flex">
                <div className="w-full h-full flex-1">
                    <CallLayout />
                </div>

                {/* Right Sidebar: Participants List */}
                <div
                    className={cn('h-full hidden border-l border-white/10 bg-[#0a0a0f] transition-all duration-300', {
                        'show-block': showParticipants,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            {/* Bottom Area: Call Controls Panel */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-5 p-4 sm:p-6 bg-[#0a0a0f] border-t border-white/10 relative z-10 shrink-0">
                <CallControls onLeave={() => router.push(`/`)} />

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors outline-none cursor-pointer">
                        <LayoutList size={22} className="text-zinc-300" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="border border-white/10 bg-[#0e0e14] text-zinc-100 min-w-40 p-2 rounded-xl shadow-2xl mb-2">
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
                            <DropdownMenuItem
                                key={item}
                                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                className="cursor-pointer focus:bg-white/10 focus:text-white rounded-lg px-3 py-2 text-sm transition-colors"
                            >
                                {item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className={cn("flex items-center justify-center w-12 h-12 rounded-2xl border transition-colors outline-none cursor-pointer",
                        showParticipants
                            ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                    )}
                >
                    <Users size={22} />
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
};

export default MeetingRoom;