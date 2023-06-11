import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { black, yellow } from '../variables';
import { classes } from '../utils/styles';

interface Props {
  disabled?: boolean;
  onPress?: () => void;
  outlined?: boolean,
  style?: ViewStyle,
  text: string;
}

function CustomButton({ disabled = false, onPress, outlined = false, style, text }: Props) {

  const handlePress = () => {
    if (!disabled && onPress) onPress();
  }

  return (
    <Pressable
      onPress={handlePress}
      style={
      classes([style, styles.button, outlined && styles.outlined, disabled && styles.disabled])
      }
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: yellow,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  outlined: {
    borderWidth: 2,
    borderColor: yellow,
    backgroundColor: 'transparent',
  },
  disabled: {
    borderColor: 'lightgrey',
    opacity: 0.5,
  },
  text: {
    color: black,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default CustomButton;
