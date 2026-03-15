'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { MeetingModalProps } from '@/types';
import { cn } from '@/lib/utils';

export default function MeetingModal({
  open,
  onOpenChange,
  title,
  description,
  buttonText,
  icon: Icon,
  image,
  buttonIcon,
  className,
  onAction,
  children,
}: MeetingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-white/6 sm:max-w-md"
        style={{ backgroundColor: '#0e0e14' }}
      >
        <DialogHeader>
          {/* Image badge (for post-creation confirmation) */}
          {image && (
            <div className="flex justify-center mb-2">
              <Image src={image} alt="modal-icon" width={72} height={72} />
            </div>
          )}

          {/* Icon badge */}
          {Icon && !image && (
            <div
              className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(108, 99, 255, 0.2) 0%, rgba(108, 99, 255, 0.08) 100%)',
                border: '1px solid rgba(108, 99, 255, 0.2)',
              }}
            >
              <Icon className="h-6 w-6 text-indigo-400" />
            </div>
          )}

          <DialogTitle className={cn('text-center text-lg font-semibold text-zinc-100', className)}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center text-sm text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Custom content (form fields, inputs, date pickers, etc.) */}
        {children && <div className="flex flex-col gap-4">{children}</div>}

        <Button
          onClick={() => {
            onAction?.();
            onOpenChange(false);
          }}
          className="mt-2 w-full cursor-pointer rounded-xl py-5 text-sm font-medium text-white transition-all hover:brightness-110"
          style={{
            background:
              'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
          }}
        >
          {buttonIcon && (
            <Image
              src={buttonIcon}
              alt="button-icon"
              width={16}
              height={16}
              className="mr-2"
            />
          )}
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
