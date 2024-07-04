import { useEffect, useState } from 'react';
import {
  GetCookie, 
  BgSetCookie,
  BgGetCookie,
  BgGetTabs,
} from 'src/api/index';
import { erpTabInfoMap } from '~tools/hgp';
import type { TabInfo } from '~tools/hgp';
import SyncCookieBtn from './SyncCookieBtn';

export default function SetCookies() {
  /* 获取Erp的Tab */
  const [ currErpTabs, setCurrErpTabs] = useState([] as TabInfo[])
  const [ currLocalTabs, setCurrLocalTabs] = useState([] as chrome.tabs.Tab[])
  const getErpTabs = async () => {
    const queryOptions = { url: '*://*.51hgp.com/*' };
    const erpTabs = await BgGetTabs(queryOptions) as chrome.tabs.Tab[]
    console.log(111, erpTabs);
    const currErpTabs: TabInfo[] = []
    erpTabs.forEach(tab => {
      if(!tab.incognito && tab.url && tab.url.includes(`${erpTabInfoMap.dev.domain}/${erpTabInfoMap.dev.path}`))currErpTabs.push(erpTabInfoMap.dev)
      if(!tab.incognito && tab.url && tab.url.includes(`${erpTabInfoMap.test.domain}/${erpTabInfoMap.test.path}`))currErpTabs.push(erpTabInfoMap.test)
    })
    setCurrErpTabs(currErpTabs)
  }

  /* 获取本地项目Tab */
  const [ localErpUrl, setLocalErpUrl ] = useState<string>("")
  const getLocalTabs = async () => {
    const queryOptions = { url: '*://localhost/*' };
    const localTabs = await BgGetTabs(queryOptions) as chrome.tabs.Tab[]
    setCurrLocalTabs(localTabs)
    if(localTabs.length)setLocalErpUrl(localTabs[0].url)
  }

  useEffect(() => {
    getErpTabs()
    getLocalTabs()
  }, [])

  return (
    <div className='h-full flex flex-col items-center pt-10'>
      {
        !currErpTabs.length 
        ? <div className=' font-bold text-base font-sans text-red-400'>请打开开发或测试环境ERP</div>
        : !currLocalTabs.length
        ? <div className=' font-bold text-base font-sans text-red-400'>请启动本地工云链</div>
        : ( 
          currErpTabs.map((i, index) => {
            return <SyncCookieBtn ErpTabItem={i} localErpUrl={localErpUrl} key={index} />
          })
        )
      }
    </div>
  )
};
