
import { useState, useEffect, lazy } from "react"
import type { CollectFrameType } from '~types';
import { 
  CollectFrames,
} from '~/api/index';

const LocationList = lazy(() => import('~popup/components/LocationList'));

function GetIframes() {
  /* iframe列表数据 */
  const [ listData, setListData ] = useState<CollectFrameType[]>([])
  useEffect(() => {
    const fetchListData = async () => {
      const listData = await CollectFrames()
      setListData(listData)
    }
    fetchListData()
  }, [])

  return (
    <div className="h-full overflow-y-auto">
      <LocationList data={listData}></LocationList>
    </div>
  )
}

export default GetIframes
