const { prepareFlexFunction, twilioExecute } = require(Runtime.getFunctions()['common/helpers/function-helper'].path);

const requiredParameters = [
  { key: 'conferenceSid', purpose: 'Conference SID' },
  { key: 'announcementPath', purpose: 'Path to audio file' },
  { key: 'Token', purpose: 'Flex Token' },
];

exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    console.log('play-announcement');
    const { conferenceSid, announcementPath } = event;

    // UPDATE: Rethink serverless wrappers #492
    const result = await twilioExecute(context, async (client) => {
      return client.conferences(conferenceSid).update({
        announceUrl: announcementPath,
      });
    });

    if (result.success) {
      console.log('Twilio conferences update response:', result.data);
    }

    console.log('result:', result);
    const { status } = result;
    response.setStatusCode(status);

    return callback(null, response);
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
});
