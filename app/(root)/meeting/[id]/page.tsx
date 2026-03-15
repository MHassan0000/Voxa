"use client"
import { useState, use } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import { useGetCallById } from '@/hooks/getUseCallById'
import Loader from '@/components/Loader'
import Alert from '@/components/Alert'



const MeetingPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);


    if (!isLoaded || isCallLoading) return <Loader />


    if (!call) return (
        <p className="text-center text-3xl font-bold text-white">
            Call Not Found
        </p>
    );


    const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

    if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

    return (
        <main className='h-screen w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (<MeetingSetup setIsSetupComplete={setIsSetupComplete} />) :
                        (<MeetingRoom />)}




                </StreamTheme>

            </StreamCall>


        </main>
    )
}

export default MeetingPage