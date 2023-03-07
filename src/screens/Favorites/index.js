import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import CharacterCard from '../Episode/components/CharacterCard';
import Styles from '../../styles';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
  },
});

const FavoritesScreen = ({route}) => {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  useEffect(() => {
    const initScreen = async () => {
      const value = await AsyncStorage.getItem('favorites');
      value ? setCharacters(JSON.parse(value)) : null;
    };
    initScreen();
  }, []);

  useEffect(() => {
    if (searchText.length > 2 && characters.length > 0) {
      setSearchedList(
        characters.filter(
          e =>
            e.name.toLowerCase().includes(searchText.toLowerCase()) ||
            e.status.toLowerCase().includes(searchText.toLowerCase()) ||
            e.species.toLowerCase().includes(searchText.toLowerCase()) ||
            e.type.toLowerCase().includes(searchText.toLowerCase()) ||
            e.gender.toLowerCase().includes(searchText.toLowerCase()) ||
            e.origin.name.toLowerCase().includes(searchText.toLowerCase()) ||
            e.location.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (searchText.length == 0) {
      setSearchedList([]);
    }
  }, [searchText]);

  return (
    <ImageBackground
      source={require('../../assets/rickandmorty.jpg')}
      style={Styles.container}
      blurRadius={5}>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        showBack={true}
      />
      <Text style={styles.header}>FAVORITES</Text>
      {searchText.length > 0 ? (
        <>
          <FlatList
            data={searchedList}
            renderItem={({item, index}) => {
              return (
                <CharacterCard isFav={index % 2} item={item} key={index} />
              );
            }}
            keyExtractor={(item, key) => key}
          />
        </>
      ) : (
        <>
          <FlatList
            data={characters}
            renderItem={({item, index}) => {
              return <CharacterCard item={item} key={index} />;
            }}
            keyExtractor={(item, key) => key}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  You haven't added any favorites yet.
                </Text>
              );
            }}
          />
        </>
      )}
    </ImageBackground>
  );
};

export default FavoritesScreen;
