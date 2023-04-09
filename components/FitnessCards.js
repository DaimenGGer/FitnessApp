import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FitnessData from "../data/fitnessData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

const FitnessCards = ({ clickHandler }) => {
  return (
    <View>
      {FitnessData.map((item) => (
        <TouchableOpacity
          onPress={() => clickHandler(item)}
          key={item.id}
          style={{ marginBottom: 15 }}
        >
          <View style={{ width: "100%", position: "relative" }}>
            <Image
              style={{
                width: "100%",
                borderRadius: 10,
                height: 160,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <View style={{ position: "absolute", top: 60, left: 20 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 23,
                  paddingBottom: 0,
                }}
              >
                {item?.name}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
                  marginBottom: 10,
                }}
              >
                {item?.description}
              </Text>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color="whitesmoke"
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
