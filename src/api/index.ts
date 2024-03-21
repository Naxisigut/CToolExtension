/* POPUP API */

import type { CollectFrameType } from '~types';
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';


export const collectFrames = (): Promise<CollectFrameType[]>=>{
  return sendToContentScript({
    name: 'collectFrames',
  })
}