import {IChangeTasteProblem} from '../Models/changeTasteProblem.models';
import {IAuthData} from '../Models/LogIn.models';
import {ISwallowProblem} from '../Models/SwallowProblem.models';
import {Fetcher} from './Fetcher';

export class PostGeneral {
  static signIn = async (data: any) => {
    /**
     * wysłanie danych logowania i odebranie danych do autoryzacji
     */
    const config = {'Content-Type': 'application/x-www-form-urlencoded'};
    return await Fetcher.post(`/user/o/token/`, data, config);
  };
  static signOut = async (data: any) => {
    /**
     * wylogowanie
     */
    return await Fetcher.post(`/user/o/revoke_token/`, data);
  };
  static weightData = async (data: any) => {
    /**
     * wysłanie danych z małej wagi
     */
    return await Fetcher.post(`/activity/scale-results/`, data);
  };
  static emotionalSupportScale = async (data: any) => {
    /**
     * wysłanie danych z małej wagi
     */
    return await Fetcher.post(`/activity/user-emotions/`, data);
  };
  static swallowProblem = async (data: ISwallowProblem[]) => {
    /**
     * wysłanie wyników ankiety
     */
    return await Fetcher.post(`/poll/swallow-poll/`, data);
  };
  static changeTasteProblem = async (data: IChangeTasteProblem[]) => {
    /**
     * wysłanie wyników ankiety
     */
    return await Fetcher.post(`/poll/taste-poll/`, data);
  };
  static ice = async (data: any) => {
    /**
     * pobranie danych z profilu pacjenta
     */
    return await Fetcher.post(`/user/ice-contact/`, data);
  };

  static userDevice = async (data: any) => {
    /**
     * wysłanie urządzenia usera
     */
    return await Fetcher.post(`/user/devices/`, data);
  };
  static eatAmount = async (data: any) => {
    /**
     * wysłanie zjedzonego posiłku
     */
    return await Fetcher.post(`/diet/eat-amount/`, data);
  };
  static waterAmount = async (data: any) => {
    /**
     * wysłanie wypitej wody
     */
    return await Fetcher.post(`/diet/water-amount/`, data);
  };
  static onkodietetyka = async (data: any) => {
    /**
     * wysłanie ankiety onkodietetyka
     */
    return await Fetcher.post(`/poll/base-poll/`, data);
  };
  static changePassword = async (data: any) => {
    return await Fetcher.post(`/user/users/password-change/`, data);
  };
  static sendIssue = async (data: {title: string; message: string}) => {
    return await Fetcher.post(`/user/issues/`, data);
  };
  static User: any;
}
