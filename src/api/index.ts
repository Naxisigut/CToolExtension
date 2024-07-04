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

export const BgGetCookie = (params?): Promise<string | false> => {
  return sendToBackground({
    name: "GetCookie",
    body: params
  })
}

export const BgSetCookie = (params): Promise<boolean> => {
  return sendToBackground({
    name: "SetCookie",
    body: params
  })
}

/**
 * 获取tab页信息
 * @param params 
 * @returns 
 */
export const BgGetTabs = (params) => {
  return sendToBackground({
    name: "GetTabs",
    body: params
  })
}