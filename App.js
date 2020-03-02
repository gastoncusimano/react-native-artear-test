import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FaQContainer from './app/containers/FaQContainer';
export default function App() {
  return (
    <View style={styles.container}>
      <FaQContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
