import { SearchIcon, BookmarkIcon } from "react-native-heroicons/outline";
import data from "../data/data.json"
import React, { useState, useEffect } from 'react';
import { TextInput, SafeAreaView, View,StyleSheet, Text, Button,ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from "../Firebase";


const firebaseCon = firebaseConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCon);
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [userEmail, setUserEmail] = useState('');
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });
  }, []);

  const handleAddToFavorites = (item) => {
    if (!userEmail) {
      return;
    }

    const favoritesRef = firebase.firestore().collection('favorites');

    const docId = `${userEmail}_${item.id}`;

    favoritesRef
      .doc(docId)
      .set({
        userEmail,
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
      })
      .then(() => {})
      .catch((error) => {});
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView className="mx-4">
        <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
          <View className="mx-4 mb-2">
            <View className="flex-1 flex-row justify-center items-center bg-white rounded-3xl mt-10 shadow">
              <SearchIcon size={20} color="#87CEFA" />
              <TextInput
                style={style.input}
                placeholder="Поиск упражнений "
                onChangeText={handleSearch}
                value={searchQuery}
              />
            </View>
          </View>
          {filteredData.map((item) => (
            <View className="flex-row justify-between mb-3" key={item.id}>
              <View className="flex-row">
                <Image className="w-[100px] h-[70px]" source={{ uri: item.image }} />
                <Text className="left-5">{item.name}</Text>
              </View>
              <BookmarkIcon onPress={() => handleAddToFavorites(item)} size={30} color="#87CEFA"/>
            </View>
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}

//как задать цвет иконке в tailwind

export default SearchScreen;

const style = StyleSheet.create({
  input: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    placeHolderTextColor: "#8860A2",
  },
});
