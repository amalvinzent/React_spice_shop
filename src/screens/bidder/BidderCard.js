import { Image, View, Text, Dimensions } from 'react-native'
import { COLORS, SHADOWS, SIZES, FONTS } from '../../constants'
import Swiper from 'react-native-swiper'

const BidderCard = ({ data, isLoading }) => {
  const { height } = Dimensions.get('window')
  const ImageComponent = () => {
    return (
      <Swiper showsButtons={false}>
        {data.photos.map((e, i) => {
          return (
            <Image
              key={i}
              style={{
                resizeMode: 'stretch',
                width: '100%',
                height: '100%'
              }}
              source={{ uri: e }}
            />
          )
        })}
      </Swiper>
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
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: 10
        }}
      >
        <View style={{ flex: 1 }}>
          {data?.price_per_kg ? (
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
                price/kg:
              </Text>{' '}
              {data?.price_per_kg}
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
          {data?.total_amount ? (
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
                total amount:
              </Text>{' '}
              {data?.total_amount}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View>
          {data?.bidder_price ? (
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
                bidder price:
              </Text>{' '}
              {data?.bidder_price}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  )
}

export default BidderCard
