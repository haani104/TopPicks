import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Rating = ({ rating, count }) => {
  const ratings = []
  for (let index = 0; index < 5; index++) {
    if (index < rating) {
      ratings.push(<View key={index}><Icon name='ios-star' size={14} color="rgb(255,179,0)" /></View>)
    } else {
      ratings.push(<View key={index}><Icon name='ios-star' size={14} color="rgb(222,222,222)" /></View>)
    }
  }

  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
      {ratings}
      <Text style={{color: 'rgba(0,0,0,0.36)', fontSize: 11, paddingLeft: 3, lineHeight: 16}}>{`(${count})`}</Text>
    </View>
  )
}

export default Rating