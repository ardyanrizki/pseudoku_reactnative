import React from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'

export default function Row (props) {
  const editable = useSelector(state => state.grid.editable)
  const solver = useSelector(state => state.grid.solver)
  return (
    <View style={styles.container}>
      {
        props.row.map((col, index) => {
          return editable[props.index][index] ? <TextInput key={index} value={col === 0 ? '' : col.toString()} onChangeText={(e) => props.inputChange(Number(e), index, props.index)} style={styles.item} keyboardType='numeric' maxLength={1}/>:
          <Text key={index} style={styles.itemFilled}>{col}</Text>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  itemFilled: {
    backgroundColor: '#f89800',
    height: 38,
    width: 38,
    margin: 1,
    padding: 7,
    color: '#161616',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20
  },
  item: {
    backgroundColor: '#1E1E1E',
    height: 38,
    width: 38,
    margin: 1,
    padding: 7,
    color: '#ffffff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20
  }
})
