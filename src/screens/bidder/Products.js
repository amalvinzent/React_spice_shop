import { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import { FocusedStatusBar, HomeHeader } from '../../components'
import { COLORS, SHADOWS, SIZES, FONTS } from '../../constants'
import axiosInstance from '../../utils/axiosInstance'
import Swiper from 'react-native-swiper'
import { Linking } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const Products = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const { height } = Dimensions.get('window')

  const api = async () => {
    setIsLoading(true)
    const response = await axiosInstance.get('/product_list')
    let result
    for (let i = 0; i < response?.data?.data?.length; i++) {
      const photos = await axiosInstance.get(
        `/spice_photos/${response?.data?.data[i]?.id}`
      )
      response.data.data[i].photos = photos?.data?.photos
      result = response?.data?.data
    }
    setData(() => result)
    setIsLoading(false)
  }

  useEffect(() => {
    api()
  }, [])

  const ImageComponent = () => {
    return (
      <Swiper showsButtons={false}>
        {data.flatMap((d) =>
          d.photos.flatMap((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  resizeMode: 'stretch',
                  width: '100%',
                  height: '100%'
                }}
                source={{ uri: p }}
              />
            )
          })
        )}
      </Swiper>
    )
  }

  const ProductsCard = ({ data }) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.secondary,
          borderRadius: SIZES.font,
          marginBottom: SIZES.extraLarge,
          margin: SIZES.base,
          ...SHADOWS.dark
        }}
      >
        <View
          style={{
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
            padding: 10,
            width: '100%',
            height: height * 0.3
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <ImageComponent />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 10
          }}
        >
          <View style={{ flex: 1 }}>
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
                {data?.quantity} KG
              </Text>
            ) : (
              <></>
            )}
          </View>

          <View>
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
                  sold qty:
                </Text>{' '}
                {data?.sold_quantity} KG
              </Text>
            ) : (
              <></>
            )}

            {data?.litter_weight ? (
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
                  litter weight:
                </Text>{' '}
                {data?.litter_weight} KG
              </Text>
            ) : (
              <></>
            )}

            {data?.video_link ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(data?.video_link)
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ flex: 0.5 }}>watch:</Text>
                <Icon
                  style={{ flex: 1 }}
                  name="youtube"
                  color={COLORS.red}
                  size={24}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}

            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.black,
                  padding: 8,
                  borderRadius: 5,
                  width: 100,
                  height: 40
                }}
                onPress={() => {
                  navigation.navigate('Create Order', {
                    data
                  })
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.regular,
                    fontSize: 14
                  }}
                >
                  order now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
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
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary}></FocusedStatusBar>
      <View>
        <View style={{ margin: 5, marginBottom: 100 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ProductsCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
          />
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
    </SafeAreaView>
  )
}

export default Products
