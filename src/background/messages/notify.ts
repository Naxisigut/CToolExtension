import type { PlasmoMessaging } from '@plasmohq/messaging';
import { isTop, copyText } from 'src/tools/index';

const Notifications = chrome.notifications
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



const handler : PlasmoMessaging.MessageHandler = (req, resHandler) => {
  const msg = req.body.msg
  
  Notifications.create({ 
    iconUrl: 'https://img2.baidu.com/it/u=793173674,3413416703&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    type: 'basic',
    title: '',
    message: msg,
  })
  resHandler.send('received')
}

export default handler