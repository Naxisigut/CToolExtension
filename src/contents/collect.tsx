/*****
 * content
 * collect all the frames info of gongyunlian 
 *  */ 
import type { PlasmoCSConfig } from 'plasmo';
import { useMessage } from '@plasmohq/messaging/hook';

export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*", "http://127.0.0.1:5500/*", "*://*.51hgp.com/*", "http://localhost:*/"],
  all_frames: false
}

export default function listener(){
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string, any>((req, resHandler)=>{
    const { name, body } = req // req: 发来的消息本身，另外还有发送端信息
    console.log('cmd', name);
    let resp
    switch (name) {
      case 'COLLECT_IFRAMES':
        resp = collectFrames()
        if(resp)resHandler.send(resp)
        break;
      case 'GET_COOKIE':
        const cookies = getCookieObj()
        resp = (body && cookies[body]) || ''
        console.log('content', resp);
        resHandler.send(resp)
        break;
      case 'SET_COOKIE':
        setDocumentCookie(body)
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

/* 获取当前cookie为一个对象 */
const getCookieObj = () => {
  console.log(0, document.cookie);
  const cookieArray = document.cookie.split('; ')
  const cookieObj = cookieArray.reduce((curr, item) => {
    const [key, val] = item.split('=')
    curr[key] = val
    return curr
  }, {})
  console.log(111, cookieObj);
  return cookieObj
}

/* 设置cookie */
const setDocumentCookie = (params) => {
  const { cookieName, cookieValue } = params
  document.cookie = `${cookieName}=${cookieValue}`
}

