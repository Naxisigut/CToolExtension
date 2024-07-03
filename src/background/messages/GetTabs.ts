import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  const queryOptions = Object.assign({}, req.body || {});
  chrome.tabs.query(queryOptions, (tabs) => {
    resHandler.send(tabs)
  });

}

export default handler