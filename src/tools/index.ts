export const isTop = () => window === top

// 复制指定文本到剪切板
export function copyText(str){
  const ipt = document.createElement('input')
  ipt.value = str
  document.body.appendChild(ipt)
  ipt.select()
  const copyRes = document.execCommand('copy')
  document.body.removeChild(ipt)
  return copyRes
}
