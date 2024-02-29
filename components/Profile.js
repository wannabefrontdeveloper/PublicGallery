import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getPosts} from '../lib/posts';
import {getUser} from '../lib/users';
import Avatar from './Avatar';

function Profile({userId}) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUser(userId).then(setUser);
    getPosts({userId}).then(setPosts);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
});

export default Profile;
