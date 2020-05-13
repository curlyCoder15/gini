import React from 'react';
import {Text, StyleSheet} from 'react-native';

const BoldText = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default BoldText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 15,
  },
});
