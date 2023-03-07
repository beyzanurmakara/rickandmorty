import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {addFav, deleteFav} from '../../../redux/favoriteSlice';
import ModalContent from '../../Character/components/ModalContent';

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    padding: 5,
    marginTop: '2%',
    marginHorizontal: '5%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fav: {
    width: 25,
    height: undefined,
    aspectRatio: 1,
    tintColor: '#f56',
  },
  favButton: {
    position: 'absolute',
    zIndex: 100,
    right: '2%',
    top: '2%',
  },
  cardImage: {
    width: '30%',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  content: {
    width: '65%',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  species: {
    color: 'white',
    marginBottom: 5,
  },
  modal: {
    width: '100%',
    margin: 0,
    justifyContent: 'flex-end',
  },
});

const CharacterCard = ({item}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [characters, setCharacters] = useState([])
  const {favorites} = useSelector(state => state.favorites);

  useEffect(() => {
    const initScreen = async () => {
      const value = await AsyncStorage.getItem('favorites');
      value ? setCharacters(JSON.parse(value)) : null;
    };
    initScreen();
  }, [favorites]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log(item);
          setShow(true);
        }}
        style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => {
            if(characters?.filter(e => e.id == item.id).length !=0){
              dispatch(deleteFav(item));
            }
            else {
              dispatch(addFav(item));
            }
          }}>
          <Image
            source={
              characters?.filter(e => e.id == item.id).length !=0
                ? require('../../../assets/heart-filled.png')
                : require('../../../assets/heart.png')
            }
            style={styles.fav}
          />
        </TouchableOpacity>
        <View style={styles.cardImage}>
          <Image
            style={styles.image}
            source={{uri: item.image}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.species}>
            {item.species + ' (' + item.gender + ')'}
          </Text>
          <Text style={styles.species}>Location: {item.location.name}</Text>
          <Text style={styles.species}>
            Number of Episodes Played: {item.episode.length}
          </Text>
        </View>
      </TouchableOpacity>
      <ReactNativeModal
        isVisible={show}
        propagateSwipe={true}
        swipeDirection={'down'}
        onBackdropPress={() => {
          setShow(false);
        }}
        onSwipeComplete={() => {
          setShow(false);
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}>
        <ModalContent
          item={item}
          close={() => {
            setShow(false);
          }}
        />
      </ReactNativeModal>
    </>
  );
};

export default CharacterCard;
