import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  accent: '#66a5ad',
  purple: '#003b46',

  black: '#171717',
  white: '#c4dfe6',
  background: '#07575b',
};

export const SIZES = {
  base: 10,
  width,
  height,
};
