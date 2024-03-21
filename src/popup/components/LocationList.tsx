import type { CollectFrameType } from '~types';
import CtIcon from '~components/CtIcon';
import { copyText } from '~tools';

function LocationItem({ item }: { item: CollectFrameType }){
  function copy(text: string){
    copyText(text)
    // TODO 成功提示
  }
  return (
    <li className=" flex items-center">
      <a href="javascript:;" title={item.location.href} className='flex-1 font-medium text-sm truncate'>{ item.tabName }</a>
      <div className=' ml-2'>
        <a href="javacript:;" title='复制hash' onClick={() => copy(item.location.hash)}>
          <CtIcon icon='copy'></CtIcon>
        </a>
      </div>
    </li>
  )
}

function LocationList({ data }: { data: CollectFrameType[]}){
  return (
    <ul className=" w-80">
      {
        data.map((item, index) => {
          return <LocationItem item={item} key={index}></LocationItem>
        })
      }
    </ul>
  )
}

export default LocationList