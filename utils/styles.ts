import { ViewStyle, TextStyle } from 'react-native';

type StyleType = ViewStyle | TextStyle | undefined;

export const classes = (stylesList: StyleType[]) => {
  let styles: ViewStyle | TextStyle  = {};
  stylesList.forEach((styleItem) => {
    if (styleItem) {
      styles = { ...styles, ...styleItem};
    }
  });
  return styles;
}
