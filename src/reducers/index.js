import { combineReducers } from 'redux'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { FETCH_TOP_PICKS, FETCH_TOP_PICKS_PRODUCTS } from '../actions/index'

const topPicks = (
  state = {
    components: [],
    isFetching: false,
    title: '',
    error: false,
    products: []
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
      return {
        ...state,
        components: action.payload.data.data.components,
        isFetching: false,
      }
    case `${FETCH_TOP_PICKS}_${REJECTED}`:
      return {
        ...state,
        isFetching: false,
        error: true
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