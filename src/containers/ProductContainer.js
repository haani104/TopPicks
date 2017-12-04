import { connect } from 'react-redux'
import { fetchTopPicksProduct } from '../actions/index'
import Products from '../components/Products'

const mapStateToProps = (state, ownProps) => ({
  urls: ownProps.urls,
  products: state.products.items,
})

const mapDispatchToProps = dispatch => ({
  getProducts: (urls) => {
    dispatch(fetchTopPicksProduct(urls))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
