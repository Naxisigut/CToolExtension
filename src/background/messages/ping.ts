/* 引入type */
import type { PlasmoMessaging } from "@plasmohq/messaging"

const querySomeApi = (id: any)=>{
  return new Promise<number>((resolve, reject) => {
    setTimeout(()=>{
      resolve(1111)
    }, 2000)
  })
}

/**
 * 接收消息的处理函数
 * @param req 接收到的消息，消息的结构应为一个包含name和body的对象
 * @param res 发送消息对象，调用其send方法可以返回响应
 */
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await querySomeApi(req.body.id)
  console.log('back' , message);
  res.send({
    message
  })
}
 
export default handler