'use client';

import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Copy, Play, User } from 'lucide-react';

import { useGetCallById } from '@/hooks/getUseCallById';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-sm font-medium text-zinc-400 sm:min-w-32 shrink-0">
        {label}
      </span>
      <span className="text-sm font-semibold text-zinc-100 truncate max-w-full">
        {value}
      </span>
    </div>
  );
};

export default function PersonalRoomPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call('default', meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '')}/meeting/${meetingId}?personal=true`;

  if (!isLoaded) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-275 mx-auto"
    >
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(108, 99, 255, 0.05) 100%)',
            border: '1px solid rgba(108, 99, 255, 0.2)',
          }}
        >
          <User className="w-4 h-4 text-indigo-400" />
        </div>
        <h1 className="text-lg font-medium text-zinc-100">
          Personal Meeting Room
        </h1>
      </div>

      {/* Info Card */}
      <div className="glass-card rounded-2xl border border-white/6 p-6 sm:p-8 mb-6">
        <div className="flex flex-col gap-5">
          <InfoRow
            label="Topic"
            value={`${user?.username || user?.firstName || 'Your'}'s Meeting Room`}
          />
          <div className="h-px bg-white/5" />
          <InfoRow label="Meeting ID" value={meetingId || ''} />
          <div className="h-px bg-white/5" />
          <InfoRow label="Invite Link" value={meetingLink} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={startRoom}
          className="cursor-pointer rounded-xl px-8 py-5 text-sm font-medium text-white transition-all hover:brightness-110 shadow-[0_0_20px_rgba(108,99,255,0.2)]"
          style={{
            background: 'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
          }}
        >
          <Play className="w-4 h-4 mr-2" />
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Link Copied', {
              description: 'Invite link has been copied to your clipboard.',
            });
          }}
          className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-8 py-5 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Invitation
        </Button>
      </div>
    </motion.div>
  );
}
