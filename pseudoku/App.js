import React from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main'
import Signup from './screens/Signup'
import Leaderboard from './screens/Leaderboard'


export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
