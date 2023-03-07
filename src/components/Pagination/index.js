import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from '../../styles';

const Pagination = ({selectedPage, i, selectPage}) => {
  return (
    <TouchableOpacity
      key={i}
      style={[
        styles.page,
        {
          borderBottomColor: selectedPage == i ? 'white' : 'transparent',
          borderBottomWidth: 2,
          borderRadius: 50,
        },
      ]}
      onPress={() => {
        selectPage();
      }}>
      <Text
        style={[
          styles.text,
          {
            fontSize: selectedPage == i ? 16 : 14,
          },
        ]}>
        {i + 1}
      </Text>
    </TouchableOpacity>
  );
};

export default Pagination;
