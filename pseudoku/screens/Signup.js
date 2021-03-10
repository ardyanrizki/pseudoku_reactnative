import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import { setLevel } from '../store/actions'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup ({navigation}) {
  const dispatch = useDispatch()
  const level = useSelector(state => state.level.level)

  const [userName, setUserName] = useState('')
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign your name</Text>
        <Text style={{fontSize: 18, color: '#fff'}}>and enhance your experience</Text>
      </View>
      <TextInput maxLength={10} style={styles.input} placeholder="Your name" onChangeText={(e) => setUserName(e)} placeholderTextColor="#686868"  />
      <Picker style={styles.input} selectedValue={level} onValueChange={(e)=>{dispatch(setLevel(e))}}>
        <Picker.Item label="Easy" value="Easy" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Hard" value="Hard" />
      </Picker>
      <TouchableOpacity onPress={() => navigation.push("Main", {name: userName})} style={styles.btnPrimary}>
        <Text style={styles.bigText}>Play</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    margin: 8,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 9,
    paddingVertical: 11,
    textAlign: 'left',
    fontSize: 16,
    color: '#fff'
  },
  btnPrimary: {
    width: '100%',
    margin: 8,
    backgroundColor: '#f89800',
    padding: 15,
    alignItems: 'center'
  },
  btnSecondary: {
    width: '100%',
    margin: 8,
    backgroundColor: '#1E1E1E',
    padding: 15,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff'
  },
  bigText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#161616'
  },
  bigTextWhite: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  }
});
