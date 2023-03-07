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
import CharacterCard from './components/CharacterCard';
import Styles from '../../styles';

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

const EpisodeDetailScreen = ({route}) => {
  const {characters, name} = route.params;
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [characterList, setCharacterList] = useState([]);
  const [characterPager, setcharacterPager] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [searchedCharacterPager, setSearchedCharacterPager] = useState([]);
  const [searchedSelectedPage, setSearchedSelectedPage] = useState(0);
  const [searchedList, setSearchedList] = useState([]);
  useEffect(() => {
    if (characters) {
      setCharacterList([]);
      characters.map(async (item, index) => {
        if (index == 0) setLoading(true);
        let tempList = characterList;
        let character = await axios.get(item);
        tempList.push(character.data);
        setCharacterList(tempList);
        if (characterList.length == characters.length) {
          let page = [];
          characterList.map((el, index) => {
            let tempPager = characterPager;
            if (index % 5 < 4) {
              page.push(el);
            } else {
              page.push(el);
              tempPager.push(page);
              setcharacterPager(tempPager);
              page = [];
            }
          });
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      setSearchedList(
        characterList.filter(
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
      if (searchedList.length > 5) {
        let page = [];
        characterList.map((el, index) => {
          let tempPager = searchedCharacterPager;
          if (index % 5 < 4) {
            page.push(el);
          } else {
            page.push(el);
            tempPager.push(page);
            setSearchedCharacterPager(tempPager);
            page = [];
          }
        });
      }
      else {
          setSearchedCharacterPager([])
      }
    } else if (searchText.length == 0) {
      setSearchedList([]);
    }
  }, [searchText]);

  return (
    <>
      <ImageBackground
        source={require('../../assets/rickandmorty.jpg')}
        style={Styles.container}
        blurRadius={5}>
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          showBack={true}
        />
        <Text style={styles.header}>{name}</Text>
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
            <View style={Styles.pager}>
            {searchedCharacterPager.map((_, i) => (
              <Pagination
                key={i}
                i={i}
                selectedPage={selectedPage}
                selectPage={() => {
                  setSelectedPage(i);
                }}
              />
            ))}
          </View>
          </>
        ) : (
          <>
            <FlatList
              data={characterPager[selectedPage]}
              renderItem={({item, index}) => {
                return (
                  <CharacterCard item={item} key={index} />
                );
              }}
              keyExtractor={(item, key) => key}
            />
            <View style={Styles.pager}>
              {characterPager.map((_, i) => (
                <Pagination
                  key={i}
                  i={i}
                  selectedPage={selectedPage}
                  selectPage={() => {
                    setTimeout(() => {
                      setSelectedPage(i);
                    }, 300);
                  }}
                />
              ))}
            </View>
          </>
        )}
      </ImageBackground>
      {loading ? (
        <View style={Styles.loading}>
          <ActivityIndicator size={'large'} color="white" />
        </View>
      ) : null}
    </>
  );
};

export default EpisodeDetailScreen;
