import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LogoutIcon } from "react-native-heroicons/outline";
import { auth } from "../Firebase";
import { AntDesign } from '@expo/vector-icons';
const SettingsScreen = ({ navigation }) => {
  const [name, setName] = useState(auth?.currentUser?.displayName);
  const [photoURL, setPhotoURL] = useState(auth?.currentUser?.photoURL);
  const [showNameField, setShowNameField] = useState(false);
  const [showPhotoField, setShowPhotoField] = useState(false);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const handleSave = () => {
    auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL,
    });
    setShowNameField(false);
    setShowPhotoField(false);
  };

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Animatable.View
          className=" p-1 bg-blue-500  rounded-full"
          animation="bounceIn"
          duration={1500}>
          <TouchableOpacity onPress={() => setShowPhotoField(true)}>
            <Image
              source={{ uri: photoURL }}
              style={styles.logo}
              className="rounded-full"
            />
          </TouchableOpacity>
        </Animatable.View>
        {showNameField ? (
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus={true}
            style={styles.titleHeader}
            onBlur={() => setShowNameField(false)}
            onSubmitEditing={handleSave}
            maxLength={16}
          />
        ) : (
          <TouchableOpacity onPress={() => setShowNameField(true)}>
            <Text style={styles.titleHeader} >{name}<Text style={styles.emod}></Text><AntDesign name="edit" size={24} color="black" /></Text>
          </TouchableOpacity>
        )}
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Настройка профиля</Text>
        {showPhotoField && (
          <TextInput
            value={photoURL}
            onChangeText={(text) => setPhotoURL(text)}
            autoFocus={true}
            style={styles.photoInput}
            placeholder="Enter photo URL"
            onBlur={() => setShowPhotoField(false)}
            onSubmitEditing={handleSave}
          />
        )}
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSignOut}>
            <LinearGradient
              colors={["#1E90FF", "#87CEFA"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Выйти</Text>
              <LogoutIcon style={{ marginLeft: 10 }} size={15} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SettingsScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEFA",
    marginBottom: 40,
  },
  emod: {
    fontSize: 20
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
    paddingVertical: 70,
    paddingHorizontal: 40,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  titleHeader: {
    marginTop: 15,
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    zIndex: 1,
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
