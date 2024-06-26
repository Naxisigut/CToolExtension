import type { CollectFrameType } from '~types';
import CtIcon from '~components/CtIcon';
import { copyText, getHgpParams, getHgpPath } from '~tools';
import { useState } from 'react';
import { Badge } from 'flowbite-react';
import { animated, useTransition } from '@react-spring/web'

/* 列表组件 */
export default function LocationList({ data }: { data: CollectFrameType[]}){
  const [activeIdx, setActiveIdx] = useState(-1)
  
  return data.length ? (
    <ul>
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
  ) : (
    <div>暂无数据</div>
  )
}

/* 列表项组件 */
function LocationItem({ item, active, setActive }: { 
  item: CollectFrameType,
  setActive: () => void
  active: Boolean,
}){
  console.log(0, item, active);

  const isGyl = item.location.pathname === "/gyl/" //新旧页面标识
  const path = getHgpPath(item.location) // 页面路径
  const params = getHgpParams(item.location) // 页面参数

  /* 复制hash */
  const [ copyResIcon, setCopyResIcon ] = useState('copy')
  function copy(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, text: string){
    e.stopPropagation()
    if(text)copyText(text)
    setCopyResIcon( text ? 'check' : 'close')
    setTimeout(()=>{
      setCopyResIcon('copy')
    }, 1000)
  }

  /* 过渡动画 */
  const transitions = useTransition(active, {
    config: { 
      duration: 300 // 动画时间
    }, 
    from: { // 初始状态 
      opacity: 0 
    },
    enter: { // 入场结束状态
      opacity: 1 
    }, 
    // leave: { // 离场结束状态
    //   opacity: 0 
    // },
  })

  return (
    <li className={` rounded-md overflow-hidden p-1 hover:bg-slate-200 ${active ? ' bg-slate-200' : ''} transition-all duration-500`}>
      {/* 收起部分 */}
      <section className={` flex items-center cursor-pointer`} onClick={ setActive }>
        <div className='flex-1 w-0 flex'>
          {/* 新老页面标识 */}
          {
            isGyl
            ? <Badge size='xs' color='success' className='mr-2'>GYL</Badge>
            : <Badge size='xs' color='failure' className='mr-2'>ERP</Badge> 
          }
          {/* 页面名称 */}
          <a title={item.location.href} className='font-medium text-sm truncate'>{ item.tabName }</a>
        </div>
        {/* 按钮 */}
        <div className=' ml-2'>
          <a className=' inline-block' title='复制hash' onClick={(e) => copy(e, item.location.hash)}>
            <CtIcon icon={copyResIcon}></CtIcon>
          </a>
        </div>
      </section>

      {/* 展开部分 */}
      {
        transitions((style, item) => (
          // item为useTransition的第一个参数，若是数组则依次传进来
          item && (
            <>
              {/* animated和style需要添加到元素上  */}
              <animated.div className=' my-1 pb-0 h-px bg-slate-400' style={style}></animated.div>
              <animated.section className=' p-1' style={style}>
                <div className=' text-sm'>
                  <h5 className='inline-block w-[50px]'>PATH: </h5>
                  <p className='inline'>{ path }</p>
                </div>

                <div className=' flex flex-wrap mt-1'>
                  {
                    params.map((param, index) => {
                      return <ParamTag tag={param} key={index}></ParamTag>
                    })
                  }
                </div>
              </animated.section>
            </>
          )
        ))
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
