import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity,SafeAreaView, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from "../Firebase";
import { TrashIcon } from "react-native-heroicons/outline";
const ActivityScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        const favoritesRef = firebase.firestore().collection('favorites');
        favoritesRef.where('userEmail', '==', user.email).onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setFavorites(items);
        });
      } else {
        setUserEmail('');
        setFavorites([]);
      }
    });
  }, []);

  const handleDeleteFavorite = (favoriteId) => {
    Alert.alert(
      "Удалить избранное",
      "Вы уверены, что хотите удалить это упражнение из избранного?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: () => {
            const favoritesRef = firebase.firestore().collection('favorites');
            favoritesRef.doc(favoriteId).delete().then(() => {
              console.log("Document successfully deleted!");
            }).catch((error) => {
              console.error("Error removing document: ", error);
            });
          }
        }
      ],
      { cancelable: false }
    );
  }
  return (
    <View>
      <SafeAreaView className="pt-7 bg-white">
        {/* Custom Header */}
        <Header />
      </SafeAreaView>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {favorites.map((favorite) => (
          <View key={favorite.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <View className="flex-row justify-between">
              <Image className="w-[100px] h-[70px]"  source={{ uri: favorite.itemImage }} />
              <Text className="left-5">{favorite.itemName}</Text>
            </View>
            <TouchableOpacity className="right-5" onPress={() => handleDeleteFavorite(favorite.id)}>
              <TrashIcon size={30} color="#87CEFA" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ActivityScreen;

