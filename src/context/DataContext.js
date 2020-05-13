import createDataContext from './createDataContext';
// import trackerApi from '../api/tracker';
import moment from 'moment';
import {
  search,
  getFullNutrients,
  getAnalysis,
  getCurrentLog,
  addFood,
  removeFood,
} from '../services/Data';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'search_list':
      return {...state, searchList: action.payload};
    case 'data_list':
      return {...state, dataList: action.payload};

    default:
      return state;
  }
};

const searchFood = dispatch => async data => {
  try {
    const {common} = await search(data);
    let arr = common;
    dispatch({type: 'search_list', payload: arr});
  } catch (e) {
    console.error(e);
  }
};

const clearDataList = dispatch => async () => {
  dispatch({type: 'data_list', payload: []});
};

const saveFood = dispatch => async (food, type, date, dataList) => {
  try {
    const response = await getFullNutrients({query: food.food_name});
    let {score} = await getAnalysis(response.foods[0]);
    console.log(score);
    const check = {
      name: food.food_name,
      detail: response.foods[0],
      type,
      date: moment(date),
      score,
    };
    let arr = dataList;
    arr.push({data: check});
    dispatch({type: 'data_list', payload: arr});
    await addFood({data: check});
  } catch (e) {
    console.error(e);
  }
};

const analyseFood = dispatch => async food => {
  try {
    const response = await getAnalysis(food.data.detail);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};

const getData = dispatch => async () => {
  try {
    const newRes = await getCurrentLog();
    dispatch({type: 'data_list', payload: newRes});
  } catch (e) {
    console.error(e);
  }
};

const deleteFood = dispatch => async (id, dataList) => {
  try {
    let newArr = dataList.filter(function(value, index, arr) {
      if (value.id !== id) {
        return value;
      }
    });
    dispatch({type: 'data_list', payload: newArr});
    await removeFood({id: id});
  } catch (e) {
    console.error(e);
  }
};

export const {Provider, Context} = createDataContext(
  dataReducer,
  {
    searchFood,
    saveFood,
    deleteFood,
    clearDataList,
    getData,
    analyseFood,
  },
  {
    searchList: [],
    dataList: [],
  },
);
