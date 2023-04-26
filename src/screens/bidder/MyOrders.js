import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View, ActivityIndicator } from 'react-native'
import { BidderCard, FocusedStatusBar, HomeHeader } from '../../components'
import { COLORS } from '../../constants'
import axiosInstance from '../../utils/axiosInstance'

const MyOrders = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const api = async () => {
    setIsLoading(true)
    const response = await axiosInstance.get('/my_orders')
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
              <BidderCard data={item} isLoading={isLoading} />
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

export default MyOrders
