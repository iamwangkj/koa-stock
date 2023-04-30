import axios from 'axios'
import _ from 'lodash'
import { TUSHARE_TOKEN, TUSHARE_BASEURL } from './common/config'
import { codeToSymbolForTushare } from './common/utils'

// 根据code获取公司基本信息
export async function getCompanyInfo (code = '') {
  const postData = {
    api_name: 'stock_company',
    token: TUSHARE_TOKEN,
    params: {
      ts_code: codeToSymbolForTushare(code)
    },
    fields: 'chairman, manager, secretary, reg_capital, setup_date, province, city, introduction, website, office, employees, main_business, business_scope'
  }
  const res = await axios.post(TUSHARE_BASEURL, postData)
  const realRes = _.get(res, 'data.data.items.0')
  const len = _.size(realRes)
  let ret: any = null
  if (len > 0) {
    ret = {
      code,
      chairman: realRes[0],
      manager: realRes[1],
      secretary: realRes[2],
      reg_capital: realRes[3], // 注册资本
      setup_date: realRes[4],
      province: realRes[5],
      city: realRes[6],
      introduction: realRes[7],
      website: realRes[8],
      office: realRes[9],
      employees: realRes[11],
      main_business: realRes[10],
      business_scope: realRes[12]
    }
  }
  return ret
}
