import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LockClosedIcon, MailIcon } from "react-native-heroicons/outline";
import { auth } from "../Firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const logIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) =>
        Alert.alert("Неверные учетные данные", "Адрес электронной почты или пароль неверны"),
      );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Хэй!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Эл. почта</Text>
        <View style={styles.action}>
          <MailIcon size={20} color={"#7B68EE"} />
          <TextInput
            placeholder="Введите почту"
            keyboardType="email-address"
            style={styles.textInput}
            autoCapitalize="none"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.text_footer}>Пароль</Text>
        <View style={styles.action}>
          <LockClosedIcon size={20} color={"#7B68EE"} />
          <TextInput
            placeholder="Введите пароль"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={true}
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={logIn}>
            <LinearGradient
              style={styles.signIn}
              colors={["#7B68EE", "#87CEEB"]}>
              <Text style={[styles.textSign, { color: "#fff" }]}>Войти</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.signIn,
              { borderColor: "#8860A2", borderWidth: 1, marginTop: 20 },
            ]}
            onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.textSign, { color: "#7B68EE" }]}>
              Регистрация аккаунта
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEFA",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 34,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
