import CtIcon from '~components/CtIcon';
import { copyText } from '~tools';

function LocationItem({ item }: { item: Location }){
  function copy(text){
    copyText(text)
    // TODO 成功提示
  }
  return (
    <li className=" flex items-center">
      <span className='flex-1 font-medium text-sm truncate'>{ item.href }</span>
      <div className=' ml-2'>
        <a href="javacript:;" title='复制hash' onClick={() => copy(item.hash)}>
          <CtIcon icon='copy'></CtIcon>
        </a>
      </div>
    </li>
  )
}

function LocationList({ data }: { data: Location[]}){
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