import { useState } from 'react';
import {
  GetCookie, 
  SetCookie,
  BgGetCookie,
  BgGetTabs,
} from 'src/api/index';

export default function SetCookies() {
    /* 设置cookie */
    const [ setCookieSuccess, setSetCookieSuccess] = useState<null | boolean>(null)
    const setCookie = async () => {
      let sessionId = await GetCookie('session_id')
      if(!sessionId) sessionId = await GetCookie('erp_session_id')
      if(sessionId){
        await SetCookie({
          cookieName: 'erp_session_id',
          cookieValue: sessionId
        })
      }
      setSetCookieSuccess(!!sessionId)
      setTimeout(() => setSetCookieSuccess(null), 1500)
    }

    const getTabs = async () => {
      const queryOptions = { url: '*://*.51hgp.com/erp_development/*' };
      const res = await BgGetTabs(queryOptions)
      console.log('tabs res', res);
    }
  
    const bgGetCookie = async () => {
      const res = await BgGetCookie()
      console.log('res', res);
    }
  return (
    <div>
      <button className=' ml-2 py-1 px-2 border font-sans rounded-lg hover:bg-slate-200 ' onClick={bgGetCookie}>设置cookie</button>
    </div>
  )
};
