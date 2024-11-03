import { View, Image } from 'react-native';
import { styles } from './styles';
import logo from '../../assets/logo.png';

export default function Header({ height = 175 }) {
  return (
    <View style={[styles.containerHead, { height }]}>
      <Image source={logo} />
    </View>
  );
}
