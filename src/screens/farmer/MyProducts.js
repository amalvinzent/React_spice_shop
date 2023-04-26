import { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { FarmerCard, FocusedStatusBar, HomeHeader } from '../../components'
import { COLORS } from '../../constants'
import axiosInstance from '../../utils/axiosInstance'

const MyProducts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [basePriceChanged, setBasePriceChanged] = useState(false)

  const api = async () => {
    setIsLoading(true)
    const response = await axiosInstance.get('/my_products')
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

  const toast = () => {
    return ToastAndroid.showWithGravity(
      'Base price changed',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )
  }

  useEffect(() => {
    api()
  }, [basePriceChanged])

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
            renderItem={({ item }) => (
              <FarmerCard
                data={item}
                basePriceChanged={basePriceChanged}
                setBasePriceChanged={setBasePriceChanged}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                toast={toast}
              />
            )}
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

export default MyProducts
