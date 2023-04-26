import { useContext, useState } from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { FocusedStatusBar } from '../components'
import { assets, COLORS, FONTS } from '../constants'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState(false)

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <FocusedStatusBar background={COLORS.primary}></FocusedStatusBar>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: 10,
          marginVertical: 50
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{
            height: 200,
            width: 200,
            borderRadius: 10
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          margin: 10
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 28,
            marginHorizontal: 12,
            marginBottom: 12,
            color: COLORS.black
          }}
        >
          Login
        </Text>
        <TextInput
          style={{
            height: 40,
            marginHorizontal: 12,
            borderWidth: 0,
            fontSize: 16,
            fontFamily: FONTS.medium,
            marginBottom: 12
          }}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(e) => {
            setEmailAndPassword((prev) => ({
              ...prev,
              email: e
            }))
          }}
        />
        <TextInput
          style={{
            height: 40,
            marginHorizontal: 12,
            borderWidth: 0,
            fontSize: 16,
            fontFamily: FONTS.medium,
            marginBottom: 12
          }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => {
            setEmailAndPassword((prev) => ({
              ...prev,
              password: e
            }))
          }}
        />

        {errors ? (
          <Text
            style={{
              color: COLORS.red,
              fontFamily: FONTS.regular,
              fontSize: 14,
              marginHorizontal: 12,
              marginBottom: 12
            }}
          >
            Please enter email and password
          </Text>
        ) : (
          <></>
        )}

        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.black,
            padding: 14,
            marginHorizontal: 10,
            borderRadius: 5
          }}
          onPress={() => {
            if (
              !emailAndPassword.email.length ||
              !emailAndPassword.password.length
            ) {
              setErrors(true)
            } else {
              login(emailAndPassword)
            }
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.semiBold,
              fontSize: 14
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1
        }}
      >
        <View style={{ height: 300, backgroundColor: COLORS.primary }}></View>
        <View style={{ flex: 1, background: COLORS.white }}></View>
      </View>
    </SafeAreaView>
  )
}

export default Login
