import type { CollectFrameType } from '~types';
import CtIcon from '~components/CtIcon';
import { copyText } from '~tools';
import { useState } from 'react';
import { Badge } from 'flowbite-react';

function LocationItem({ item, active, setActive }: { 
  item: CollectFrameType,
  setActive: () => void
  active: Boolean,
}){
  function copy(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, text: string){
    e.stopPropagation()
    copyText(text)
    setCopySuccess(true)
    setTimeout(()=>{
      setCopySuccess(false)
    },2000)
  }

  const [ copySuccess, setCopySuccess ] = useState(false)
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
    <li className={` hover:bg-slate-200 rounded-md px-1 ${active ? ' bg-slate-200' : ''}`}>
      <section className=" flex items-center" onClick={ setActive }>
        <div className='flex-1 w-0 flex'>
          {
            isGyl
            ? <Badge size='xs' color='success' className='mr-2'>GYL</Badge>
            : <Badge size='xs' color='failure' className='mr-2'>ERP</Badge> 
          }
          <a title={item.location.href} className='font-medium text-sm truncate'>{ item.tabName }</a>
        </div>
        <div className=' ml-2'>
          <a title='复制hash' onClick={(e) => copy(e, item.location.hash)}>
            <CtIcon icon={copySuccess ? "check" : "copy"}></CtIcon>
          </a>
        </div>
      </section>

      <section >
        {
          params.map((param) => {
            return <span>{ param.key }: { param.value}</span>
          })
        }
      </section>
    </li>
  )
}

function LocationList({ data }: { data: CollectFrameType[]}){
  const [activeIdx, setActiveIdx] = useState(-1)
  return (
    <ul className=" w-80">
      {
        data.map((item, index) => {
          return (
            <LocationItem 
              item={item} 
              key={index} 
              active={index === activeIdx}
              setActive={() => {
                console.log(2222)
                setActiveIdx(index)
              }}
            ></LocationItem>
          )
        })
      }
    </ul>
  )
}

export default LocationList