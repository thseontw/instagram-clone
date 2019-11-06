import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'native-base';

const LikesTab = () => {
  return (
    <View style={style.container}>
      <Text>LikesTab</Text>
    </View>
  );
};

LikesTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
      <Icon name='ios-heart' style={{ color: tintColor }} />
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LikesTab;
