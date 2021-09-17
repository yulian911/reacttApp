import {Fetcher} from './Fetcher';

export class GetGeneral {
  static userInfo = async () => {
    /**
     * pobranie danych uzytkownika
     */
    return await Fetcher.get(`/user/users/me/`);
  };
  static profile = async () => {
    /**
     * pobranie danych z profilu pacjenta
     */
    return await Fetcher.get(`/user/profile/my-profile/`);
  };

  static ice = async () => {
    // pobranie danych z profilu pacjenta ICE
    return await Fetcher.get(`/user/ice-contact/me/`);
  };
  static lastWeightResults = async () => {
    /**
     * pobranie ostatnich wyników z wagi
     */
    return await Fetcher.get(`/activity/scale-calc/latest/`);
  };
  static lastWaterAmount = async () => {
    /**
     * pobranie ostatnich wyników z wpdt
     */
    return await Fetcher.get(`/diet/water-amount/my-daily-summary/`); // TODO jak nic nie będzie to null | Poprawić
  };
  static lastEatAmount = async () => {
    /**
     * pobranie ostatnich wyników  jedzenia %
     */
    return await Fetcher.get(`/diet/eat-amount/my-daily-summary/`); // TODO jak nic nie będzie to null | Poprawić
  };
  static actualDate = async () => {
    /**
     * pobranie aktualnej daty z serwera
     */
    return await Fetcher.get(`/time/`);
  };
  static emotionalSupportList = async () => {
    /**
     * pobranie wyników wsparcia emocjonalnego z aktualnego dnia
     */
    return await Fetcher.get(`/activity/user-emotions/latest/`);
  };
  static userDevices = async () => {
    /**
     * pobranie urządzeń pomiarowych użytkownika
     */
    return await Fetcher.get(`/user/devices/me/`);
  };
  static notifications = async () => {
    /**
     * pobranie powiadomień
     */
    return await Fetcher.get(`/ws/notifications/2/?2`);
  };
  static latestDietPdf = async () => {
    /**
     * pobranie ostatniego pliku pdf z dietą
     */
    return await Fetcher.get('/diet/user-diet/latest/');
  };
  static listDietPdf = async () => {
    /**
     * pobranie listy plików pdf z dietą
     */
    return await Fetcher.get('/diet/user-diet/my-list/');
  };
  static historyListDietPdf = async () => {
    /**
     * pobranie historii plików pdf z dietą
     */
    return await Fetcher.get('/diet/user-diet/my-history/');
  };
  static futureListDietPdf = async () => {
    /**
     * pobranie przyszłych plików pdf z dietą
     */
    return await Fetcher.get('/diet/user-diet/my-future/');
  };
  static clickedDataMeals = async (date: string) => {
    /**
     * pobranie posiłków pacjenta z klikniętej daty
     */
    return await Fetcher.get(`/diet/eat-amount/me/?date=${date}`);
  };
  static waterAmountByDate = async (date: string) => {
    /**
     * pobranie wypitej wody z klikniętej daty
     */
    return await Fetcher.get(`/diet/water-amount/me/?date=${date}`);
  };
  static pollDiets = async (value: string) => {
    /**
     * pobranie diet do ankiety
     */
    return await Fetcher.get(`/poll/diets/?name=${value}`);
  };
  static pollDiseases = async (value: string) => {
    /**
     * pobranie chorób z ankiet
     */
    return await Fetcher.get(`/poll/diseases/?name=${value}`);
  };
  static mealProducts = async (value: string) => {
    /**
     * pobranie składników
     */
    return await Fetcher.get(`/poll/meal-products/?name=${value}&limit=10`);
    // return await Fetcher.get(`/poll/meal-products/`);
  };
  static productUnits = async (value: string) => {
    /**
     * pobranie jednostek produktów
     */
    return await Fetcher.get(`/poll/product-units/?name=${value}&limit=10`);
    // return await Fetcher.get(`/poll/product-units/`);
  };
}
