import { getFeatureFlags } from '../../utils/configuration';
import AnnouncementPlayerConfig from './types/ServiceConfiguration';

const {
  enabled = false,
  announcements_map_name = 'Announcements',
  stop_announcement_path,
} = (getFeatureFlags()?.features?.announcement_player as AnnouncementPlayerConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const getAnnouncementsMapName = () => {
  return announcements_map_name;
};

export const getStopAnnouncementPath = () => {
  return stop_announcement_path;
};
