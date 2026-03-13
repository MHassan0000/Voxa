'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

import { actionCards } from '@/constants';
import ActionCard from '@/components/ActionCard';
import MeetingModal from '@/components/MeetingModal';
import type { ActionCardData } from '@/types';
import type { Variants } from 'framer-motion';

interface ActionCardListProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function ActionCardList({
  containerVariants,
  itemVariants,
}: ActionCardListProps) {
  const [selectedCard, setSelectedCard] = useState<ActionCardData | null>(null);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();

  const handleAction = async () => {
    // If not signed in, redirect to sign in to use meeting features
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // If signed in but Stream client isn't ready, just return
    if (!client || !selectedCard) return;

    switch (selectedCard.id) {
      case 'new-meeting': {
        try {
          const id = crypto.randomUUID();
          const call = client.call('default', id);
          if (!call) throw new Error('Failed to create meeting');

          await call.getOrCreate({
            data: {
              starts_at: new Date().toISOString(),
              custom: {
                description: 'Instant Meeting',
              },
            },
          });

          toast.success('Meeting Created', {
            description: 'Redirecting you to your meeting room…',
          });

          router.push(`/meeting/${call.id}`);
        } catch (error) {
          console.error(error);
          toast.error('Failed to create Meeting', {
            description: 'Something went wrong. Please try again.',
          });
        }
        break;
      }

      case 'join-meeting': {
        toast.info('Join Meeting', {
          description: 'Enter a meeting link to join.',
        });
        break;
      }

      case 'schedule-meeting': {
        toast.info('Schedule Meeting', {
          description: 'Meeting scheduling coming soon.',
        });
        break;
      }

      case 'view-recordings': {
        router.push('/recordings');
        break;
      }

      default:
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
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </motion.div>

      {/* Meeting Modal */}
      <MeetingModal
        open={!!selectedCard}
        onOpenChange={(open) => {
          if (!open) setSelectedCard(null);
        }}
        title={selectedCard?.modalTitle ?? ''}
        description={selectedCard?.modalDescription ?? ''}
        buttonText={selectedCard?.buttonText ?? ''}
        icon={selectedCard?.icon ?? actionCards[0].icon}
        onAction={handleAction}
      />
    </>
  );
}
