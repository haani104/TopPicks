import React from 'react'
import { ScrollView, View, Image, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  brandImage: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  brandWrapper: {
    marginHorizontal: 5,
    borderRadius: 3,
  },
  prodRecWrapper:{
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    marginTop: 12,
    paddingLeft: 10,
  },
  text: {
    fontSize: 14,
    color: 'rgba(0,0,0,.7)',
    fontWeight: 'bold',
  }
})

const ProductRecomendation = ({ data }) => {
  return (
    <View style={styles.prodRecWrapper}>
    <View style={{paddingVertical: 12}}>
      <Text style={styles.text}>Mungkin Anda Suka</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 12 }}
      >
        {
          data.map((brand, i) => {
            return (
              <View key={i} style={styles.brandWrapper}>
                <Image source={{ uri: brand.image_url_mobile }} style={styles.brandImage} cache="default"/>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default ProductRecomendation