/**
 * POPUP
 */

import './style.css';
import { useState, useEffect, lazy, Suspense } from "react"
import { MemoryRouter } from 'react-router-dom';
import Routing from './routes/index';

// const LocationList = lazy(() => import('./components/LocationList'));

// function IndexPopup() {
//   /* iframe列表数据 */
//   const [ listData, setListData ] = useState<CollectFrameType[]>([])
//   useEffect(() => {
//     const fetchListData = async () => {
//       const listData = await CollectFrames()
//       setListData(listData)
//     }
//     fetchListData()
//   }, [])

//   /* 设置cookie */
//   const [ setCookieSuccess, setSetCookieSuccess] = useState<null | boolean>(null)
//   const setCookie = async () => {
//     let sessionId = await GetCookie('session_id')
//     if(!sessionId) sessionId = await GetCookie('erp_session_id')
//     if(sessionId){
//       await SetCookie({
//         cookieName: 'erp_session_id',
//         cookieValue: sessionId
//       })
//     }
//     setSetCookieSuccess(!!sessionId)
//     setTimeout(() => setSetCookieSuccess(null), 1500)
//   }

//   const bgGetCookie = async () => {
//     const res = await BgGetCookie()
//     console.log('res', res);
//   }

//   return (
//     <div style={{ padding: 16 }} className=" w-80">
//       <h1>
//         <span className=' text-lg font-sans font-semibold leading-10'>iframe列表</span>
//         <button className=' ml-2 py-1 px-2 border font-sans rounded-lg hover:bg-slate-200 ' onClick={bgGetCookie}>设置cookie</button>
//         {
//           setCookieSuccess === true 
//           ? <CtIcon icon={'check'}></CtIcon> 
//           : setCookieSuccess === false
//           ? <CtIcon icon={'close'}></CtIcon> 
//           : null 
//         }
//       </h1>
//       <LocationList data={listData}></LocationList>
//     </div>
//   )
// }

function IndexPopup(){
  return (
    <div className='app bg-gray-50 w-[400px] p-3 min-h-[300px]'>
      <MemoryRouter>
        {/* 
          fix: Error: A component suspended while responding to synchronous input. 
          This will cause the UI to be replaced with a loading indicator. 
          To fix, updates that suspend should be wrapped with startTransition.
          使用Suspense包裹Routing 
        */}
        <Suspense>
          <Routing></Routing>
        </Suspense>
      </MemoryRouter>
    </div>
  )
}

export default IndexPopup
