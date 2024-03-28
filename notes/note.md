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

## tailwindcss
#### 安装依赖
```
pnpm i -D tailwindcss postcss autoprefixer
```
#### 初始化tailwind
```
pnpx tailwindcss init
```
#### 配置tailwind
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: []
}
```
#### 配置postcss
```js
// postcss.config.js
/**
 * @type {import('postcss').ProcessOptions}
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```
#### 引入
```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```tsx
// popup/index.tsx
import './style.css';
```

## flowbite
#### 安装依赖
```
pnpm install flowbite flowbite-react
```
#### 配置tailwind
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['node_modules/flowbite-react/lib/esm/**/*.js'], // 新增
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // 新增
  ],
}
```
#### 使用
```tsx
// any.tsx文件内
import { Badge } from 'flowbite-react';
```

## react-spring
#### 安装
```
pnpm i @react-spring/web
```
#### 使用：以条件渲染的元素进出场动画为例
LocationItem是一个列表项组件，要求在点击该项时，展开详细信息，再次点击收起。展开需要有动效。
点击展开收起的逻辑已经实现，现在看怎样使用react-spring来添加动效。
这里用到`useTransition`这个api。
```tsx
import { animated, useTransition } from '@react-spring/web'

/* 列表项组件 */
function LocationItem({ item, active, setActive }: { 
  item: CollectFrameType,
  setActive: () => void
  active: Boolean,
}){

  /* 过渡动画 */
  const transitions = useTransition(active, {
    config: { 
      duration: 300 // 动画时间
    }, 
    from: { // 初始状态 
      opacity: 0 
    },
    enter: { // 入场结束状态
      opacity: 1 
    }, 
    // leave: { // 离场结束状态
    //   opacity: 0 
    // },
  })

  return (
    <li className={` rounded-md overflow-hidden p-1 hover:bg-slate-200 ${active ? ' bg-slate-200' : ''} transition-all duration-500`}>
      <section className={` flex items-center cursor-pointer`} onClick={ setActive }>
        // ...常显部分
      </section>

      {/* 展开部分 */}
      {
        transitions((style, item) => (
          // item为useTransition的第一个参数，若是数组则依次传进来
          // 这里的item就是active，根据active条件渲染后面的节点。
          // style则是react-spring根据动效配置生成的css样式。
          item && (
            <>
              {/* animated和style需要添加到元素上  */}
              <animated.div className=' my-1 pb-0 h-px bg-slate-400' style={style}></animated.div>
              <animated.section className=' p-1' style={style}>
                // ...详细信息
              </animated.section>
            </>
          )
        ))
      }
    </li>
  )
}

```