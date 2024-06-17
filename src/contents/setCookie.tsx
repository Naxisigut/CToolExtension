import type { PlasmoCSConfig } from 'plasmo';
import { useMessage } from '@plasmohq/messaging/hook';
import { isTop } from 'src/tools/index';
export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*", "http://127.0.0.1:5500/*"],
  all_frames: false
}

console.log('this is content default');
if(isTop()){
  console.log('isTop');
}

/* popup => content */
const cmdHandler = {
  exec(msgName){
    console.log('cmd', msgName);
    let res = true
    switch (msgName) {
      default:
        break;
    }
    return res
  }
}

const listener = () => {
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, boolean>((req, res) => {
    // req: 发来的消息本身，另外还有发送端信息
    const { name, body } = req
    const resp = cmdHandler.exec(name)
    // res.send(resp)
  })

  return null
}

export default listener