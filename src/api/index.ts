/* POPUP API */

import type { CollectFrameType } from '~types';
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';


export const CollectFrames = (): Promise<CollectFrameType[]>=>{
  return sendToContentScript({
    name: 'collectFrames',
  })
}

export const GetCookie = (cookieName): Promise<any>=>{
  return sendToContentScript({
    name: 'getCookie',
    body: cookieName
  })
}

export const SetCookie = (params: {
  cookieName: string, 
  cookieValue: string
}): Promise<any>=>{
  return sendToContentScript({
    name: 'SET_COOKIE',
    body: params
  })
}