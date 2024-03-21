/*****
 * collect all the frames info 
 *  */ 
import type { PlasmoCSConfig } from 'plasmo';
import { useMessage } from '@plasmohq/messaging/hook';

export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*", "http://127.0.0.1:5500/*", "*://*.51hgp.com/*"],
  all_frames: false
}

export default function listener(){
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, Array<Location>>((req, resHandler)=>{
    const { name } = req // req: 发来的消息本身，另外还有发送端信息
    if(name !== 'collectFrames')return
    const arr = collect(window)
    console.log(arr);
    resHandler.send(arr)
  })
  return null
}

const collect = (window: Window)=>{
  const iframes = window.frames
  if(!iframes.length)return []

  const arr = Array.from(iframes).reduce((curr, frame) => {
    if(frame.frameElement)curr.push(frame.location)
    return curr
  }, [])
  return arr
}

