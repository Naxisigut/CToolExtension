import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  chrome.cookies.set(req.body, (cookie) => {
    // console.log(33333, cookie);
    if(cookie)resHandler.send(true)
  })

}

export default handler