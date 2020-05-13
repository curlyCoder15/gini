import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

const SafeArea = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  innerContainer: {flex: 1, marginVertical: 10},
});
