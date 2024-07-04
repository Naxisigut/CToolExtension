import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  chrome.cookies.get(req.body, (cookie) => {
    resHandler.send(cookie ? cookie.value : false)
  })

}

export default handler