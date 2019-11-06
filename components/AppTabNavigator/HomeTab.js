import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import CardComponent from "../CardComponent";

const HomeTab = () => {
  const [feeds, setFeeds] = useState([]);
  const [followings, setFollowings] = useState([]);

  const fetchFeeds = () => {
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        "get_discussions_by_created",
        [{ tag: "kr", limit: 20 }]
      ]
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result);
  };

  const fetchFollowing = () => {
    const data = {
      id: 2,
      jsonrpc: "2.0",
      method: "call",
      params: ["follow_api", "get_following", ["anpigon", "", "blog", 10]]
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result.map(({ following }) => following));
  };

  useEffect(() => {
    fetchFeeds().then(feeds => {
      console.log(feeds);
      setFeeds(feeds);
    });
  }, []);
  useEffect(() => {
    fetchFollowing().then(followings => {
      console.log(followings);
      setFollowings(followings);
    });
  }, []);

  return (
    <Container>
      <Header style={{ backgroundColor: "#fff" }}>
        <Left>
          <Icon name="ios-camera" style={{ paddingLeft: 10 }} />
        </Left>
        <Body>
          <Text>Instagram</Text>
        </Body>
        <Right>
          <Icon name="ios-send" style={{ paddingRight: 10 }} />
        </Right>
      </Header>
      <Content>
        <View style={{ height: 100 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 7
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Stories</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="md-play" style={{ fontSize: 14 }}></Icon>
              <Text style={{ fontWeight: "bold" }}> Watch All</Text>
            </View>
          </View>

          <View style={{ flex: 3 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                paddingStart: 5,
                paddingEnd: 5
              }}
            >
              {followings.length > 0 &&
                followings.map(following => (
                  <Thumbnail
                    key={following}
                    style={{
                      marginHorizontal: 5,
                      borderColor: "pink",
                      borderWidth: 2
                    }}
                    source={{
                      uri: `https://steemitimages.com/u/${following}/avatar`
                    }}
                  />
                ))}
            </ScrollView>
          </View>
        </View>

        {feeds.length > 0 &&
          feeds.map(feed => <CardComponent key={feed.post_id} data={feed} />)}
      </Content>
    </Container>
  );
};

HomeTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-home" style={{ color: tintColor }} />
  )
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeTab;
