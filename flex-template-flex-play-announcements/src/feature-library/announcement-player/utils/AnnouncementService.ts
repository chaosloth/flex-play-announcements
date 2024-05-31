import { EncodedParams } from 'types/serverless';

import { AnnouncementItem } from '../types/AnnouncementItem';
import ApiService from '../../../utils/serverless/ApiService';
import SyncHelper from './SyncHelper';
import { getAnnouncementsMapName, getStopAnnouncementPath } from '../config';

class AnnouncementService extends ApiService {
  stopAnnouncement = async (conferenceSid: string) => {
    console.log(`Announcement service stop announcement path: ${getStopAnnouncementPath()}`);
    return this.startAnnouncement(conferenceSid, getStopAnnouncementPath());
  };

  startAnnouncement = async (conferenceSid: string, announcementPath: string) => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        conferenceSid: encodeURIComponent(conferenceSid),
        announcementPath: encodeURIComponent(announcementPath),
        Token: encodeURIComponent(this.manager.user.token),
      };

      this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/announcements/flex/play-announcement`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      )
        .then((resp: any) => {
          resolve(resp);
        })
        .catch((error) => {
          console.log('Error starting announcement', error);
          reject(error);
        });
    });
  };

  getAnnouncements = async (): Promise<AnnouncementItem[]> => {
    return SyncHelper.getMapItems(getAnnouncementsMapName());
  };
}

const service = new AnnouncementService();

export default service;
