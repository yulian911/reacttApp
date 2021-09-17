import {createContext, FC, useContext, useEffect, useState} from 'react';
import * as React from 'react';
import {IIce, IPatientProfile} from '../shared/Models/PatientProfile.models';
import {GetGeneral} from '../shared/Requests/GetGeneral';

const ProfileContex = createContext<ProfileContexData | null>(null);

export const ProfileProvider: FC = ({children}) => {
  const value = useProviderProfile();
  return (
    <ProfileContex.Provider value={value}>{children}</ProfileContex.Provider>
  );
};
const useProviderProfile = () => {
  const [profile, setProfile] = useState<IPatientProfile | null>(null);
  const [ice, setIce] = useState<IIce | null>(null);
  const [fromNotification, setFromNotification] = useState<boolean>(false);

  const handleGetPatientProfile = async () => {
    const result = await GetGeneral.profile();

    if (result.error) {
      console.log('błąd', result);
      return;
    }
    console.log('dane', result.data);
    setProfile(result.data);
  };

  const handleGetICE = async () => {
    const result = await GetGeneral.ice();
    if (result.error) {
      console.log('błąd', result);
      return;
    }
    console.log('dane', result.data);
    setIce(result.data);
  };

  return {
    profile,
    setProfile,
    handleGetPatientProfile,
    handleGetICE,
    ice,
    fromNotification,
    setFromNotification,
  };
};
type ProfileContexData = ReturnType<typeof useProviderProfile>;

export const useProfile = () => {
  const profile = useContext(ProfileContex);
  if (!profile) {
    throw new Error('useProfile must be used inside ProfileContexProvider');
  }
  return profile;
};
