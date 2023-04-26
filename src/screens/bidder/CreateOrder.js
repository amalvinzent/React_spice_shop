import { useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { FocusedStatusBar } from '../../components'
import { assets, COLORS, FONTS, SIZES, SHADOWS } from '../../constants'
import axiosInstance from '../../utils/axiosInstance'

const CreateOrder = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState({
    order: {
      bidder_price: 0,
      quantity: 0
    }
  })
  const [errors, setErrors] = useState(false)
  const data = route?.params?.data

  const toast = () => {
    return ToastAndroid.showWithGravity(
      'Order placed',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  const errorToast = () => {
    return ToastAndroid.showWithGravity(
      'Order creation failed',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  const handleClick = async () => {
    setIsLoading(() => true)
    await axiosInstance
      .post(`/buy_spice/${data?.id}`, orderData)
      .then((res) => {
        if (res.status == 200) {
          toast()
          navigation.navigate('My Orders')
        } else {
          errorToast()
          navigation.navigate('Products')
        }
      })
  }

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
    <View style={{ flex: 1 }}>
      <FocusedStatusBar />
      <View
        style={{
          marginTop: 50,
          marginHorizontal: 20,
          borderRadius: 5
        }}
      >
        {data?.photos[0] ? (
          <Image
            source={{
              uri: data?.photos[0]
            }}
            style={{
              resizeMode: 'stretch',
              width: '100%',
              height: 300,
              borderRadius: SIZES.font
            }}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/noImage.jpg')}
              style={{
                resizeMode: 'stretch',
                width: '100%',
                height: 300
              }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          margin: 20
        }}
      >
        {data?.name ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              name:
            </Text>{' '}
            {data?.name}
          </Text>
        ) : (
          <></>
        )}

        {data?.base_price ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              base price:
            </Text>{' '}
            {data?.base_price}
          </Text>
        ) : (
          <></>
        )}

        {data?.category ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              category:
            </Text>{' '}
            {data?.category}
          </Text>
        ) : (
          <></>
        )}

        {data?.grade ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              grade:
            </Text>{' '}
            {data?.grade}
          </Text>
        ) : (
          <></>
        )}

        {data?.quantity ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              quantity:
            </Text>{' '}
            {data?.quantity}
          </Text>
        ) : (
          <></>
        )}

        {data?.sold_quantity ? (
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.medium,
              color: COLORS.black
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
                color: COLORS.black
              }}
            >
              sold quantity:
            </Text>{' '}
            {data?.sold_quantity}
          </Text>
        ) : (
          <></>
        )}

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ marginRight: 20 }}>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.medium,
                color: COLORS.black
              }}
            >
              price:
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 80,
                borderWidth: 0.5,
                borderColor: COLORS.black,
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                marginBottom: 10
              }}
              keyboardType="numeric"
              onChangeText={(e) =>
                setOrderData((prev) => ({
                  order: { ...prev.order, bidder_price: e }
                }))
              }
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.medium,
                color: COLORS.black
              }}
            >
              quantity:
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 80,
                borderWidth: 0.5,
                borderColor: COLORS.black,
                borderRadius: 5,
                padding: 10,
                fontSize: 16,
                marginBottom: 10
              }}
              keyboardType="numeric"
              onChangeText={(e) =>
                setOrderData((prev) => ({
                  order: { ...prev.order, quantity: e }
                }))
              }
            />
          </View>
        </View>
        {errors ? (
          <View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.red,
                fontSize: 12,
                marginTop: 5
              }}
            >
              Please enter a price/quantity
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.black,
            borderRadius: 5,
            marginHorizontal: 20,
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 50
          }}
          onPress={() => {
            if (
              orderData.order.bidder_price == 0 ||
              orderData.order.quantity == 0
            ) {
              setErrors(true)
            } else {
              handleClick()
            }
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.white,
              fontSize: SIZES.medium
            }}
          >
            order
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
    </View>
  )
}

export default CreateOrder
