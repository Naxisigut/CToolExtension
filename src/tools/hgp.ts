/**
 * 获取页面路径
 * @param location 
 * @returns 
 */
export function getHgpPath(location: Location){
  let res = ''
  const { href, origin } = location
  res = href.split(origin)[1]
  res = res.split('?')[0]
  return res
}

export function getHgpParams(location: Location){
  const params = []
  const searchStr = location.href.split('?')[1]
  if(searchStr){
    const obj = new URLSearchParams(searchStr)
    obj.forEach((value, key) =>{
      params.push({key, value})
    })
  }
  return params
}

export const erpDomainMap = {
  'dev' : "internal-dev.51hgp.com",
  'test': "internal-test.51hgp.com",
}


export type TabInfo = {
  text: string,
  abbr: string,
  domain: string,
  path: string,
}
export const erpTabInfoMap: Record<string, TabInfo> = {
  dev: {
    text: '开发环境',
    abbr: 'dev',
    domain: "internal-dev.51hgp.com",
    path: "erp_development"
  },
  test: {
    text: '测试环境',
    abbr: 'test',
    domain: "internal-test.51hgp.com",
    path: "ERPWeb2"
  },
}