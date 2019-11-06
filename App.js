import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './components/MainScreen';

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  }
);

export default createAppContainer(AppStackNavigator);