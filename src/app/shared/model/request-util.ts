import { URLSearchParams, BaseRequestOptions } from '@angular/http';
export let HOST: string = 'http://127.0.0.1:8080';


export const createRequestOption = (req?: any,accept:boolean=false): BaseRequestOptions => {
  const options: BaseRequestOptions = new BaseRequestOptions();
  if (req) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('page', req.page);
    params.set('size', req.size);
    if (req.sort) {
      params.paramsMap.set('sort', req.sort);
    }
    params.set('query', req.query);

    options.params = params;
  }
  // let token =
    // window.localStorage.getItem('jhi-authenticationtoken') ||
    // window.sessionStorage.getItem('jhi-authenticationtoken');
    // options.headers.append('accept', '*/*');

    // options.headers.append(
    //   'Access-Control-Allow-Headers',
    //   'X-Total-Count, Link'
    // );
    // options.headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    // options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  // if (token) {
  //   // token = token.replace(/^["']/, '');
  //   // token = token.replace(/["']$/, '');
  //   options.headers.append('Authorization', 'Bearer ' + token);
  // }
  return options;
};
export const getUniqueId = (
  prefix: string | number = '0',
  suffix: string | number = '0'
) => {

  return '' + Date.now();
};
