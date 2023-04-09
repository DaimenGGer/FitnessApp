import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { Audio } from "expo-av";

import {
  addWorkout,
  addCal,
  addMunite,
  addCompleWorkout,
} from "../redux/freatures/appSclice";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercises = route?.params.exercise;
  const currentExersice = exercises[index];
  const dispatch = useDispatch();

  // TODO for audio
  const [sound, setSound] = useState();
  // const [sound, setSound] = useState();

  const playSound = async () => {
    let sc = "../assets/audio/break.mp3";
    const { sound } = await Audio.Sound.createAsync(require(sc));
    setSound(sound);
    await sound.playAsync();
  };

  const donePressHandler = () => {
    navigation.navigate("Rest");
    setTimeout(() => {
      setIndex(index + 1);
    }, 3000);
    dispatch(addCal(5.7));
    dispatch(addMunite(2.5));
    dispatch(addWorkout(1));
    dispatch(addCompleWorkout(currentExersice?.name));
    playSound();
  };

  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      {/* <StatusBar style="auto" /> */}
      <Image
        source={{ uri: currentExersice?.image }}
        style={{ width: "100%", height: 370, resizeMode: "cover" }}
      />
      <TouchableOpacity style={{ position: "absolute", top: 10, left: 15 }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ color: "gray" }}
          name="arrow-back-outline"
          size={25}
          color="black"
        />
      </TouchableOpacity>

      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
        }}
      >
        <Text style={{ marginTop: 30, fontSize: 30, fontWeight: "bold" }}>
          {currentExersice?.name}
        </Text>
        <Text style={{ marginTop: 30, fontSize: 40, fontWeight: "bold" }}>
          x{currentExersice?.sets}
        </Text>
      </View>

      {index + 1 >= exercises.length ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "#2888fe",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
            width: 120,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            DONE
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            onPress={donePressHandler}
            style={{
              backgroundColor: "#2888fe",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: 20,
              width: 180,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Выполненно
            </Text>
          </TouchableOpacity>

          {/* prev and skip button */}
        </>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 30,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => setIndex(index - 1)}
          style={{
            paddingHorizontal: 30,
            paddingVertical: 8,
            borderRadius: 150,
          }}
        >
          <AntDesign name="leftcircleo" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            index + 1 >= exercises.length
              ? navigation.navigate("Home")
              : setIndex(index + 1)
          }
            style={{
              paddingHorizontal: 30,
              paddingVertical: 8,
              borderRadius: 150,
            }}
           >
          <AntDesign name="rightcircleo" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
