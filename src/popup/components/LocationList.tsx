import type { CollectFrameType } from '~types';
import CtIcon from '~components/CtIcon';
import { copyText } from '~tools';
import { useState } from 'react';
import { Badge } from 'flowbite-react';

function LocationItem({ item }: { item: CollectFrameType }){
  const [ copySuccess, setCopySuccess ] = useState(false)
  function copy(text: string){
    copyText(text)
    setCopySuccess(true)
    setTimeout(()=>{
      setCopySuccess(false)
    },2000)
  }
  const isGyl = item.location.pathname === "/gyl/"
  
  const params = []
  const searchStr = item.location.href.split('?')[1]
  if(searchStr){
    const obj = new URLSearchParams(searchStr)
    obj.forEach((v, k) =>{
      params.push({
        key: k,
        value: v
      })
    })
  }
  console.log(111, params);

  return (
    <li className=" flex items-center">
      <div className='flex-1 w-0 flex'>
        {
          isGyl
          ? <Badge size='xs' color='success' className='mr-2'>GYL</Badge>
          : <Badge size='xs' color='failure' className='mr-2'>ERP</Badge> 
        }
        <a title={item.location.href} className='font-medium text-sm truncate'>{ item.tabName }</a>
      </div>
      <div className=' ml-2'>
        <a title='复制hash' onClick={() => copy(item.location.hash)}>
          <CtIcon icon={copySuccess ? "check" : "copy"}></CtIcon>
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