import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'native-base';

const AddMediaTab = () => {
  return (
    <View style={style.container}>
      <Text>AddMediaTab</Text>
    </View>
  );
};

AddMediaTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
      <Icon name='ios-add-circle' style={{ color: tintColor }} />
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AddMediaTab;
