import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
// TODO: https://github.com/facebook/react-native/issues/36794 -> Issue pending to be solved
import RNUserIdentity from 'react-native-user-identity';
import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    const getCurrentUser = async function () {
      console.log('Before uid');
      const uid = await RNUserIdentity.getUserId({})
      console.log('uid: ', uid);
    };
    getCurrentUser();

  }, []);

  return (
    <Layout>
      <Text>HOME</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({});

export default Home

