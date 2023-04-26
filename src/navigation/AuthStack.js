import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ActivityIndicator, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = () => {
  const Stack = createStackNavigator()
  const { isLoading } = useContext(AuthContext)

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

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack
