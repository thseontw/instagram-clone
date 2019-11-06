import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";

const ProfileTab = () => {
  const [account, setAccount] = useState({
    name: "",
    reputation: "",
    postCount: "",
    profile: ""
  });
  const [followCount, setFollowCount] = useState({
    followingCount: "",
    followerCount: ""
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchAccount = username => {
    const data = {
      id: 3,
      jsonrpc: "2.0",
      method: "call",
      params: ["database_api", "get_accounts", [[username]]]
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result[0]);
  };

  const { width, height } = Dimensions.get("window");

  const images = [
    "https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg",
    "https://cdn.pixabay.com/photo/2019/01/05/17/05/man-3915438__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/25/21/45/crystal-ball-photography-3894871__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/05/16/57/buzzard-2287699__480.jpg",
    "https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/15/02/53/flower-3876195__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/16/18/12/open-fire-3879031__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345__480.jpg"
  ];

  const fetchFollowCount = username => {
    const data = {
      id: 4,
      jsonrpc: "2.0",
      method: "call",
      params: ["follow_api", "get_follow_count", [username]]
    };
    return fetch("https://api.steemit.com", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => res.result);
  };

  const segmentClicked = useCallback(activeIndex => {
    setActiveIndex(activeIndex);
  }, []);

  const renderSectionOne = useCallback(() => {
    return images.map((image, index) => (
      <View key={index} style={{ width: width / 3, height: width / 3 }}>
        <Image source={{ url: image }} style={{ flex: 1 }} />
      </View>
    ));
  }, []);

  const renderSection = useCallback(() => {
    if (activeIndex === 0) {
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {renderSectionOne()}
        </View>
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    const username = "anpigon"; // 내 계정명

    fetchAccount(username).then(
      ({ name, post_count, reputation, json_metadata }) => {
        console.log("###reputation: ", reputation);
        const { profile } = JSON.parse(json_metadata); // JSON 파싱
        const log =
          Math.log(parseInt(reputation.substring(0, 4))) / Math.log(10);
        setAccount({
          name: name, // 이름
          reputation:
            Math.max(reputation.length - 1 + log - parseInt(log) - 9, 0) * 9 +
            25, // 명성도 계산
          postCount: post_count, // 포스팅 수
          profile: profile // 프로필 정보
        });
      }
    );

    fetchFollowCount(username).then(({ following_count, follower_count }) => {
      setFollowCount({
        followingCount: following_count, // 팔로잉 수
        followerCount: follower_count // 팔로워 수
      });
    });
  }, []);

  return (
    <Container style={{ flex: 1, backgroundColor: "white" }}>
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          <Icon name="md-person-add" style={{ paddingLeft: 10 }} />
        </Left>
        <Body>
          <Text>{account.name}</Text>
        </Body>
        <Right>
          <EntypoIcon
            name="back-in-time"
            style={{ paddingRight: 10, fontSize: 32 }}
          />
        </Right>
      </Header>
      <Content>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={{ url: account.profile.profile_image }}
              style={{ width: 75, height: 75, borderRadius: 37.5 }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text>{account.postCount}</Text>
                <Text style={{ fontSize: 10, color: "gray" }}>posts</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>{followCount.followingCount}</Text>
                <Text style={{ fontSize: 10, color: "gray" }}>follower</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>{followCount.followerCount}</Text>
                <Text style={{ fontSize: 10, color: "gray" }}>following</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                bordered
                dark
                style={{
                  flex: 4,
                  marginLeft: 10,
                  justifyContent: "center",
                  height: 30,
                  marginTop: 10
                }}
              >
                <Text>Edit Profile</Text>
              </Button>
              <Button
                bordered
                dark
                small
                icon
                style={{
                  flex: 1,
                  marginRight: 10,
                  marginLeft: 5,
                  justifyContent: "center",
                  height: 30,
                  marginTop: 10
                }}
              >
                <Icon name="settings" />
              </Button>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            {account.profile.name} ({parseInt(account.reputation).toFixed(2)})
          </Text>
          <Text>{account.profile.about}</Text>
          <Text>{account.profile.website}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopWidth: 1,
            borderTopColor: "#eae5e5"
          }}
        >
          <Button
            transparent
            onPress={() => segmentClicked(0)}
            active={activeIndex === 0}
          >
            <Icon
              name="ios-apps"
              style={[activeIndex === 0 ? {} : { color: "grey" }]}
            />
          </Button>
          <Button
            transparent
            onPress={() => segmentClicked(1)}
            active={activeIndex === 1}
          >
            <Icon
              name="ios-list"
              style={[activeIndex === 1 ? {} : { color: "grey" }]}
            />
          </Button>
          <Button
            transparent
            onPress={() => segmentClicked(2)}
            active={activeIndex === 2}
          >
            <Icon
              name="ios-people"
              style={[activeIndex === 2 ? {} : { color: "grey" }]}
            />
          </Button>
          <Button
            transparent
            onPress={() => segmentClicked(3)}
            active={activeIndex === 3}
          >
            <Icon
              name="ios-bookmark"
              style={[activeIndex === 3 ? {} : { color: "grey" }]}
            />
          </Button>
        </View>

        {renderSection()}
      </Content>
    </Container>
  );
};

ProfileTab.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" style={{ color: tintColor }} />
  )
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfileTab;
