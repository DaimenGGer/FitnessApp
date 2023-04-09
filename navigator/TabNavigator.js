import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  BookmarkIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import ActivityScreen from "../screens/ActivityScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  // removes the default top header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#fff",
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderBottomWidth: focused ? 3 : 0,
                borderBottomColor: focused ? "#87CEFA" : "",
              }}>
              <HomeIcon
                size={30}
                color="#000"
                style={{
                  color: focused ? "#87CEFA" : "#000",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Find"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderBottomWidth: focused ? 3 : 0,
                borderBottomColor: focused ? "#87CEFA" : "",
              }}>
              <SearchIcon
                size={30}
                color="#000"
                style={{
                  color: focused ? "#87CEFA" : "#000",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderBottomWidth: focused ? 3 : 0,
                borderBottomColor: focused ? "#87CEFA" : "",
              }}>
              <BookmarkIcon
                size={30}
                color="#000"
                style={{
                  color: focused ? "#87CEFA" : "#000",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderBottomWidth: focused ? 3 : 0,
                borderBottomColor: focused ? "#87CEFA" : "",
              }}>
              <UserIcon
                size={30}
                color="#000"
                style={{
                  color: focused ? "#87CEFA" : "#000",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#87CEFA",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
