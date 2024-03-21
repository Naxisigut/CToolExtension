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
          <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
          </svg>
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