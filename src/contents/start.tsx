import { PlasmoCSConfig } from 'plasmo';
import { sendToBackground } from '@plasmohq/messaging';
import { useMessage } from '@plasmohq/messaging/hook';
import { isTop, copyText } from 'src/tools/index';
export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*"],
  all_frames: true
}

console.log('this is content');
if(isTop()){
  console.log('isTop');
}

/* popup => content */
const cmdHandler = {
  exec(msgName){
    console.log('cmd', msgName);
    let res = true
    switch (msgName) {
      case 'start':
        selectHandler.start()
        break;
      case 'stop':
        selectHandler.stop()
        break;
      case 'isSelecting':
        res = selectHandler.isSelecting
        break;
      case 'testNotify':
        testNotify()
        break;
      default:
        break;
    }
    return res
  }
}

const selectHandler = {
	blockEvent(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
	},
  onClickMap: new Map(),
  onClickFactory(frame){
    const func = function(e){
      // 获取iframe路径 => stop
      // const src = frame.frameElement.src
      const frameLocation = frame.location
      let locationItems = [
        { title: 'href', message: frameLocation.href },
        { title: 'pathname', message: frameLocation.pathname },
        { title: 'search', message: frameLocation.search },
        { title: 'hash', message: frameLocation.hash },
      ]
      locationItems = locationItems.filter((i) => i.message)
      // sendMsg.toBackground('location', locationItems)
      selectHandler.stop()
    }
    return func
  },
  isSelecting: false,
  start(){
    this.isSelecting = true
    this.listen(window)
    const iframes = window.frames
    for (let index = 0; index < iframes.length; index++) {
      const frameWindow = iframes[index];
      this.listen(frameWindow)
    }
  },
  stop(){
    this.isSelecting = false
    // this.onClickMap.forEach((value, key, map) => {
    //   try {
    //     key.removeEventListener('click', value)
    //   } catch (error) {
    //     console.log(error);        
    //   }
    // })
  },
  listen(currWindow){
    // debugger
    const isExist = this.onClickMap.has(currWindow)
    let onClickFunc = null
    if(isExist){
      onClickFunc = this.onClickMap.get(currWindow)
    }else{
      onClickFunc = this.onClickFactory(currWindow)
      this.onClickMap.set(currWindow, onClickFunc)
    }

    try {
      currWindow.addEventListener('click', onClickFunc)
      console.log('listen');
    } catch (error) {
      console.log('listen error');
      this.onClickMap.delete(currWindow, onClickFunc)
    }
  }
}


function testNotify(){
  sendToBackground({
    name: 'notify',
    body: {
      msg: 'testNotify'
    }
  })
  // Notifications.create({
  //   type: 'list',
  //   iconUrl: '',
  //   title: 'testTitle',
  //   message: 'testMsg'
  // },(id) => {
  //   console.log('id', id);
  // })
}

// Notifications.onButtonClicked.addListener((notificationId, btnIndex) => {
//   // console.log('btn clicked', notificationId, btnIndex);
//   if(notificationId === locationNotifyHandler.notificationId){
//     locationNotifyHandler.onBtnClick(btnIndex)
//   }
// })


const listener = () => {
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, boolean>((req, res) => {
    // req: 发来的消息本身，另外还有发送端信息
    const { name, body } = req
    const resp = cmdHandler.exec(name)
    res.send(resp)
  })

  return null
}

export default listener