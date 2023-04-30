// 将code转成tushare专用
export function codeToSymbolForTushare (code = '') {
  let symbol = ''
  if (code.length === 6) {
    symbol = ['5', '6', '9'].indexOf(code.charAt(0)) >= 0 ? `${code}.SH` : `${code}.SZ`
  } else {
    symbol = code
  }
  return symbol
}
