import { Pressable, Text, View } from 'react-native'
// TODO: https://github.com/facebook/react-native/issues/36794 -> Issue pending to be solved
import React, { useEffect, useState } from 'react'
import { useApiService } from '../../hooks/useApiService';
import CustomButton from '../../Components/CustomButton';
import { ItemWithId } from '../../types/item';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../App';
import styles from './styles';
import { ROUTE_DETAIL } from '../../config';

const Home = () => {

  const [data, setData] = useState([]);
  const navigation = useNavigation<StackNavigation>();

  const { addItem, getItems, removeItem } = useApiService();

  const getData = async () => {
    // @ts-ignore
    const nextData: ItemWithId[] = await getItems();
    setData(nextData);
  }

  const duplicateItem = (item: ItemWithId) => {
    const newItem = JSON.parse(JSON.stringify(item));
    delete newItem.id;
    newItem.createdAt = new Date().toISOString();
    addItem(newItem).then((doc) => {
      setData(data.concat([{ ...item, id: doc.id }]));
    })
  }

  const deleteItemById = (id: string) => {
    removeItem(id).then(() => {
      const nextData = data.filter((item) => item.id !== id);
      setData(nextData)
    }).catch((error) => {
      // show an alert in case of error
      alert(error);
    });
  }


  useEffect(() => {
    getData();
  }, []);

  const navigateToDetailScreen = (data?: ItemWithId) => {
    navigation.navigate(ROUTE_DETAIL);
  }

  const handlerOnPressItem = (item: ItemWithId) => {
    navigation.navigate(ROUTE_DETAIL, {
      data: item,
    });
  }

  return (
    <View style={styles.layout}>
      <View style={styles.addBtn}>
        <CustomButton onPress={() => navigateToDetailScreen()} text="Add piece"/>
      </View>
      {data?.map((item: ItemWithId) => (
        <Pressable onPress={() => handlerOnPressItem(item)} style={styles.card}>
          <View style={styles.tags}>
            {item.tags.map((tagItem) => (
              <Text style={styles.tag}>{tagItem}</Text>
            ))}
          </View>
          <Text style={styles.date}>{item.createdAt.split('T')[0]}</Text>
          <View style={styles.iconsCard}>
            <Pressable onPress={() => deleteItemById(item.id)} style={styles.iconWrapper}>
              <FontAwesome
                name="trash"
                style={styles.icon}
              />
            </Pressable>
            <Pressable onPress={() => duplicateItem(item)} style={styles.iconWrapper}>
              <FontAwesome
                name="copy"
                style={styles.icon}
              />
            </Pressable>
          </View>
        </Pressable>
      ))}
    </View>
  )
}

export default Home

