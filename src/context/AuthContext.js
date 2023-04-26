import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
require('dotenv').config()

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)

  const loginSuccess = () => {
    return ToastAndroid.showWithGravity(
      'Login successful',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  const logoutSuccess = () => {
    return ToastAndroid.showWithGravity(
      'Logout successful',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  const invalidCredentials = () => {
    return ToastAndroid.showWithGravity(
      'Invalid credentials',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  const login = async (emailAndPassword) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.BASE_URL}/authenticate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailAndPassword)
      })
      const json = await response.json()
      if (json.status == 200) {
        const { auth_token, role } = json
        await AsyncStorage.setItem('userToken', auth_token)
        await AsyncStorage.setItem('role', role)
        setUserToken(auth_token)
        loginSuccess()
      } else {
        invalidCredentials()
      }
    } catch (e) {
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.removeItem('role')
    setUserToken(null)
    setIsLoading(false)
    logoutSuccess()
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken')
      setUserToken(token)
      setIsLoading(false)
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      value={{ login, logout, userToken, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
