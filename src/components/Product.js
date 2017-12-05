import React from 'react'
import { View, Image, StyleSheet, Text, Platform, Dimensions } from 'react-native'
import unescape from 'lodash/unescape'
import TKPTouchable from '../common/TKPTouchable'
import Icon from 'react-native-vector-icons/Ionicons'
import Rating from './Rating'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  productCell: {
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#FFF',
    width: width > 414 ? '25%' : '50%',
    borderTopWidth: 1,
  },
  productImageWrapper: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  productImage: {
    height: 185,
    borderRadius: 3,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0,0,0,.7)',
    height: 40,
    paddingHorizontal: 10,
  },
  priceContainer: {
    height: 20,
  },
  productGridNormalPrice: {
    paddingHorizontal: 10,
  },
  productGridNormalPriceText: {
    fontSize: 10,
    fontWeight: '600',
    textDecorationLine: 'line-through',
  },
  priceWrapper: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  price: {
    color: '#ff5722',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 15,
    paddingHorizontal: 10,
  },
  productGridCampaignRate: {
    backgroundColor: '#f02222',
    padding: 3,
    borderRadius: 3,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productGridCampaignRateText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  productBadgeWrapper: {
    height: 27,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCashback: {
    borderRadius: 3,
    marginRight: 3,
    padding: 3,
    backgroundColor: '#42b549',
  },
  cashbackText: {
    color: '#fff',
    fontSize: 10,
  },
  labelText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.54)'
  },
  shopSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
  },
  shopImage: {
    width: 28,
    height: 28,
    ...Platform.select({
      ios: {
        resizeMode: 'contain',
      },
      android: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#E0E0E0',
        overlayColor: '#FFF',
      },
    }),
  },
  shopImageWrapper: {
    width: 30,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  shopNameWrapper: {
    flex: 3 / 4,
    marginTop: 7,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 0,
  },
  badgeImageContainer: {
    width: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeImage: {
    height: 20,
    width: 20,
  },
  productLabel: {
    padding: 3,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginRight: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  shopName: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.54)',
    paddingHorizontal: 10,
  },
  shopCityName: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.38)',
    marginLeft: 4,
  },
  location: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})

const Product = ({ product }) => {
  return (
    <View style={styles.productCell}>
      <TKPTouchable>
        <View>
          <View style={styles.productImageWrapper}>
            <Image
              source={{ uri: product.image_url }}
              style={styles.productImage}
              cache="default"
            />
          </View>
          <Text style={styles.productName} ellipsizeMode="tail" numberOfLines={2}>
            {unescape(product.name)}
          </Text>
        </View>
      </TKPTouchable>
      <View style={styles.priceContainer}>
        <View style={styles.productGridNormalPrice}>
          {product.discount_percentage !== 0 && (
            <View style={{ height: 15 }}>
              <Text style={styles.productGridNormalPriceText}>
                {product.original_price}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{product.price}</Text>
          {product.discount_percentage !== 0 && (
            <View style={styles.productGridCampaignRate}>
              <Text style={styles.productGridCampaignRateText}>
                {`${product.discount_percentage}% OFF`}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Rating rating={product.rating} count={product.count_review} />
      <View style={styles.productBadgeWrapper}>
        {product.labels.map((l, i) => {
          let labelTitle = l.title
          if (l.title.indexOf('Cashback') > -1) {
            labelTitle = 'Cashback'
          }
          switch (labelTitle) {
            case 'PO':
            case 'Grosir':
              return (
                <View style={styles.productLabel} key={i}>
                  <Text style={styles.labelText}>{l.title}</Text>
                </View>
              )
            case 'Cashback':
              return (
                <View style={styles.productCashback} key={i}>
                  <Text style={styles.cashbackText}>{l.title}</Text>
                </View>
              )
            default:
              return null
          }
        })}
      </View>
      <View>
        <Text style={styles.shopName} ellipsizeMode="tail" numberOfLines={1}>{product.shop.name}</Text>
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 5,flexDirection: 'row' }}>
        <View style={styles.location}>
          <Icon name='ios-pin-outline' size={15} color="rgb(189,189,189)" />
          <Text style={styles.shopCityName}>{product.shop.city}</Text>
        </View>
        <View style={{}}>
          {product.badges.map(
            b =>
              b.title === 'Free Return' ? (
                <View key={product.id} style={styles.badgeImageContainer}>
                  <Image
                    source={{ uri: b.image_url }}
                    style={styles.badgeImage}
                  />
                </View>
              ) : null,
          )}
        </View>
      </View>
    </View>
  )
}

export default Product
