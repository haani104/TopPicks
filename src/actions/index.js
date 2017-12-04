import axios from 'axios'
import { find } from 'lodash'
const APP_URL = 'https://ace-staging.tokopedia.com/hoth/discovery/api/page'

export const FETCH_TOP_PICKS = 'FETCH_TOP_PICKS'
export const fetchTopPicks = (pageId) => {
  const url = `${APP_URL}/${pageId}`
  console.log(url)
  return {
    type: FETCH_TOP_PICKS,
    payload: axios.get(url),
  }
}

export const FETCH_TOP_PICKS_PRODUCTS = 'FETCH_TOP_PICKS_PRODUCTS'
export const fetchTopPicksProduct = (urls) => {
  const promiseArray = urls.map(u => axios.get(u.url))
  return {
    type: FETCH_TOP_PICKS_PRODUCTS,
    payload: Promise.all(promiseArray)
      .then(response => {
        let products = []
        response.forEach(r => {
          products.push(...r.data.data.products)
        })
        return products
      })
  }
}
