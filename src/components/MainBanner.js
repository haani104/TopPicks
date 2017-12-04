import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

const styles = StyleSheet.create({
  mainBanner: {
    height: 240,
    resizeMode: 'contain',
  }
})

const MainBanner = ({ data }) => {
  return (
    <View style={{marginBottom: 15}}>
      {
        data.map((mb, i) => <Image source={{ uri: mb.image_url_mobile }} key={i} style={styles.mainBanner} cache="default"/>)
      }
    </View>
  )
}

export default MainBanner