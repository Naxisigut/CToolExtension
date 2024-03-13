import { useState } from "react"
import { sendToBackground } from '@plasmohq/messaging';


function IndexPopup() {
  const [isSelecting, setIsSelecting] = useState(false)
  const [message, setMessage] = useState("")

  const handleClick = async () => {
    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 123
      }
    })
    setMessage(resp.message)

    setIsSelecting(!isSelecting)
  }

  return (
    <div style={{ padding: 16 }}>
      <a href="https://docs.plasmo.com" target="_blank">Plasmo</a>{" "}
      <div>
        <button id="selector" onClick={ handleClick }>
          { isSelecting ? 'stop' : 'select' }
        </button>
        <div>{ message }</div>
      </div>
    </div>
  )
}

export default IndexPopup
