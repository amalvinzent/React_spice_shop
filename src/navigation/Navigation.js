import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CreateOrder from '../screens/bidder/CreateOrder'
import AppStack from './AppStack'

const Navigation = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="Create Order" component={CreateOrder} />
    </Stack.Navigator>
  )
}

export default Navigation
