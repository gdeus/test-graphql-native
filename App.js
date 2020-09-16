import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/homePage';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client'

export default function App() {
  return (

    <ApolloProvider client={client}>
      <HomePage/>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
