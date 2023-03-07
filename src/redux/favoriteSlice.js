import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {createSlice} from '@reduxjs/toolkit';
import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
const sliceName = 'favoriteSlice';

const FavoriteSlice = createSlice({
  name: sliceName,
  initialState: {
    favorites: [],
  },
  reducers: {
    checkFavorites: async state => {
      console.log('CHECK FAVS');
      const value = await AsyncStorage.getItem('favorites');
      console.log('VAL >>', JSON.parse(value));
      value ? (state.favorites = JSON.parse(value)) : null;
    },
    addFav: (state, action) => {
      let tempList = state.favorites;
      if (tempList.length == 10) {
        if(Platform.OS=='ios'){
          PushNotificationIOS.requestPermissions().then(() => {
            PushNotificationIOS.presentLocalNotification({
              alertBody:
                'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.',
            });
          });
        }
        else {
          PushNotification.localNotification({
            channelId:'channel-id',
            message:'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.'
          })
        }
      } else if (tempList.filter(e => e.id == action.payload.id).length == 0) {
        tempList.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(tempList));
        state.favorites = tempList;
      }
    },
    deleteFav: (state, {payload}) => {
      Alert.alert('Are you sure?', 'You are about to remove the character named '+payload.name+' from favourites.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async() => {
            const value = await AsyncStorage.getItem('favorites');
            if(value){
                AsyncStorage.setItem('favorites', JSON.stringify(JSON.parse(value).filter(e => e.id != payload.id)))
            }
            state.favorites = state.favorites.length>0?state.favorites?.filter(e => e.id != payload.id):[]
          },
        },
      ]);
    },
  },
});

export const {addFav, deleteFav, checkFavorites} = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
