/**
 * POPUP
 */

import './style.css';
import type { CollectFrameType } from '~types';
import { useState, useEffect, lazy } from "react"
import { collectFrames, getCookie } from 'src/api/index';

const LocationList = lazy(() => import('./components/LocationList'));

function IndexPopup() {
  const [ listData, setListData ] = useState<CollectFrameType[]>([])
  useEffect(() => {
    const fetchListData = async () => {
      const listData = await collectFrames()
      setListData(listData)
    }
    fetchListData()
  }, [])

  const setCookie = () => {
    getCookie('session_id').then((res) => {
      console.log(3333, res);
    })
  }

  return (
    <div style={{ padding: 16 }} className=" w-80">
      <h1>
        <span className=' text-lg font-sans font-semibold leading-10'>iframe列表</span>
        <button className=' ml-2 py-1 px-2 border font-sans rounded-lg overflow-hidden cursor-pointer hover:bg-slate-200 ' onClick={setCookie}>设置cookie</button>
      </h1>
      <LocationList data={listData}></LocationList>
    </div>
  )
}

export default IndexPopup
