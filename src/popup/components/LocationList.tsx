import type { CollectFrameType } from '~types';
import CtIcon from '~components/CtIcon';
import { copyText } from '~tools';
import { useState } from 'react';
import { Badge } from 'flowbite-react';

/* 列表组件 */
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
                setActiveIdx(activeIdx === index ? -1 : index)
              }}
            ></LocationItem>
          )
        })
      }
    </ul>
  )
}

/* 列表项组件 */
function LocationItem({ item, active, setActive }: { 
  item: CollectFrameType,
  setActive: () => void
  active: Boolean,
}){
  console.log(0, item);
  /* 复制hash */
  const [ copySuccess, setCopySuccess ] = useState(false)
  function copy(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, text: string){
    e.stopPropagation()
    copyText(text)
    setCopySuccess(true)
    setTimeout(()=>{
      setCopySuccess(false)
    },1000)
  }

  /* 新旧页面标识 */
  const isGyl = item.location.pathname === "/gyl/"

  /* 参数 */
  const params = []
  const searchStr = item.location.href.split('?')[1]
  if(searchStr){
    const obj = new URLSearchParams(searchStr)
    obj.forEach((value, key) =>{
      params.push({key, value})
    })
  }

  /* 路径 */
  function getPath(location: Location){
    let res = ''
    const { href, origin } = location
    res = href.split(origin)[1]
    res = res.split('?')[0]
    return res
  }
  const path = getPath(item.location)
  console.log(222, path);

  return (
    <li className={` rounded-md overflow-hidden p-1 hover:bg-slate-200 ${active ? ' bg-slate-200' : ''}`}>
      <section className={` flex items-center`} onClick={ setActive }>
        <div className='flex-1 w-0 flex'>
          {
            isGyl
            ? <Badge size='xs' color='success' className='mr-2'>GYL</Badge>
            : <Badge size='xs' color='failure' className='mr-2'>ERP</Badge> 
          }
          <a title={item.location.href} className='font-medium text-sm truncate'>{ item.tabName }</a>
        </div>
        <div className=' ml-2'>
          <a className=' inline-block' title='复制hash' onClick={(e) => copy(e, item.location.hash)}>
            <CtIcon icon={copySuccess ? "check" : "copy"}></CtIcon>
          </a>
          <a className=' inline-block' title='复制文件路径' onClick={(e) => copy(e, item.location.hash)}>
            <CtIcon icon={copySuccess ? "check" : "copy"}></CtIcon>
          </a>
        </div>
      </section>

      {
        active && (
          <section className=' p-1'>
            <div className=' h-px bg-slate-400'></div>
            <div className=' text-sm'>
              <h5 className='inline-block w-[50px]'>PATH: </h5>
              <p className='inline'>{ path }</p>
            </div>
            <div className=' text-sm'>
              <h5 className='inline-block w-[50px]'>FILE: </h5>
              <p className='inline'>{  }</p>
            </div>
            <div className=' flex flex-wrap mt-1'>
              {
                params.map((param) => {
                  return <ParamTag tag={param}></ParamTag>
                })
              }
            </div>
          </section>
        ) 
      }
    </li>
  )
}

function ParamTag({tag}: {
  tag: { key: String, value: String }
}){
  return (
    <span className='rounded-full bg-red-300 px-2 py-1 mr-1 mb-1'>
      <span className=' font-bold'>{ tag.key }: </span>
      <span>{ tag.value }</span>
    </span>
  )
}


export default LocationList