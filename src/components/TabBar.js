import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FONTS, COLORS, SHADOWS } from '../constants'
import Icon from 'react-native-vector-icons/AntDesign'

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.white,
        borderRadius: 0,
        marginHorizontal: 0,
        ...SHADOWS.dark
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name
        const isFocused = state.index === index
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <View
            key={index}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20
            }}
          >
            <TouchableOpacity onPress={onPress}>
              <View style={{ padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                  <Icon
                    name={
                      label == 'My Products'
                        ? 'appstore1'
                        : label == 'Logout'
                        ? 'logout'
                        : label == 'My Orders'
                        ? 'appstore1'
                        : label == 'Products'
                        ? 'appstore1'
                        : null
                    }
                    color={isFocused ? COLORS.black : COLORS.light_grey}
                    size={18}
                  />
                </View>
                <Text
                  style={{
                    color: isFocused ? COLORS.black : COLORS.light_grey,
                    fontFamily: FONTS.regular,
                    fontSize: 14
                  }}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

export default TabBar
