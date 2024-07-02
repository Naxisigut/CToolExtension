import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '~/popup/views/Home';
import GetIframes from '~/popup/views/GetIframes/index';
import SetCookies from '~/popup/views/SetCookies/index';
import Layout from '~popup/views/Layout';

export const routes = [
  {
    path: "/",
    element: <Home />,
    $RouteName: "首页",
    $HideButton: true,
  },
  {
    path: "/functions",
    element: <Layout />,
    children: [
      {
        path: "getIframes",
        element: <GetIframes />,
        $RouteName: "Iframes列表",
        $HideButton: false,
      },
      {
        path: "setCookies",
        element: <SetCookies />,
        $RouteName: "设置Cookie",
        $HideButton: false,
      },
    ]
  }
]

const functionParent = routes[1]
export const functionRoutes = functionParent.children.reduce((curr, i) => {
  const route = {
    path: `${functionParent.path}/${i.path}`,
    $RouteName: i.$RouteName,
  }
  if(!i.$HideButton)curr.push(route)
  return curr
}, [])

export function getFunctionRouting(pathname:string){
  return functionRoutes.find(i => i.path === pathname )
}

export default function Routing(){
  return useRoutes(routes)
}