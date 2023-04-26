import { Image, View } from 'react-native'
import { assets, COLORS } from '../constants'

const HomeHeader = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        marginTop: 15
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{
            width: 100,
            height: 80
          }}
        />
      </View>
    </View>
  )
}

export default HomeHeader
