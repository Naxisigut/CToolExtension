/* POPUP API */

import type { CollectFrameType } from '~types';
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';


export const CollectFrames = (): Promise<CollectFrameType[]>=>{
  return sendToContentScript({
    name: 'COLLECT_IFRAMES',
  })
}

export const GetCookie = (cookieName): Promise<any>=>{
  return sendToContentScript({
    name: 'GET_COOKIE',
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

export const BgGetCookie = () => {
  return sendToBackground({
    name: "GetCookie",
  })
}