/**
 * POPUP
 */

import './style.css';
import type { CollectFrameType } from '~types';
import { useState, useEffect, lazy } from "react"
import { collectFrames } from 'src/api/index';

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
  return (
    <div style={{ padding: 16 }}>
      <a href="https://docs.plasmo.com" target="_blank">Plasmo</a>{" "}
      <LocationList data={listData}></LocationList>
    </div>
  )
}

export default IndexPopup
