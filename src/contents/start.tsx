import { PlasmoCSConfig } from 'plasmo';
import { useMessage } from '@plasmohq/messaging/hook';
import { isTop, copyText } from 'src/tools/index';
export const config: PlasmoCSConfig = {
  matches: ["http://127.0.0.1:5502/*"],
  all_frames: true
}
const Notifications = chrome

console.log('this is content');
if(isTop()){
  console.log('isTop');
}

/* popup => content */
const cmdHandler = {
  exec(msgName){
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

const locationNotifyHandler = {
  notificationId: 'locationNotifyId',
  locationInfo: [], // 当前iframe信息
  showBtns: true,
  notifyOptions: {
    iconUrl: '',
    type: 'list',
    title: '',
    message: '',
    // buttons: [{title: '复制hash'}, {title: '复制全部'}],
    get buttons(){
      return locationNotifyHandler.showBtns ? [{title: '复制hash'}, {title: '复制全部'}] : undefined
    },
    get items(){
      return this.type === 'list' ? locationNotifyHandler.locationInfo : undefined
    }
  },
  locationNotify(items){
    // 发送chrome提示：location
    this.notifyOptions.type = 'list'
    this.notifyOptions.title = '获取路径'
    this.notifyOptions.message = ''
    this.showBtns = true
    this.locationInfo = items
    Notifications.create(this.notificationId, this.notifyOptions ,(id) => {
      console.log(id);
    })
    return this.notificationId
  },
  copyOver(title = '', msg = ''){
    this.notifyOptions.type = 'basic'
    this.notifyOptions.title = title
    this.notifyOptions.message = msg
    this.showBtns = false
    // 不用修改items，因为basic类型不会显示items
    Notifications.create(this.notificationId, this.notifyOptions, (id) => {
      console.log(id);
    })
  },
  findItems(key){
    if(key === 'hash')return this.locationInfo.find((i) => i.title === 'hash')
    if(key === 'href')return this.locationInfo.find((i) => i.title === 'href')
  },
  onBtnClick(btnIndex){
    switch (btnIndex) {
      case 0: // 复制hash
        const hashItems = this.findItems('hash')
        console.log(hashItems);
        if(hashItems){
          copyText(hashItems.message)
          this.copyOver('复制成功')
        }else{
          this.copyOver('复制失败', 'hash不存在')
        }
        break;
        case 1: // 复制全部
        const hrefItems = this.findItems('href')
        if(hrefItems){
          copyText(hrefItems.message)
          this.copyOver('复制成功')
        }else{
          this.copyOver('复制失败', '路径不存在')
        }
        break;
    
      default:
        break;
    }
  }
}

const listener = () => {
  // ret: {data: ${req.body}}
  // useMessage的泛型 前一个参数是接收到的req.body的类型，后一个参数是res.send返回的数据类型
  const ret = useMessage<string | void, boolean>((req, res) => {
    // req: 发来的消息本身，另外还有发送端信息
    const { name, body } = req
    console.log('req.name', name);
    const resp = cmdHandler.exec(name)
    res.send(resp)
  })

  return null
}

export default listener