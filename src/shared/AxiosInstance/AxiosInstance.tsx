import axios from 'axios';
import * as rax from 'retry-axios';
import {baseURL} from '../Variables/Auth';

export const axiosInstance = axios.create({
  baseURL: `http://${baseURL}`,
  timeout: 5000,
  // headers: {
  //   Authorization: AsyncStorage.getItem('access_token')
  //     ? 'Bearer ' + AsyncStorage.getItem('access_token')
  //     : null,
  // },
});

// axiosInstance.defaults.raxConfig = {
//   instance: axiosInstance
// };

// const interceptorId = rax.attach();
// const res = await axios({
//   url: 'https://test.local',
//   raxConfig: {
//     // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
//     retry: 3,

//     // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
//     noResponseRetries: 2,

//     // Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
//     retryDelay: 100,

//     // HTTP methods to automatically retry.  Defaults to:
//     // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
//     httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],

//     // The response status codes to retry.  Supports a double
//     // array with a list of ranges.  Defaults to:
//     // [[100, 199], [429, 429], [500, 599]]
//     statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],

//     // If you are using a non static instance of Axios you need
//     // to pass that instance here (const ax = axios.create())
//     instance: ax,

//     // You can set the backoff type.
//     // options are 'exponential' (default), 'static' or 'linear'
//     backoffType: 'exponential',

//     // You can detect when a retry is happening, and figure out how many
//     // retry attempts have been made
//     onRetryAttempt: err => {
//       const cfg = rax.getConfig(err);
//       console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
//     }
//   }
// });
