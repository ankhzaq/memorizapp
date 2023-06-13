import { firebase } from '../config';
import { Item, ItemWithId } from '../types/item';
import { Keyboard } from 'react-native';

export function useApiService() {
  const dataRef = firebase.firestore().collection('bitacora');

  const getItems = async () => {
    return new Promise((resolve, reject) => {
      dataRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
              const item = doc.data()
              data.push({ id: doc.id, ...item});
            });
            resolve(data);
          }, reject);
    });
  }

  const addItem = (data: Item) => {
    return dataRef.add(data);
  }

  const removeItem = (id: string) => {
    return dataRef.doc(id).delete();
  }

  const updateItem = (id: string, data: ItemWithId) => {
    return dataRef
      .doc(data.id)
      .update(data);
  }

  return { getItems, addItem, removeItem, updateItem };
}
