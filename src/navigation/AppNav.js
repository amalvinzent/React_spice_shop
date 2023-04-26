import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ActivityIndicator, View } from 'react-native'
import AuthStack from './AuthStack'
import { navigationRef } from '../utils/RootNavigation'
import { COLORS } from '../constants'
import Navigation from './Navigation'

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext)

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
    <NavigationContainer ref={navigationRef}>
      {userToken !== null ? <Navigation /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
