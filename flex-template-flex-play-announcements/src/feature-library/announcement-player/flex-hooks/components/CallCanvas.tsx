import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import MessagePlayer from '../../custom-components/MessagePlayer/MessagePlayer';

export const componentName = FlexComponent.CallCanvas;
export const componentHook = function addMessagePlayerComponent(flex: typeof Flex, _manager: Flex.Manager) {
  flex.CallCanvas.Content.add(<MessagePlayer key="message-player" />, {
    sortOrder: 1,
  });
};
