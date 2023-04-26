import { useFonts } from 'expo-font'
import { AuthProvider } from './src/context/AuthContext'
import AppNav from './src/navigation/AppNav'

const App = () => {
  const [loaded] = useFonts({
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./src/assets/fonts/Inter-Light.ttf')
  })

  if (!loaded) return null
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}

export default App
