import {axiosInstance} from '../AxiosInstance/AxiosInstance'
// import { catchTimeout } from "./catchTimeout";
// import { catchUnathenticated } from "./catchUnathenticated";

export class Fetcher {
  /**
   * get/delete/post/patch -> Przy wykonywaniu request, w razie złapania błędu, funkcje zwracają flagę error jako true, oraz status błędu
   * w przypadku poprawnego wykonania promise, funkcja zwraca wszystkie dane które zwraca sam promise.
   */
  static get = async (url: string, data: any = '') => {
    return await axiosInstance
      .get(url)
      .then(r => {
        return {...r, error: false, msg: 'ok'}
      })
      .catch(e => {
        if (e.response === undefined) {
          console.log(e, 'błąd pobierania, e[Error]')
        }
        // catchTimeout(e);
        // catchUnathenticated(e);
        return {...e, error: true, status: e?.response?.status}
      })
  }

  static delete = async (url: string) => {
    return await axiosInstance
      .delete(url)
      .then(r => ({...r, error: false, msg: 'ok'}))
      .catch(e => {
        // catchTimeout(e);
        // catchUnathenticated(e);
        return {...e, error: true, status: e?.response?.status}
      })
  }

  static post = async (
    url: string,
    data: unknown,
    config: any = {headers: {'Content-Type': 'application/json'}},
  ) => {
    return await axiosInstance
      .post(url, data, config)
      .then(r => ({...r, error: false}))
      .catch(e => {
        // catchTimeout(e);
        // catchUnathenticated(e);
        return {...e, error: true, status: e?.response?.status}
      })
  }

  static patch = async (
    url: string,
    data: unknown,
    config: any = {headers: {'Content-Type': 'application/json'}},
  ) => {
    return await axiosInstance
      .patch(url, data, config)
      .then(r => ({...r, error: false}))
      .catch(e => {
        // catchTimeout(e);
        // catchUnathenticated(e);
        return {...e, error: true, status: e?.response?.status}
      })
  }
}
