import React, { PureComponent } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList
} from 'react-native'
import Product from '../components/Product'
import Header from '../components/Header'
import Banners from '../components/Banners'
import MainBanner from '../components/MainBanner'
import Brands from '../components/Brands'
import ProductRecomendation from '../components/ProductRecomendation'
import { find } from 'lodash'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  }
})

class TopPick extends PureComponent {

  componentDidMount() {
    this.props.getTopPicks(this.props.pageId)
  }

  fetchproducts = () => {
    const urls = find(this.props.components, ['name', 'product_cards']).data
    this.props.getProducts(urls)
  }

  handleLoadMoreProducts = () => {
    if (this.props.products.canLoadMore) {
      const {limit, offset} = this.props.products
      this.props.showMoreProducts(limit, offset)
    }
  }

  renderHeader = () => {
    if (this.props.components.length > 0 && !this.props.isFetching) {
      const title = find(this.props.components, ['name', 'title_image']).data
      const mainBannerData = find(this.props.components, ['name', 'banner_image']).data
      const bannerData = find(this.props.components, ['name', 'banner_image_quadruple']).data
      const brandsData = find(this.props.components, ['name', 'brand_recommendation']).data
      const productRecommData = find(this.props.components, ['name', 'product_recommendation']).data

      return (
        <View style={styles.container}>
          <Header title={title} />
          <MainBanner data={mainBannerData} />
          <Banners data={bannerData} />
          <Brands data={brandsData} />
          <ProductRecomendation data={productRecommData} />
          <View style={{ paddingVertical: 12, paddingLeft: 10 }}>
            <Text style={styles.text}>Produk Pilihan</Text>
          </View>
        </View>
      )
    }
  }

  renderProduct = ({ item, index }) => (
    <Product product={item} index={index} />
  )

  render() {
    if (this.props.components.length > 0 && !this.props.isFetching) {

      return (
        <FlatList
          ListHeaderComponent={this.renderHeader}
          keyExtractor={p => p.id}
          data={this.props.products.data}
          onEndReachedThreshold={0.2}
          onEndReached={this.handleLoadMoreProducts}
          renderItem={this.renderProduct}
          numColumns={2}
        />
      )
    } else {
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size='large' animating={this.props.isFetching} color='red' />
      </View>
    }
    return null
  }
}

export default TopPick
