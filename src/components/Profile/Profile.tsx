import React, {useEffect} from 'react';
import {View} from 'react-native';
import {ProfileProvider, useProfile} from '../../Contex/profileContex';
import ProfileDetails from './ProfileDetails';

const Profile = ({navigation}: any) => {
  return (
    // <ProfileProvider>
    <ProfileDetails navigation={navigation} />
    // </ProfileProvider>
  );
};

export default Profile;
