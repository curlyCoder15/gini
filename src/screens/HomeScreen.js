import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {SearchBar} from 'react-native-elements';
import moment from 'moment';
import Colors from '../constants/Colors';
import SafeArea from '../components/SafeArea';
import SmallText from '../components/SmallText';
import BoldText from '../components/BoldText';
import Meal from '../components/Meal';
import Icon from 'react-native-vector-icons/FontAwesome';

import Breakfast from '../assets/images/breakfast.png';
import Lunch from '../assets/images/lunch.png';
import Dinner from '../assets/images/dinner.png';
import {Context as DataContext} from '../context/DataContext';

const HomeScreen = ({navigation}) => {
  const {
    state: {searchList, dataList},
    searchFood,
    saveFood,
    deleteFood,
    clearDataList,
    getData,
  } = useContext(DataContext);
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const [searchText, setSearchText] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const displayDate = () => {
    return moment(currentDate).format('DD MMM');
  };

  const changeDate = type => {
    let value = 0;
    if (type === 'left') {
      value = -1;
    }
    if (type === 'right' && currentDate !== moment().format('YYYY-MM-DD')) {
      value = 1;
    }
    setCurrentDate(
      moment(currentDate)
        .add(value, 'd')
        .format('YYYY-MM-DD'),
    );
  };

  const updateSearch = value => {
    setSearchText(value);
    if (value.length > 3) {
      searchFood(value);
    }
  };

  const handleSelection = selectedFood => {
    saveFood(selectedFood, typeSearch, currentDate, dataList);
    setTypeSearch('');
    clearDataList();
  };

  const displayDateData = () => {
    return (
      <View>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => changeDate('left')}
            style={styles.iconButtonStyle}>
            <Icon name="chevron-left" size={20} color={Colors.green} />
          </TouchableOpacity>
          <BoldText style={styles.dateText}>{displayDate()}</BoldText>
          <TouchableOpacity
            onPress={() => changeDate('right')}
            style={styles.iconButtonStyle}>
            <Icon name="chevron-right" size={20} color={Colors.green} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{margin: 50}} />}
          keyExtractor={() => '1234'}
          data={['one']}
          listKey={(item, index) => 'D' + index.toString()}
          style={styles.foodView}
          renderItem={item => (
            <View>
              <Meal
                type={'Breakfast'}
                image={Breakfast}
                calories={10}
                onPress={() => setTypeSearch('Breakfast')}
                list={dataList}
                onPressDel={id => deleteFood(id, dataList)}
              />
              <Meal
                type={'Lunch'}
                image={Lunch}
                calories={0}
                onPress={() => setTypeSearch('Lunch')}
                list={dataList}
                onPressDel={id => deleteFood(id, dataList)}
              />
              <Meal
                type={'Dinner'}
                image={Dinner}
                calories={0}
                onPress={() => setTypeSearch('Dinner')}
                list={dataList}
                onPressDel={id => deleteFood(id, dataList)}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeArea>
      <View>
        {typeSearch === '' ? (
          displayDateData()
        ) : (
          <View>
            <SearchBar
              placeholder="Type Here..."
              platform={'ios'}
              onChangeText={value => updateSearch(value)}
              value={searchText}
            />
            <FlatList
              style={{paddingHorizontal: 15, marginTop: 7}}
              keyExtractor={item => item.food_name}
              ListFooterComponent={<View style={{padding: 80}} />}
              data={searchList}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleSelection(item)}
                    style={styles.searchRow}>
                    <SmallText style={{fontSize: 16}}>
                      {item.food_name.charAt(0).toUpperCase() +
                        item.food_name.slice(1)}
                    </SmallText>
                    <SmallText
                      style={{fontSize: 12, marginTop: 6, color: '#666'}}>
                      {item.serving_qty} {item.serving_unit}
                    </SmallText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  foodView: {paddingHorizontal: 15, marginTop: 10},
  container: {},
  iconButtonStyle: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headContainer: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchRow: {
    marginVertical: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  dateText: {fontSize: 22, flex: 1},
});
