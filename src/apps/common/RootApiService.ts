import {
  DynamicQueryPath,
  EndPoints,
  HttpContentType,
  ErrorResp,
} from "../common/store/ApiConfig.data";
import axios, { AxiosRequestConfig } from "axios";

import { Logging } from "./helpers/Logging";
import { getCurrentBaseUrl } from "../../apps/common/AppSettings.data";
import { ERROR_CODE_401, SUCCESS_CODE_200 } from "./constants/constants";
export default class ApiService {
  protected readonly endPoint: EndPoints | string;

  public constructor(endPoint: EndPoints | string) {
    this.endPoint = endPoint;
  }
  public refreshToken<T = void>(path: DynamicQueryPath, slashEnd: any, resolve: any, reject: any, ) {
    const instance = this.getAxiosInstance();
    const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
    const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
    instance
      .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
        headers: {
          "Content-Type": HttpContentType.Json
        }
      })
      .then(
        (res: any) => {
          if (res.status === SUCCESS_CODE_200) {
            localStorage.setItem('token', `Bearer ${res?.data?.access}`);
            const requestRetryResp = this.get(path, slashEnd, true);
            resolve(requestRetryResp);
          }
        },
        (err: any) => {
          Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
            error: err,
          });
          reject(this.processError(err));
        }
      );
  }


  public get<T = void>(path: DynamicQueryPath, slashEnd: string = "/", refreshTokenRequest: boolean = false): Promise<T> {
    Logging.debug(`ApiService.get ${this.getUrl(path)}`, { path });
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance
        .get(this.getUrl(path, slashEnd), this.getConfig(HttpContentType.Json, localStorage.getItem("token")))
        .then(
          (res: any) => {
            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
              result: res,
            });
            resolve(res.data);
          },
          (err: any) => {
            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
              error: err,
            });
            const error = this.processError(err);
            if (error.errorCode === ERROR_CODE_401) {
              const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
              const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
              instance
                .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
                  headers: {
                    "Content-Type": HttpContentType.Json
                  }
                })
                .then(
                  (res: any) => {
                    if (res.status === SUCCESS_CODE_200) {
                      localStorage.setItem('token', `Bearer ${res?.data?.access}`);
                      instance
                        .get(this.getUrl(path, slashEnd), this.getConfig(HttpContentType.Json, localStorage.getItem("token")))
                        .then(
                          (res: any) => {
                            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
                              result: res,
                            });
                            resolve(res.data);
                          },
                          (err: any) => {
                            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
                              error: err,
                            });
                            const error = this.processError(err);
                            if (error.errorCode === ERROR_CODE_401) {
                              localStorage.clear();
                              window.location.href = '/login';
                            }
                            reject(this.processError(err));
                          });
                    }
                  },
                  (err: any) => {
                    Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
                      error: err,
                    });
                    localStorage.clear();
                    window.location.href = '/login';
                    reject(this.processError(err));
                  }
                );
            }
            else {
              reject(this.processError(err));
            }
          }

        )
    );
  }

  public post<T = void>(path: DynamicQueryPath, body: object | string | number | boolean, contentType: HttpContentType = HttpContentType.Json): Promise<T> {
    Logging.debug(`ApiService.post ${this.getUrl(path)}`, {
      path,
      body,
    });
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance
        .post(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
        .then(
          (res: any) => {
            Logging.debug(`ApiService.post ${this.getUrl(path)} @Response`, {
              result: res,
            });
            resolve(res.data);
          },
          (err: any) => {
            Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
              error: err,
            });
            const error = this.processError(err);
            if (error.errorCode === ERROR_CODE_401) {
              const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
              const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
              instance
                .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
                  headers: {
                    "Content-Type": HttpContentType.Json
                  }
                })
                .then(
                  (res: any) => {
                    if (res.status === SUCCESS_CODE_200) {
                      localStorage.setItem('token', `Bearer ${res?.data?.access}`);
                      instance
                        .post(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
                        .then(
                          (res: any) => {
                            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
                              result: res,
                            });
                            resolve(res.data);
                          },
                          (err: any) => {
                            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
                              error: err,
                            });
                            const error = this.processError(err);
                            if (error.errorCode === ERROR_CODE_401) {
                              localStorage.clear();
                              window.location.href = '/login';
                            }
                            reject(this.processError(err));
                          });
                    }
                  },
                  (err: any) => {
                    Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
                      error: err,
                    });
                    reject(this.processError(err));
                    localStorage.clear();
                    window.location.href = '/login';
                  }
                );
            }
            else {
              reject(this.processError(err));
            }
          }
        )
    );
  }

  public patch<T = void>(
    path: DynamicQueryPath,
    body?: object | string | number | boolean,
    contentType: HttpContentType = HttpContentType.Json
  ): Promise<T> {
    Logging.debug(`ApiService.patch ${this.getUrl(path)}`, {
      path,
      body,
    });
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance
        .patch(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
        .then(
          (res: any) => {
            Logging.debug(`ApiService.patch ${this.getUrl(path)} @Response`, {
              result: res,
            });
            resolve(res.data);
          },
          (err: any) => {
            Logging.error(`ApiService.patch ${this.getUrl(path)} @Error`, {
              error: err,
            });
            const error = this.processError(err);
            if (error.errorCode === ERROR_CODE_401) {
              const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
              const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
              instance
                .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
                  headers: {
                    "Content-Type": HttpContentType.Json
                  }
                })
                .then(
                  (res: any) => {
                    if (res.status === SUCCESS_CODE_200) {
                      localStorage.setItem('token', `Bearer ${res?.data?.access}`);
                      instance
                        .patch(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
                        .then(
                          (res: any) => {
                            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
                              result: res,
                            });
                            resolve(res.data);
                          },
                          (err: any) => {
                            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
                              error: err,
                            });
                            const error = this.processError(err);
                            if (error.errorCode === ERROR_CODE_401) {
                              localStorage.clear();
                              window.location.href = '/login';
                            }
                            reject(this.processError(err));
                          });
                    }
                  },
                  (err: any) => {
                    Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
                      error: err,
                    });
                    reject(this.processError(err));
                    localStorage.clear();
                    window.location.href = '/login';
                  }
                );
            }
            else {
              reject(this.processError(err));
            }
          }
        )
    );
  }

  public put<T = void>(
    path: DynamicQueryPath,
    body?: object | string | number | boolean,
    contentType: HttpContentType = HttpContentType.Json
  ): Promise<T> {
    Logging.debug(`ApiService.put ${this.getUrl(path)}`, {
      path,
      body,
    });
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance
        .put(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
        .then(
          (res: any) => {
            Logging.debug(`ApiService.put ${this.getUrl(path)} @Response`, {
              result: res,
            });
            resolve(res.data);
          },
          (err: any) => {
            Logging.error(`ApiService.put ${this.getUrl(path)} @Error`, {
              error: err,
            });
            const error = this.processError(err);
            if (error.errorCode === ERROR_CODE_401) {
              const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
              const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
              instance
                .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
                  headers: {
                    "Content-Type": HttpContentType.Json
                  }
                })
                .then(
                  (res: any) => {
                    if (res.status === SUCCESS_CODE_200) {
                      localStorage.setItem('token', `Bearer ${res?.data?.access}`);
                      instance
                        .put(this.getUrl(path), body, this.getConfig(contentType, localStorage.getItem("token")))
                        .then(
                          (res: any) => {
                            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
                              result: res,
                            });
                            resolve(res.data);
                          },
                          (err: any) => {
                            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
                              error: err,
                            });
                            const error = this.processError(err);
                            if (error.errorCode === ERROR_CODE_401) {
                              localStorage.clear();
                              window.location.href = '/login';
                            }
                            reject(this.processError(err));
                          });
                    }
                  },
                  (err: any) => {
                    Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
                      error: err,
                    });
                    reject(this.processError(err));
                    localStorage.clear();
                    window.location.href = '/login';
                  }
                );
            }
            else {
              reject(this.processError(err));
            }
          }
        )
    );
  }

  public delete<T = void>(path: DynamicQueryPath): Promise<T> {
    Logging.debug(`ApiService.delete ${this.getUrl(path)}`, { path });
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance
        .delete(this.getUrl(path), this.getConfig(HttpContentType.Json, localStorage.getItem("token")))
        .then(
          (res: any) => {
            Logging.debug(`ApiService.delete ${this.getUrl(path)} @Response`, {
              result: res,
            });
            resolve(res.data);
          },
          (err: any) => {
            Logging.error(`ApiService.delete ${this.getUrl(path)} @Error`, {
              error: err,
            });
            const error = this.processError(err);
            if (error.errorCode === ERROR_CODE_401) {
              const refreshApiEndPont: string = '/api/v1/authentication/refresh-token';
              const refreshApiPath = `${getCurrentBaseUrl()}${refreshApiEndPont}`;
              instance
                .post(refreshApiPath, { refresh: localStorage.getItem("refreshToken") }, {
                  headers: {
                    "Content-Type": HttpContentType.Json
                  }
                })
                .then(
                  (res: any) => {
                    if (res.status === SUCCESS_CODE_200) {
                      localStorage.setItem('token', `Bearer ${res?.data?.access}`);
                      instance
                        .delete(this.getUrl(path), this.getConfig(HttpContentType.Json, localStorage.getItem("token")))
                        .then(
                          (res: any) => {
                            Logging.debug(`ApiService.get ${this.getUrl(path)} @Response`, {
                              result: res,
                            });
                            resolve(res.data);
                          },
                          (err: any) => {
                            Logging.error(`ApiService.get ${this.getUrl(path)} @Error`, {
                              error: err,
                            });
                            const error = this.processError(err);
                            if (error.errorCode === ERROR_CODE_401) {
                              localStorage.clear();
                              window.location.href = '/login';
                            }
                            reject(this.processError(err));
                          });
                    }
                  },
                  (err: any) => {
                    Logging.error(`ApiService.post ${this.getUrl(path)} @Error`, {
                      error: err,
                    });
                    reject(this.processError(err));
                    localStorage.clear();
                    window.location.href = '/login';
                  }
                );
            }
            else {
              reject(this.processError(err));
            }
          }
        )
    );
  };

  /**
   * Define all the error codes based on definition in backend
   * Throws 500 if the error code is null or empty
   */
  private processError(error: any): { errorCode: number, errorMsg: Error, errorResp: ErrorResp; } {
    let errorCode = 500;
    let errorMsg = error;
    let errorResp = error.response?.data;
    if ((error && error.response && error.response.status)) {
      errorCode = error.response.status;
    }
    if ((error && error.response && error.response.statusText)) {
      errorMsg = new Error(error.response.statusText);
    }
    let errorResponse = { errorCode, errorMsg, errorResp };
    switch (errorCode) {
      case 400:
      case 403:
        if (error && error.response && error.response.data) {
          if (error.response.data.Error) {
            errorResponse.errorMsg = new Error(error.response.data.Error);
          } else if (error.response.data.detail) {
            errorResponse.errorMsg = new Error(error.response.data.detail);
          }
        } else {
          errorResponse.errorMsg = new Error("Invalid data");
        }
        break;
      case 401:

        errorResponse.errorMsg = new Error("Unauthorised");
        break;
      case 404:
        errorResponse.errorMsg = new Error("Resource not found");
        break;
      case 500:
        errorResponse.errorMsg = new Error("Internal server error");
        break;
      default:
        errorResponse.errorMsg = new Error("Internal server error");
    }
    return errorResponse;
  }

  /**
   * Axios request object
   */
  private getConfig(contentType: HttpContentType, token: string | null): AxiosRequestConfig {
    const headers = this.isAuthTokenRequired(this.endPoint)
      ? {
        "Content-Type": contentType.toString(),
        Authorization: token,
      }
      : {
        "Content-Type": contentType.toString(),
      };

    return {
      headers,
    };
  }

  /**
   * Determines if an API requires authorisation using auth token.
   * Based on url pattern followed to isolated authenticated API from the others.
   */
  private isAuthTokenRequired(path: string): boolean {
    return true;
    // return path.startsWith("/api/") || path.startsWith("api/");
  }

  /**
   * Generates axios instance and adds an interceptor to monitor api errors
   */
  private getAxiosInstance() {
    const instance = axios.create();
    // TODO - Add axios interceptor to fetch refresh token based on refresh token logic
    return instance;
  }

  /**
   * Generates complete API url based on BaseUrl, Static EndPoint and
   * dynamic params provided.
   */
  private getUrl(path: DynamicQueryPath, slashEnd: string = "/"): string {
    let url: string = `${getCurrentBaseUrl()}${this.endPoint}`;
    if (path) {
      if (path.dynamicRoute && path.dynamicRoute.length > 0) {
        path.dynamicRoute.forEach((route: string) => {
          url += `/${route}`;
        });
        url += slashEnd;
      }
      if (path.dynamicQueryParams) {
        let separator = "?";
        path.dynamicQueryParams.forEach((query) => {
          for (const key in query) {
            if (query[key]) {
              url += `${separator}${encodeURI(key)}=${encodeURI(
                query[key]!.toString()
              )}`;
              separator = "&";
            }
          }
        });
      }
    }
    return url;
  }
}
