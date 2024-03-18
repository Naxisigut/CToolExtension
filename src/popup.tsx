import { useState } from "react"
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';


function IndexPopup() {
  // const [isSelecting, setIsSelecting] = useState(false)
  // const [message, setMessage] = useState("")

  const handleClick = async (command: string) => {
    const resp = await sendToContentScript({
      name: command,
      body: ''
    })
    console.log('resp', resp);
  }

  return (
    <div style={{ padding: 16 }}>
      <a href="https://docs.plasmo.com" target="_blank">Plasmo</a>{" "}
      <div>
        <button id="selector" onClick={ () => handleClick('start') }>start</button>
        <button id="selector" onClick={ () => handleClick('stop') }>stop</button>
        <button id="selector" onClick={ () => handleClick('isSelecting') }>isSelecting</button>
        <button id="selector" onClick={ () => handleClick('testNotify') }>testNotify</button>
      </div>
    </div>
  )
}

export default IndexPopup
