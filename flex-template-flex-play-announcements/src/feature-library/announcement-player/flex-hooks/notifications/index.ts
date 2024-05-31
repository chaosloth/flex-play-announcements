import * as Flex from '@twilio/flex-ui';

import { StringTemplates } from '../strings/Announcements';

// Export the notification IDs an enum for better maintainability when accessing them elsewhere
export enum AnnouncementsUiNotificationIds {
  SYNC_ERROR = 'PSAnnSyncError',
  PLAY_ERROR = 'PSAnnPlayError',
}

// Return an array of Flex.Notification
export const notificationHook = (_flex: typeof Flex, _manager: Flex.Manager) => [
  {
    id: AnnouncementsUiNotificationIds.SYNC_ERROR,
    type: Flex.NotificationType.error,
    content: StringTemplates.SYNC_ERROR,
    closeButton: true,
    timeout: 5000,
  },
  {
    id: AnnouncementsUiNotificationIds.PLAY_ERROR,
    type: Flex.NotificationType.error,
    content: StringTemplates.PLAY_ERROR,
    closeButton: true,
    timeout: 5000,
  },
];
