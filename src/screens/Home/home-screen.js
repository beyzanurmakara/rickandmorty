import PushNotificationIOS from '@react-native-community/push-notification-ios';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import { checkFavorites } from '../../redux/favoriteSlice';
import Styles from '../../styles';
import ListItem from './components/ListItem';

const HomeScreen = ({navigation}) => {
  const [allList, setAllList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pager, setPager] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [searchedList, setSearchedList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(checkFavorites())
    axios.get('https://rickandmortyapi.com/api/episode').then(response => {
      let tempPager = [];
      let page = [];
      response.data.results.map((item, index) => {
        if (index % 10 < 9) {
          page.push(item);
        } else {
          page.push(item);
          tempPager.push(page);
          page = [];
        }
      });
      setPager(tempPager);
      setAllList(response.data);
    });
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      setSearchedList(
        allList.results.filter(
          e =>
            e.name.toLowerCase().includes(searchText.toLowerCase()) ||
            e.episode.toLowerCase().includes(searchText.toLowerCase()),
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
        showBack={false}
      />
      {searchText.length == 0 ? (
        <>
          <FlatList
            data={pager[selectedPage]}
            keyExtractor={(item, key) => key}
            renderItem={({item, index}) => (
              <ListItem
                goDetail={() =>
                  navigation.navigate('EpisodeStack', {
                    characters: item.characters,
                    name:item?.name
                  })
                }
                name={index + 1 + ' - ' + item?.name}
              />
            )}
          />
          <View style={Styles.pager}>
            {pager.map((_, i) => 
              <Pagination
                key={i}
                i={i}
                selectedPage={selectedPage}
                selectPage={() => {
                  setSelectedPage(i);
                }}
              />
            )}
          </View>
        </>
      ) : (
        <FlatList
          data={searchedList}
          keyExtractor={(item, key) => key}
          renderItem={({item, index}) => {
            let i = allList?.results.indexOf(item) + 1;
            return (
              <ListItem
                goDetail={() =>
                  navigation.navigate('EpisodeStack', {
                    characters: item.characters,
                    name:item?.name
                  })
                }
                name={i + ' - ' + item?.name}
              />
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.text}>Not Found</Text>
            </View>
          }
        />
      )}
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  emptyList: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
