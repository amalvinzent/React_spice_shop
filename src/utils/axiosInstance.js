import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from './RootNavigation'
require('dotenv').config()

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response)
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }

    if (error.response.status === 401) {
      navigate('Login', { tokenExpired: true })
    } else {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  }
)

export default axiosInstance
