import axios from 'axios'
import { find } from 'lodash'
const APP_URL = 'https://ace.tokopedia.com/hoth/discovery/api/page'

export const FETCH_TOP_PICKS = 'FETCH_TOP_PICKS'
export const fetchTopPicks = (pageId) => {
  const url = `${APP_URL}/${pageId}`
  return {
    type: FETCH_TOP_PICKS,
    payload: axios.get(url)
      .then(data => {
        const components = data.data.data.components
        const productUrls = find(components, ['name', 'product_cards']).data
        const promiseArray = productUrls.map(u => axios.get(u.url))
        return Promise.all(promiseArray)
          .then(response => {
            let products = []
            response.forEach(r => {
              products.push(...r.data.data.products)
            })
            return [...components, {
              data: products,
              name: 'product_data',
            }]
          })
      })
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

export const SHOW_MORE_PRODUCTS = 'SHOW_MORE_PRODUCTS'
export const showMoreProducts = (limit, offset) => {
  return {
    type: SHOW_MORE_PRODUCTS,
  }
}
