import { connect } from 'react-redux'
import { fetchTopPicks, fetchTopPicksProduct, showMoreProducts } from '../actions/index'
import TopPick from '../components/TopPick'

const mapStateToProps = (state, ownProps) => ({
  components: state.topPicks.components,
  isFetching: state.topPicks.isFetching,
  pageId: ownProps.pageId,
  products: state.topPicks.products,
})

const mapDispatchToProps = dispatch => ({
  getTopPicks: (pageId) => {
    dispatch(fetchTopPicks(pageId))
  },
  getProducts: (urls) => {
    dispatch(fetchTopPicksProduct(urls))
  },
  showMoreProducts: (limit, offset) => {
    dispatch(showMoreProducts(limit, offset))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(TopPick)
