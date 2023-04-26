import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions
} from 'react-native'
import { COLORS, SHADOWS, SIZES, FONTS } from '../../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import Swiper from 'react-native-swiper'

const FarmerCard = ({
  data,
  basePriceChanged,
  setBasePriceChanged,
  setIsLoading,
  isLoading,
  toast
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [id, setId] = useState(null)
  const [basePrice, setBasePrice] = useState(0)
  const [errors, setErrors] = useState(false)
  const { height } = Dimensions.get('window')

  const handleClick = async () => {
    setIsLoading(() => true)
    await axiosInstance
      .post(`/update_base_price/${id}`, { spice: { base_price: basePrice } })
      .then(() => {
        setModalVisible(!modalVisible)
        setBasePriceChanged(() => !basePriceChanged)
        toast()
      })
  }

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
          padding: SIZES.font,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
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
              {data?.quantity}
            </Text>
          ) : (
            <></>
          )}
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
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
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true)
                setId(() => data.id)
                setErrors(false)
              }}
              style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 5
              }}
            >
              <Icon name="edit" color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>
          <View>
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
                {data?.litter_weight}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <Modal animationType="none" transparent={false} visible={modalVisible}>
        <View
          style={{
            position: 'absolute',
            top: 250,
            left: 65
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5
            }}
          >
            <View>
              <TextInput
                style={{
                  height: 50,
                  width: 200,
                  borderWidth: 0.5,
                  borderColor: COLORS.black,
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16
                }}
                keyboardType="numeric"
                placeholder="change base price"
                onChangeText={(e) => setBasePrice(e)}
              />
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
                    Please enter a base price
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    marginRight: 10,
                    paddingHorizontal: 32,
                    paddingVertical: 10,
                    backgroundColor: COLORS.black,
                    borderRadius: 5
                  }}
                  onPress={() => {
                    if (basePrice == 0) {
                      setErrors(true)
                    } else {
                      handleClick()
                    }
                  }}
                >
                  <Text
                    style={{ fontFamily: FONTS.regular, color: COLORS.white }}
                  >
                    save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: COLORS.black
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text
                    style={{ fontFamily: FONTS.regular, color: COLORS.black }}
                  >
                    cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default FarmerCard
