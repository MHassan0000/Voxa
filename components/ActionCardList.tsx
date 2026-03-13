'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
      />
    </>
  );
}
