import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';

export const collectFrames = ()=>{
  return sendToContentScript({
    name: 'collectFrames',
  })
}