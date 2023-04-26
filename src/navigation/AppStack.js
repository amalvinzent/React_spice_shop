import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyProducts from '../screens/farmer/MyProducts'
import MyOrders from '../screens/bidder/MyOrders'
import TabBar from '../components/TabBar'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ActivityIndicator, View } from 'react-native'
import Logout from '../screens/Logout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Products from '../screens/bidder/Products'

const AppStack = () => {
  const Tab = createBottomTabNavigator()
  const { isLoading } = useContext(AuthContext)
  const [role, setRole] = useState(null)

  AsyncStorage.getItem('role').then((res) => {
    setRole(res)
  })

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10
        }}
      >
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    )
  }

  if (role == 'farmer') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="My Products" component={MyProducts} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
    )
  }

  if (role == 'bidder') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName="Products"
      >
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="My Orders" component={MyOrders} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
    )
  }
}

export default AppStack
