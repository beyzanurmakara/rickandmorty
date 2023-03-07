import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import { deleteFav } from '../../../redux/favoriteSlice';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalClose: {
    width: 25,
    height: undefined,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 100,
    position: 'absolute',
    right: '3%',
    top: '2%',
  },
  modalCloseIcon: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    tintColor: 'white',
  },
  header: {
    width: '80%',
    marginLeft: '5%',
    padding: 10,
    marginVertical: '2%',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  imageContainer: {
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
    marginBottom: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
  },
  text: {
    color: 'black',
    fontSize: 16,
    letterSpacing: 1,
  },
  bold: {
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  explanation: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fav: {
    width: 25,
    height: undefined,
    aspectRatio: 1,
    tintColor: '#f56',
  },
  favButton:{
    position: 'absolute',
    zIndex: 100,
    right: '2%',
    top: '2%',}
});

const ModalContent = ({item, close, isFav}) => {
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.favorites);
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => close()} style={styles.modalClose}>
        <Image
          style={styles.modalCloseIcon}
          source={require('../../../assets/close.png')}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.name}> {item.name} </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <TouchableOpacity style={styles.favButton} onPress={()=>{
            // if(favorites.filter(e => e.id == item.id).length !=0){
            //     dispatch(deleteFav(item));
            //   }
            //   else {
            //     dispatch(addFav(item));
            //   } 
        }}>
          <Image
            source={
              favorites.filter(e => e.id == item.id).length != 0
                ? require('../../../assets/heart-filled.png')
                : require('../../../assets/heart.png')
            }
            style={styles.fav}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.explanation}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Gender:</Text>
          {' ' + item.gender}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Location:</Text>
          {' ' + item.location.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Origin:</Text>
          {' ' + item.origin.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Species:</Text>
          {' ' + item.species}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Status:</Text>
          {' ' + item.status}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Number of Episodes Played:</Text>
          {' ' + item.episode.length}
        </Text>
      </View>
    </View>
  );
};

export default ModalContent;
