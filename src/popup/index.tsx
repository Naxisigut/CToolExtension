/**
 * POPUP
 */

import './style.css';
import type { CollectFrameType } from '~types';
import { useState, useEffect, lazy } from "react"
import { CollectFrames, GetCookie, SetCookie } from 'src/api/index';
import CtIcon from '~components/CtIcon';

const LocationList = lazy(() => import('./components/LocationList'));

function IndexPopup() {
  const [ listData, setListData ] = useState<CollectFrameType[]>([])
  useEffect(() => {
    const fetchListData = async () => {
      const listData = await CollectFrames()
      setListData(listData)
    }
    fetchListData()
  }, [])

  const [ setCookieSuccess, setSetCookieSuccess] = useState(false)
  const setCookie = () => {
    GetCookie('session_id').then((res) => {
      SetCookie({
        cookieName: 'test',
        cookieValue: res
      }).then(()=>{
        setSetCookieSuccess(true)
        setTimeout(() => setSetCookieSuccess(false), 1500)
      })
    })
  }

  return (
    <div style={{ padding: 16 }} className=" w-80">
      <h1>
        <span className=' text-lg font-sans font-semibold leading-10'>iframe列表</span>
        <button className=' ml-2 py-1 px-2 border font-sans rounded-lg hover:bg-slate-200 ' onClick={setCookie}>设置cookie</button>
        {
          setCookieSuccess && <CtIcon icon={'check'}></CtIcon>
        }
      </h1>
      <LocationList data={listData}></LocationList>
    </div>
  )
}

export default IndexPopup
