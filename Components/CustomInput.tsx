import React from "react";
import { StyleSheet, TextInput } from 'react-native';

interface Props {}

function CustomInput(props: TextInput['props']) {
  return (
    <TextInput autoCapitalize="none" {...props} style={styles.input} />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    fontWidth: 500,
    padding: 10,
  },
});

export default CustomInput;
