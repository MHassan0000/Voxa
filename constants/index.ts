import {
  Home,
  CalendarClock,
  History,
  Video,
  Plus,
  Users,
  CalendarDays,
} from 'lucide-react';
import type { SidebarLink, ActionCardData } from '@/types';

export const sidebarLinks: SidebarLink[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Upcoming', href: '/upcoming', icon: CalendarClock },
  { label: 'Previous', href: '/previous', icon: History },
  { label: 'Recordings', href: '/recordings', icon: Video },
  { label: 'Personal Room', href: '/personal-room', icon: Plus },
];

export const actionCards: ActionCardData[] = [
  {
    id: 'new-meeting',
    title: 'New Meeting',
    description: 'Start an instant meeting',
    icon: Plus,
    modalTitle: 'Start a New Meeting',
    modalDescription:
      'Create and launch an instant meeting room. Share the link with participants to get started.',
    buttonText: 'Start Meeting',
  },
  {
    id: 'join-meeting',
    title: 'Join Meeting',
    description: 'Via invitation link',
    icon: Users,
    modalTitle: 'Join a Meeting',
    modalDescription:
      'Enter the meeting link or code you received to join an existing session.',
    buttonText: 'Join Now',
  },
  {
    id: 'schedule-meeting',
    title: 'Schedule Meeting',
    description: 'Plan your meeting',
    icon: CalendarDays,
    modalTitle: 'Schedule a Meeting',
    modalDescription:
      'Pick a date and time to schedule your meeting in advance. Invitations will be sent automatically.',
    buttonText: 'Schedule',
  },
  {
    id: 'view-recordings',
    title: 'View Recordings',
    description: 'Meeting recordings',
    icon: Video,
    modalTitle: 'Your Recordings',
    modalDescription:
      'Access and manage all your recorded meeting sessions in one place.',
    buttonText: 'View All',
  },
];

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];
