import React from 'react'
import { StyleSheet, View, Image, } from 'react-native'
import logo from '../assets/pseudoku.png'


export default function Header () {
  return (
    <View style={styles.container}>
      <Image
      source={logo}
      style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    marginBottom: 50,
    zIndex: 10
  },
  image: {
    width: 130,
    height: 70,
    resizeMode: 'contain'
  }
})