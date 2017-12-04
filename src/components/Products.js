import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Product from '../components/Product'

const styles = StyleSheet.create({
  prodContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,.7)',
    fontWeight: 'bold',
  }
})

class Products extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 12, paddingLeft: 10 }}>
          <Text style={styles.text}>Produk Pilihan</Text>
        </View>
        <View style={styles.prodContainer}>
          {
            this.props.products.map(p => <Product product={p} key={p.id} />)
          }
        </View>
      </View>
    )
  }
}

export default Products
