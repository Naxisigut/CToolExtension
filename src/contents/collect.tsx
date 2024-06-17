/*****
 * content
 * collect all the frames info of gongyunlian 
 *  */ 
import type { PlasmoCSConfig } from 'plasmo';
import type { CollectFrameType } from '~types';
import { useMessage } from '@plasmohq/messaging/hook';

export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*", "http://127.0.0.1:5500/*", "*://*.51hgp.com/*"],
  all_frames: false
}

export default function listener(){
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, CollectFrameType[]>((req, resHandler)=>{
    const { name, body } = req // req: 发来的消息本身，另外还有发送端信息
    console.log('cmd', name);
    let resp
    switch (name) {
      case 'collectFrames':
        resp = collectFrames()
        if(resp)resHandler.send(resp)
        break;
      case 'getCookie':
        const cookies = getCookieObj()
        if(body)resp = cookies[body]
        resHandler.send(resp)
        break;
    
      default:
        break;
    }
  })
  return null
}

function collectFrames(){
  const locations = collectLocation()
  const tabNames = collectTabNameHgp()
  const resp = locations.map((i, idx) => {
    return {
      // 在非erp网站上没有tab可供获取
      // 此时默认tabName为location的网址。
      tabName: tabNames[idx] || i.href, 
      location: i,
    }
  })
  return resp
}

/* 收集iframes的location信息 */
const collectLocation = ()=>{
  const iframes = window.frames
  if(!iframes.length)return []

  const arr = Array.from(iframes).reduce((curr, frame) => {
    if(frame.frameElement)curr.push(frame.location)
    return curr
  }, [])
  return arr as Location[]
}

/* 收集tab的名称 */
const collectTabNameHgp = () => {
  const tabsWrapper = document.querySelector('#main_tab_container')
  if(!tabsWrapper)return []

  const tabs = tabsWrapper.querySelectorAll('li>a')
  if(!tabs.length)return []
  
  const tabNames = Array.prototype.map.call(tabs, (tab) => {
    return tab.childNodes[0].textContent || "TabNameDefault"
  })
  return tabNames as string[]
}

const getCookieObj = () => {
  const cookieArray = document.cookie.split('; ')
  const cookieObj = cookieArray.reduce((curr, item) => {
    const [key, val] = item.split('=')
    curr[key] = val
    return curr
  }, {})
  return cookieObj
}

