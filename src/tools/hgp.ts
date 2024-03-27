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