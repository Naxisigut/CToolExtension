import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = (req, resHandler) => {
  console.log('req', req);

  const queryOptions = { url: '*://*.51hgp.com/*' };
    
  chrome.tabs.query(queryOptions, (tabs) => {
    console.log(1111, tabs);
    chrome.cookies.get({
      name: "erp_session_id", 
      url: "https://internal-dev.51hgp.com/"
    }, (res) => {
      console.log(222, res);
    })
    // if (tabs.length > 0) {
    //   console.log(222, tabs.length);
    //   const tabId = tabs[0].id;
    //   chrome.cookies.getAll({ domain: ".51hgp.com" }, (cookies) => {
    //     console.log(333,  cookies);
    //     // sendResponse({ cookies: cookies });
    //   });
    // } else {
    //   console.log(444);
    //   // sendResponse({ cookies: [] });
    // }
  });

  resHandler.send('cmd get')
}

export default handler