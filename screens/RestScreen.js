import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

// import CircularProgress from "react-native-circular-progress-indicator";

const RestScreen = () => {
  const navigation = useNavigation();

  const [time, setTime] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 6000);
  }, []);

  const timerFn = () => {
    setInterval(() => {
      setTime(time + 1);
    }, 1000);
  };
  timerFn();

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      <Image
        source={{
          uri: "https://media.tenor.com/UxpVrV1EPUEAAAAi/mochi-cat.gif",
        }}
        style={{
          width: "100%",
          height: 450,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Начало через
        5 сек.
      </Text>
      <Text
        style={{
          fontSize: 60,
          fontWeight: "900",
          marginTop: 50,
          textAlign: "center",
          color: "#1E90FF"
        }}
      >
        {time}
      </Text>
    </SafeAreaView>
  );
};

export default RestScreen;

const styles = StyleSheet.create({});
