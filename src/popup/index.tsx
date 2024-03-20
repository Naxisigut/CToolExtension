import './style.css';
import { useState, useEffect, lazy } from "react"
import { collectFrames } from 'src/api/index';

const LocationList = lazy(() => import('./components/LocationList'));

function IndexPopup() {
  const [ listData, setListData ] = useState([])
  useEffect(() => {
    const fetchListData = async () => {
      const listData = await collectFrames()
      console.log('fetch', listData);
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
