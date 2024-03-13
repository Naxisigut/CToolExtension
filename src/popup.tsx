import { useState } from "react"

function IndexPopup() {
  const [isSelecting, setIsSelecting] = useState(false)
  const handleClick = () => {
    setIsSelecting(!isSelecting)
  }

  return (
    <div style={{ padding: 16 }}>
      <a href="https://docs.plasmo.com" target="_blank">Plasmo</a>{" "}
      <div>
        <button id="selector" onClick={ handleClick }>
          { isSelecting ? 'stop' : 'select' }
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
