import React from 'react';
import {Text, StyleSheet} from 'react-native';

const SmallText = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default SmallText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
  },
});
