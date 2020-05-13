import {API_BASE_URL, NUTRITIONIX_URL} from '../../config/index';
import {get, post, getNX, postNX} from '../remote';

export function search(data) {
  const url = `${NUTRITIONIX_URL}/search/instant${
    data ? `?query=${data}` : ''
  }`;
  return getNX(url);
}

export function getFullNutrients(data) {
  const url = `${NUTRITIONIX_URL}/natural/nutrients`;
  return postNX(url, data);
}

export function getAnalysis(data) {
  const url = `${API_BASE_URL}/analyseNutritionixTest`;
  return post(url, data);
}

export async function getCurrentLog(data) {
  const url = `${API_BASE_URL}/getLogTest`;
  return get(url);
}

export function addFood(data) {
  const url = `${API_BASE_URL}/logFoodTest`;
  return post(url, data);
}

export function removeFood(id) {
  const url = `${API_BASE_URL}/deleteLogTest`;
  return post(url, id);
}
