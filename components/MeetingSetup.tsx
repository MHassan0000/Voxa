'use client';
import { useEffect, useState } from 'react';
import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
    setIsSetupComplete,
}: {
    setIsSetupComplete: (value: boolean) => void;
}) => {
    // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
    const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
    const callStartsAt = useCallStartsAt();
    const callEndedAt = useCallEndedAt();
    const callTimeNotArrived =
        callStartsAt && new Date(callStartsAt) > new Date();
    const callHasEnded = !!callEndedAt;

    const call = useCall();

    if (!call) {
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );
    }

    // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);

    useEffect(() => {
        if (isMicCamToggled) {
            call.camera.disable();
            call.microphone.disable();
        } else {
            call.camera.enable();
            call.microphone.enable();
        }
    }, [isMicCamToggled, call.camera, call.microphone]);

    if (callTimeNotArrived)
        return (
            <Alert
                title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
            />
        );

    if (callHasEnded)
        return (
            <Alert
                title="The call has been ended by the host"
                iconUrl="/icons/call-ended.svg"
            />
        );

    return (
        <div className="flex h-full w-full flex-col items-center justify-center text-zinc-100 p-4 sm:p-8">
            <div className="glass-card w-full max-w-3xl rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-6 shadow-2xl">
                <div className="text-center space-y-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Setup your audio and video</h1>
                    <p className="text-sm text-zinc-400">Configure your devices before joining the meeting</p>
                </div>

                <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner mb-4">
                    <div className="flex items-center justify-center w-full max-w-150">
                        <VideoPreview />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isMicCamToggled}
                                onChange={(e) => setIsMicCamToggled(e.target.checked)}
                                className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded border border-white/20 bg-black/20 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-colors"></div>
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                            Join with mic and camera off
                        </span>
                    </label>

                    <DeviceSettings />
                </div>

                <div className="w-full h-px bg-white/5 my-2" />

                <Button
                    className="w-full sm:w-auto min-w-50 rounded-xl py-6 text-base font-medium text-white transition-all hover:brightness-110 shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                    style={{
                        background: 'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
                    }}
                    onClick={() => {
                        call.join();
                        setIsSetupComplete(true);
                    }}
                >
                    Join Meeting
                </Button>
            </div>
        </div>
    );
};

export default MeetingSetup;