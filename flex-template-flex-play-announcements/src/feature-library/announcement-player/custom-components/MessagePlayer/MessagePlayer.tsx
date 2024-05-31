import React, { useState, useEffect, FormEvent } from 'react';
import { ITask, TaskHelper, Notifications } from '@twilio/flex-ui';
import { Button } from '@twilio-paste/core/button';
import { Select, Option } from '@twilio-paste/core/select';
import { Box } from '@twilio-paste/core/box';
import { Spinner } from '@twilio-paste/core/spinner';
import { Card } from '@twilio-paste/core/card';
import { FormControl, FormActions } from '@twilio-paste/core/form';

import { AnnouncementItem } from '../../types/AnnouncementItem';
import AnnouncementService from '../../utils/AnnouncementService';
import { AnnouncementsUiNotificationIds } from '../../flex-hooks/notifications';

export interface OwnProps {
  task?: ITask;
}

const MessagePlayer = (props: OwnProps) => {
  const [announcementItems, setAnnouncementItems] = useState<AnnouncementItem[]>([]);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { task } = props as OwnProps;
  const conference = task && task.conference;
  const conferenceSid = conference?.conferenceSid;

  const isLiveCall = props.task ? TaskHelper.isLiveCall(props.task) : false;

  useEffect(() => {
    AnnouncementService.getAnnouncements()
      .then((response) => {
        console.log(`Messages list`, response);
        setAnnouncementItems(response);
      })
      .catch((err) => console.error('Error fetching announcements', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    console.log(`Setting selected message to`, e.currentTarget.value);
    setSelectedMessage(e.currentTarget.value);
  };

  const handlePlay = () => {
    const announcement = announcementItems.find((item) => item.key === selectedMessage);
    console.log(`Playing announcement: ${announcement}`);
    if (!conference || !conferenceSid) return;
    if (announcement) {
      setIsLoading(true);
      console.log(`Calling start announcement for conf ${conferenceSid} with path ${announcement.data.path}`);
      AnnouncementService.startAnnouncement(conferenceSid, announcement.data.path)
        .catch((err) => {
          console.error('Error starting announcement', err);
          Notifications.showNotification(AnnouncementsUiNotificationIds.PLAY_ERROR, {
            message: 'Error playing message',
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleStop = () => {
    console.log(`Playing stop announcement`);
    if (!conference || !conferenceSid) return;
    setIsLoading(true);
    AnnouncementService.stopAnnouncement(conferenceSid)
      .catch((err) => {
        console.error('Error starting announcement', err);
        Notifications.showNotification(AnnouncementsUiNotificationIds.PLAY_ERROR, {
          message: 'Error playing message',
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box margin={'space40'}>
      <Card>
        <FormControl>
          <Select onChange={handleSelectChange} value={selectedMessage} disabled={isLoading}>
            <Option value="">Select an announcement to play</Option>
            {announcementItems.map((message) => (
              <Option key={message.key} value={message.key}>
                {message.data.label}
              </Option>
            ))}
          </Select>
        </FormControl>
        <FormActions>
          <Button variant="primary" onClick={handlePlay} disabled={!selectedMessage || isLoading || !isLiveCall}>
            Play
          </Button>
          <Button variant="destructive" onClick={handleStop} disabled={isLoading || !isLiveCall}>
            Stop
          </Button>
        </FormActions>

        {isLoading && (
          <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
            <Spinner decorative={false} title="Loading messages" size="sizeIcon40" />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default MessagePlayer;
