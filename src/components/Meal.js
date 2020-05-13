import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';

import AntIcon from 'react-native-vector-icons/AntDesign';
import BoldText from './BoldText';
import SmallText from './SmallText';

const Meal = ({
  children,
  type,
  onPress,
  iconType,
  iconName,
  image,
  calories,
  list,
  onPressDel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Image source={image} style={styles.image} />
        <BoldText style={styles.BoldText}>{type}</BoldText>
        {calories > 0 && (
          <SmallText style={styles.calories}>{calories} cal</SmallText>
        )}
        <TouchableOpacity style={styles.addIcon} onPress={onPress}>
          <AntIcon name="pluscircle" size={30} style={{color: Colors.orange}} />
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item, index) => item.data.name + index.toString()}
        listKey={(item, index) => 'D' + index.toString()}
        data={list}
        renderItem={({item}) => {
          if (item.data.type === type) {
            return (
              <View style={styles.mealsDetailView}>
                <View style={styles.mealItems}>
                  <SmallText style={{fontSize: 13}}>{item.data.name}</SmallText>
                  <BoldText style={styles.scoreText}>
                    {item.data.score}
                  </BoldText>
                </View>
                <TouchableOpacity onPress={() => onPressDel(item.id)}>
                  <AntIcon name="delete" size={20} style={{color: '#aaa'}} />
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default Meal;

const styles = StyleSheet.create({
  container: {marginTop: 15},
  headContainer: {flexDirection: 'row', alignItems: 'center'},
  BoldText: {
    paddingLeft: 10,
    color: Colors.grey,
    fontSize: 19,
    flex: 1,
  },
  mealsDetailView: {
    marginTop: 8,
    padding: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {paddingHorizontal: 10},
  image: {width: 40, height: 40},
  calories: {fontSize: 15, color: '#333'},
  mealItems: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  scoreText: {
    fontSize: 15,
    paddingLeft: 10,
    color: Colors.green,
  },
});
