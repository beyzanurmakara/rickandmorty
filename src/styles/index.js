import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading:{
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    position:'absolute',
    top:100
  },
  page:{
    paddingHorizontal: 5
  },
  text:{
    fontWeight: 'bold',
    color: 'white',
  },
  pager: {
    padding: '2%',
    margin: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
