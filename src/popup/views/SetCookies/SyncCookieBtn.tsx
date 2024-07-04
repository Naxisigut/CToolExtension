import { useState } from "react"
import {
  GetCookie, 
  BgSetCookie,
  BgGetCookie,
  BgGetTabs,
} from 'src/api/index';
import { erpTabInfoMap } from '~tools/hgp';
import type { TabInfo } from '~tools/hgp';

export default function SyncCookieBtn({
  ErpTabItem,
  localErpUrl,
}: {
  ErpTabItem,
  localErpUrl: string,
}) {
  
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
    return await BgSetCookie({
      url: localErpUrl,
      name: "erp_session_id",
      value: value
    })
  }
  
  const [syncSuccess, setSyncSuccess] = useState<null | boolean>(null)
  const sync = async (env: string) => {
    let syncRes = false
    const cookieValue = await getErpCookie(env)
    if(cookieValue){
      const res = await setLocalhostCookie(cookieValue)
      if(res)syncRes = true
    }
    setSyncSuccess(syncRes)
    setTimeout(() => setSyncSuccess(null), 1500)
  }

  return (
    <button
      className=" h-10 border rounded-lg font-bold bg-white hover:scale-105 ease-in-out duration-100 w-[200px] mt-2"
      key={ErpTabItem.abbr}
      onClick={() => sync(ErpTabItem.abbr)}
    > 
      {
        syncSuccess === null 
        ? `同步${ErpTabItem.text}Cookie`
        : `同步${syncSuccess ? '成功' : '失败'}`
      }
    </button>
  )
};
