import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './src/store/store'
import TopPick from './src/containers/TopPicksContainer'

const PAGE_ID = 82

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TopPick pageId={PAGE_ID} />
      </Provider>
    )
  }
}