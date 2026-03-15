'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import ReactDatePicker from 'react-datepicker';

import { actionCards } from '@/constants';
import ActionCard from '@/components/ActionCard';
import MeetingModal from '@/components/MeetingModal';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { Variants } from 'framer-motion';

import 'react-datepicker/dist/react-datepicker.css';

type MeetingState =
  | 'isInstantMeeting'
  | 'isScheduleMeeting'
  | 'isJoiningMeeting'
  | undefined;

interface ActionCardListProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

export default function ActionCardList({
  containerVariants,
  itemVariants,
}: ActionCardListProps) {
  const [meetingState, setMeetingState] = useState<MeetingState>(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();

  const createMeeting = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    if (!client) return;

    try {
      if (!values.dateTime) {
        toast.warning('Please select a date and time');
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      // If no description was provided (instant meeting), redirect immediately
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success('Meeting Created', {
        description: values.description
          ? 'Your meeting has been scheduled. Copy the link to share.'
          : 'Redirecting you to your meeting room…',
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create Meeting', {
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/meeting/${callDetail?.id}`;

  const handleCardClick = (cardId: string) => {
    switch (cardId) {
      case 'new-meeting':
        setMeetingState('isInstantMeeting');
        break;
      case 'join-meeting':
        setMeetingState('isJoiningMeeting');
        break;
      case 'schedule-meeting':
        setMeetingState('isScheduleMeeting');
        break;
      case 'view-recordings':
        router.push('/recordings');
        break;
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {actionCards.map((card) => (
          <ActionCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            variants={itemVariants}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </motion.div>

      {/* ── Instant Meeting Modal ─────────────────────── */}
      <MeetingModal
        open={meetingState === 'isInstantMeeting'}
        onOpenChange={(open) => {
          if (!open) setMeetingState(undefined);
        }}
        title="Start an Instant Meeting"
        description="Launch a meeting room instantly and invite participants."
        buttonText="Start Meeting"
        icon={actionCards[0].icon}
        className="text-center"
        onAction={createMeeting}
      />

      {/* ── Schedule Meeting Modal ────────────────────── */}
      {!callDetail ? (
        <MeetingModal
          open={meetingState === 'isScheduleMeeting'}
          onOpenChange={(open) => {
            if (!open) {
              setMeetingState(undefined);
              setValues(initialValues);
            }
          }}
          title="Schedule a Meeting"
          description="Pick a date, time, and add a description for your meeting."
          buttonText="Schedule Meeting"
          icon={actionCards[2].icon}
          onAction={createMeeting}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">
              Add a description
            </label>
            <Textarea
              className="border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 min-h-20 resize-none rounded-xl"
              placeholder="What is this meeting about?"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date | null) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30 transition-colors"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          open={meetingState === 'isScheduleMeeting'}
          onOpenChange={(open) => {
            if (!open) {
              setMeetingState(undefined);
              setCallDetail(undefined);
              setValues(initialValues);
            }
          }}
          title="Meeting Created"
          image="/icons/checked.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
          buttonIcon="/icons/copy.svg"
          onAction={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Link Copied', {
              description: 'Meeting link has been copied to your clipboard.',
            });
          }}
        />
      )}

      {/* ── Join Meeting Modal ────────────────────────── */}
      <MeetingModal
        open={meetingState === 'isJoiningMeeting'}
        onOpenChange={(open) => {
          if (!open) {
            setMeetingState(undefined);
            setValues(initialValues);
          }
        }}
        title="Join a Meeting"
        description="Enter the meeting link or code to join an existing session."
        buttonText="Join Meeting"
        icon={actionCards[1].icon}
        className="text-center"
        onAction={() => {
          if (!values.link) {
            toast.warning('Please enter a meeting link');
            return;
          }
          router.push(values.link);
        }}
      >
        <Input
          placeholder="Paste meeting link here…"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 rounded-xl py-5"
        />
      </MeetingModal>
    </>
  );
}
