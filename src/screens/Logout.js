import { SafeAreaView } from 'react-native'
import { FocusedStatusBar } from '../components'
import { COLORS } from '../constants'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Logout = () => {
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    logout()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary}></FocusedStatusBar>
    </SafeAreaView>
  )
}

export default Logout
