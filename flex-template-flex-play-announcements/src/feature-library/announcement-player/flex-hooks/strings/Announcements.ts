// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  CHOOSE_ANNOUNCEMENT_LABEL = 'PSChooseAnnouncement',
  SYNC_ERROR = 'PSAnnSyncError',
  PLAY_ERROR = 'PSAnnPlayError',
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.CHOOSE_ANNOUNCEMENT_LABEL]: 'Choose announcement to play',
    [StringTemplates.SYNC_ERROR]: 'Error fetching announcements',
    [StringTemplates.PLAY_ERROR]: 'Error playing announcement',
  },
});
