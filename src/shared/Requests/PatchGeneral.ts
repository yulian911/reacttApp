import {IPatientProfile} from '../Models/PatientProfile.models';
import {Fetcher} from './Fetcher';

export class PatchGeneral {
  static emotionalSupportScale = async (id: number, data: any) => {
    /**
     * wysłanie danych z małej wagi
     */
    return await Fetcher.patch(`/activity/user-emotions/${id}/`, data);
  };
  static readNotification = async (id: number, data: any) => {
    /**
     * ustalenie powiadomienia jako przeczytane
     */
    return await Fetcher.patch(`/websockets/notifications/${id}/`, data);
  };
  static profile = async (data: any) => {
    /**
     * pobranie danych z profilu pacjenta
     */
    return await Fetcher.patch(`/user/profile/edit-my-profile/`, data);
  };
  static ice = async (id: number, data: any) => {
    /**
     * pobranie danych z profilu pacjenta
     */
    return await Fetcher.patch(`/user/ice-contact/${id}/`, data);
  };
  static eatAmount = async (id: number, data: any) => {
    /**
     * patchowanie posiłku
     */
    return await Fetcher.patch(`/diet/eat-amount/${id}/`, data);
  };
  static waterAmount = async (id: number, data: any) => {
    /**
     * patchowanie wody
     */
    return await Fetcher.patch(`/diet/water-amount/${id}/`, data);
  };
}
