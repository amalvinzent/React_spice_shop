import { useIsFocused } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar'

const FocusedStatusBar = (props) => {
  const isFocused = useIsFocused()
  return isFocused ? <StatusBar animated={true} {...props}></StatusBar> : null
}

export default FocusedStatusBar
