import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { auth } from "../Firebase";

const OnBoardingScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Stack", {
          screen: "Home",
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View
          className="p-5 bg-[#91e3fe] border border-blue-900 rounded-full"
          animation="bounceIn"
          duration={1500}>
          <Image
            source={{uri:"https://img.freepik.com/premium-vector/running-treadmill-isolated_11197-15.jpg?w=1380"}}
            style={styles.logo}
            resizeMode="stretch"
          />
        </Animatable.View>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Держи себя в форме!</Text>
        <Text style={styles.text}>Войдите в систему</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}>
            <LinearGradient
              colors={["#4682B4", "#87CEEB"]}
              style={styles.signIn}>
              <Text style={styles.textSign}>Войти</Text>
              <ChevronRightIcon
                style={{ marginLeft: 5 }}
                size={15}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}>
            <LinearGradient
              colors={["#7B68EE", "#87CEEB"]}
              style={styles.signIn}>
              <Text style={styles.textSign}>Регистрация</Text>
              <ChevronRightIcon
                style={{ marginLeft: 5 }}
                size={15}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default OnBoardingScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEFA",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    borderRadius: 150,
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
