export * from "./hgp.js"

/**
 * 判断当前页面是否是顶级页面（iframe是次级页面）
 * @returns 
 */
export const isTop = () => window === top

/**
 * 复制指定文本到剪切板
 * @param str 
 * @returns
 */
export function copyText(str: string){
  const ipt = document.createElement('input')
  ipt.value = str
  document.body.appendChild(ipt)
  ipt.select()
  const copyRes = document.execCommand('copy')
  document.body.removeChild(ipt)
  return copyRes
}
