import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

const styles = StyleSheet.create({
  banner: {
    height: 170,
    resizeMode: 'contain',
    marginBottom: 15
  }
})

const Banners = ({ data }) => {
  return (
    <View>
      {
        data.map((b, i) => <Banner banner={b} key={i} />)
      }
    </View>
  )
}

const Banner = ({ banner }) => {
  return (
    <View>
      <Image
        source={{ uri: banner.image_url_mobile }}
        style={styles.banner}
        cache="default" />
    </View>
  )
}

export default Banners
