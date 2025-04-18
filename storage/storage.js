import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  const json = JSON.stringify(value);
  await AsyncStorage.setItem(key, json);
};

export const getData = async (key) => {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : [];
};
