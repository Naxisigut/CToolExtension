import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  chrome.cookies.get(req.body, (cookie) => {
    if(cookie)resHandler.send(cookie.value)
  })

}

export default handler