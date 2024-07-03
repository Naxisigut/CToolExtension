import { useEffect, useState } from 'react';
import {
  GetCookie, 
  BgSetCookie,
  BgGetCookie,
  BgGetTabs,
} from 'src/api/index';
import { erpTabInfoMap } from '~tools/hgp';
import type { TabInfo } from '~tools/hgp';

export default function SetCookies() {
  /* 获取Erp和本地项目的Tab */
  const [ currErpTabs, setCurrErpTabs] = useState([] as TabInfo[])
  const [ currLocalTabs, setCurrLocalTabs] = useState([] as chrome.tabs.Tab[])
  const getErpTabs = async () => {
    const queryOptions = { url: '*://*.51hgp.com/*' };
    const erpTabs = await BgGetTabs(queryOptions) as chrome.tabs.Tab[]
    const currErpTabs: TabInfo[] = []
    erpTabs.forEach(tab => {
      if(tab.url && tab.url.includes(`${erpTabInfoMap.dev.domain}/${erpTabInfoMap.dev.path}`))currErpTabs.push(erpTabInfoMap.dev)
      if(tab.url && tab.url.includes(`${erpTabInfoMap.test.domain}/${erpTabInfoMap.test.path}`))currErpTabs.push(erpTabInfoMap.test)
    })
    setCurrErpTabs(currErpTabs)
  }
  const getLocalTabs = async () => {
    const queryOptions = { url: '*://localhost/*' };
    const localTabs = await BgGetTabs(queryOptions) as chrome.tabs.Tab[]
    setCurrLocalTabs(localTabs)
  }

  useEffect(() => {
    getErpTabs()
    getLocalTabs()
  }, [])

  
  /* 获取指定环境Erp的Cookie */
  const getErpCookie = async (env: string) => {
    let cookieValue = await BgGetCookie({
      name: "erp_session_id",
      url: "https://" + erpTabInfoMap[env].domain
    })
    
    if(!cookieValue)cookieValue = await BgGetCookie({
      name: "erp_session_id",
      url: "https://" + erpTabInfoMap[env].domain
    })

    return cookieValue || false
  }

  /* 同步本地工云链项目的Cookie */
  const setLocalhostCookie = async (value: string) => {
    await BgSetCookie({
      url: currLocalTabs[0].url,
      name: "erp_session_id",
      value: value
    })
  }

  const trigger = async (env: string) => {
    const cookieValue = await getErpCookie(env)
    await setLocalhostCookie(cookieValue)
  }

  return (
    <div className='h-full flex flex-col items-center pt-10'>
      {
        !currErpTabs.length 
        ? <div className=' font-bold text-base font-sans text-red-400'>请打开开发或测试环境ERP</div>
        : !currLocalTabs.length
        ? <div className=' font-bold text-base font-sans text-red-400'>请启动本地工云链</div>
        : ( currErpTabs.map((i) => {
            return (
              <button
                className=" h-10 border rounded-lg font-bold bg-white hover:scale-105 ease-in-out duration-100 p-2 mt-2"
                key={i.abbr}
                onClick={() => trigger(i.abbr)}
              >
              同步{ i.text }Cookie
            </button>
            )
          })
        )
      }
    </div>
  )
};
