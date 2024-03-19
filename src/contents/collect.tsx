/*****
 * collect all the frames info 
 *  */ 
import type { PlasmoCSConfig } from 'plasmo';
import { useMessage } from '@plasmohq/messaging/hook';

export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*", "http://127.0.0.1:5500/*"],
  all_frames: false
}

export default function listener(){
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, Array<Location>>((req, resHandler)=>{
    const { name } = req // req: 发来的消息本身，另外还有发送端信息
    if(name !== 'collectFrames')return
    const arr = collect(window)
    resHandler.send(arr)
  })
  return null
}

const collect = (window: Window, locationArr: Array<Location> = [])=>{
  console.log('collect');
  const location = window.location
  locationArr.push(location)
  const iframes = window.frames
  if(window.frames.length){
    for (let index = 0; index < iframes.length; index++) {
      collect(iframes[index], locationArr)
    }
  }

  return locationArr
}

