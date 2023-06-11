import React from "react";
import { StyleSheet, TextInput } from 'react-native';

function CustomInput(props: TextInput['props']) {
  return (
    <TextInput autoCapitalize="none" style={styles.input} {...props} />
  );
}

export const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    fontWidth: 500,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default CustomInput;
