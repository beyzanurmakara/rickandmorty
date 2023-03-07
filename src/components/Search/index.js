import {useNavigation} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {checkFavorites} from '../../redux/favoriteSlice';

const styles = StyleSheet.create({
  searchArea: {
    margin: '5%',
    borderBottomColor: '#adadad',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    marginBottom: 0,
    padding: '2%',
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
  },
  closeIcon: {
    width: 15,
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
    tintColor: 'white',
  },
  backIcon: {
    width: 15,
    height: undefined,
    aspectRatio: 1,
    tintColor: 'white',
  },
});

const Search = ({showBack, searchText, setSearchText}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkFavorites());
  // }, []);

  return (
    <View style={styles.searchArea}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FavoritesStack');
          }}>
          <Image
            source={require('../../assets/heart-filled.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      )}
      <TextInput
        placeholder="Search"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={[styles.search, {width: searchText.length > 0 ? '80%' : '92%'}]}
        placeholderTextColor="white"
      />
      {searchText.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
          }}>
          <Image
            source={require('../../assets/close.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
