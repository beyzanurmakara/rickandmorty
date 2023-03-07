import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles =StyleSheet.create({
    listItem: {
        width: '90%',
        padding: 15,
        marginTop: '2.5%',
        marginHorizontal: '5%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dcdcdc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'rgba(0,0,0,0.5)'
      },
      name:{
        fontWeight:'bold',
        color:'white'
      }
})

const ListItem = ({goDetail, name}) => {
  return (
    <TouchableOpacity onPress={() => goDetail()} style={styles.listItem}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;
