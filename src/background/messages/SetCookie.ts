import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  chrome.cookies.set(req.body, (cookie) => {
    resHandler.send(!!cookie)
  })

}

export default handler