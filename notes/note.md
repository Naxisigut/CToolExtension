## 项目初始化
#### 创建
```js
npm create plasmo
```
#### src目录
1. 创建src目录，并将popup.tsx移入其中
2. tsconfig.json修改编译别名
```json
{
  "extends": "plasmo/templates/tsconfig.base",
  "exclude": [
    "node_modules"
  ],
  "include": [
    ".plasmo/index.d.ts",
    "./**/*.ts",
    "./**/*.tsx"
  ],
  "compilerOptions": {
    "paths": {
      "~*": [
        // "./*"
        "./src/*"
      ]
    },
    "baseUrl": "."
  }
}
```
#### background
由于一般都要进行通信，所以这里不只是需要`background.js`文件，而是需要一个`background`文件夹。
`/src/background/index.ts`是background里会执行的代码。
```ts
// src/background/index.ts
console.log('this is background');
```
#### contents
单个名为`content.ts`可以生效，但一般会有多个需要执行的content文件，所以需要一个`contents`文件夹。
`/src/contents`下的每个`.js`, `.ts`, `.tsx`, `.jsx`, `.vue`, `.svelte`文件均会根据其中导出的config，加载在不同的页面当中。
- `.js`, `.ts`文件不能使用很多框架的api，只能执行单纯的js逻辑。
- `.tsx`, `.jsx`, `.vue`, `.svelte`可以执行js代码，同时导出的模板文件会被渲染到页面上。

## 通信
`@plasmohq/messaging`是用于plasmo里通信的库，需要独立安装。
安装完成后，有多个方式可以完成不同场景下的通信。
```
npm install @plasmohq/messaging
```
### Message Flow
#### api：`sendToBackground`
- flow: popup/content => background
1. 创建`src/background/messages/{MessageName}.ts`
2. 在该文件内默认导出处理该事件的handler函数
3. 在popup/content内引入`@plasmohq/messaging`的`sendToBackground`方法
4. `sendToBackground`在调用时，会根据传入参数对象的name键值，将数据传输给相应的handler。
5. `sendToBackground`返回一个promise，其结果为来自background的响应。
```tsx
// src/popup.tsx
import { useState } from "react"
import { sendToBackground } from '@plasmohq/messaging';
function IndexPopup() {
  const [message, setMessage] = useState("")
  const handleClick = async () => {
    const resp = await sendToBackground({
      name: "ping", // 事件名，表示会与src/messages/ping.ts进行通信
      body: {
        id: 123
      }
    })
    setMessage(resp.message)
  }

  return (
    <div>
      <button id="selector" onClick={ handleClick }>select</button>
      <div>{ message }</div>
    </div>
  )
}
export default IndexPopup
```
```ts
// src/messages/ping.ts

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
```
#### api: `sendToContentScript`
- flow: popup => content
1. 创建`src/content/{anyName}.tsx`(不能为`.ts`文件，会导致收不到消息)
2. 在该文件内自`@plasmohq/messaging/hook`引入`useMessage`并使用
3. 在popup内自`@plasmohq/messaging`引入`sendToContentScript`并使用
```tsx
// src/popup.tsx
import { sendToContentScript } from '@plasmohq/messaging';

function IndexPopup() {
  const [message, setMessage] = useState("")

  const handleClick = async () => {
    const resp = await sendToContentScript({
      name: "start",
      body: 'request begin'
    })
  }

  return (
    <button id="selector" onClick={ handleClick }>
      SendToContent
    </button>
  )
}

export default IndexPopup
```
```tsx
// src/content/{anyName}.tsx
import { useMessage } from '@plasmohq/messaging/hook';

const handler = () => {
  // data: req.body
  const { data } = useMessage<string, string>((req, res) => {
    // req: 收到的消息本身，另外还有发送端信息
    console.log('req', req);
    res.send("response back") // 返回消息
  })

  return null
}
export default handler
```

### porting