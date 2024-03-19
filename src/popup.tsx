import { useState } from "react"
import { sendToBackground, sendToContentScript } from '@plasmohq/messaging';

const collect = async (): Promise<Array<Location>>=>{
  const resp = await sendToContentScript({
    name: 'collectFrames',
  })
  return resp
}


function IndexPopup() {
  // const [isSelecting, setIsSelecting] = useState(false)
  
  const [locationArr, setLocationArr] = useState<Array<Location>>([])
  // collect().then((res) => {
  //   setLocationArr(res)
  // })

  return (
    <div style={{ padding: 16 }}>
      <a href="https://docs.plasmo.com" target="_blank">Plasmo</a>{" "}
      <div>
        {
          locationArr.map(i => <span>{i.href}</span>)
        }
      </div>
    </div>
  )
}

export default IndexPopup
