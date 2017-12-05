import { combineReducers } from 'redux'
import { find } from 'lodash'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import {
  FETCH_TOP_PICKS,
  FETCH_TOP_PICKS_PRODUCTS,
  SHOW_MORE_PRODUCTS,
} from '../actions/index'

const topPicks = (
  state = {
    components: [],
    isFetching: false,
    title: '',
    error: false,
    products: {
      limit: 10,
      offset: 0,
      data: [],
      total: 0,
      canLoadMore: false,
    }
  },
  action
) => {
  switch (action.type) {
    case `${FETCH_TOP_PICKS}_${PENDING}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${FETCH_TOP_PICKS}_${FULFILLED}`:
      const productsData = find(action.payload, ['name', 'product_data']).data
      const initialProdToRender = productsData.slice(state.products.offset, state.products.limit)
      console.log('initialProdToRender', initialProdToRender)
      const offset = initialProdToRender.length
      console.log('offset', offset)
      return {
        ...state,
        components: action.payload,
        isFetching: false,
        products: {
          ...state.products,
          data: initialProdToRender,
          offset,
          total: productsData.length,
          canLoadMore: true,
        }
      }
    case `${FETCH_TOP_PICKS}_${REJECTED}`:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case SHOW_MORE_PRODUCTS:
      const products = find(state.components, ['name', 'product_data']).data
      const newData = [...state.products.data, ...products.slice(state.products.data.length, state.products.data.length + state.products.limit)]
      console.log('newData', newData)
      const newOffset = newData.length
      console.log('newOffset', newOffset)
      console.log('canload', newData.length !== products.length)
      return {
        ...state,
        products: {
          ...state.products,
          data: newData,
          offset: newOffset,
          canLoadMore: newData.length !== state.products.total
        }
      }
    default:
      return state
  }
}

const products = (state = {
  items: [],
  isFetching: false,
}, action) => {
  switch (action.type) {
    case `${FETCH_TOP_PICKS_PRODUCTS}_${PENDING}`:
      return {
        ...state,
        isFetching: true
      }
    case `${FETCH_TOP_PICKS_PRODUCTS}_${FULFILLED}`:
      return {
        items: action.payload,
        isFetching: false,
      }
    case `${FETCH_TOP_PICKS_PRODUCTS}_${REJECTED}`:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const appReducer = combineReducers({
  topPicks,
  products,
})

const rootReducer = (state, action) => {
  if (action.type === 'RELOADSTATE') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer