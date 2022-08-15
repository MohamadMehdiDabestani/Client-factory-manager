import React, { useEffect } from "react";
import { axiosPrivate } from "@/api/axios";
import useRefreshToken from "./useRefreshToken";
import {
  initializerSelector,
  setTokenAndRefreshToken,
} from "@/redux_/slices/common/Initializer";
import { useSelector } from "react-redux";
import { fetch, responseType } from "@/types/public";
import { useAppDispatch } from "@/redux_/store";
import { hideList } from "@/redux_/slices/common/ValidationAlert";
import { showErrorNotif } from "@/redux_/slices/common/Notification";
import { getCookie } from "cookies-next";

const usePrivateApi = () => {
  const refresh = useRefreshToken();
  const init = useSelector(initializerSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshToken = getCookie("RefreshTokenVerification");
    if (!refreshToken) return;
    console.log('useEffect');
    const token = getCookie("TokenVerification");
    if (init.refreshToken.length <= 0) {
      dispatch(
        setTokenAndRefreshToken({
          token,
          refreshToken,
        })
      );
    }
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!["Authorization"]) {
          config.headers!["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          refresh(refreshToken?.toString());
          prevRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  const handleGet = <T extends unknown>(
    fetch: fetch,
    okCallback: (data: responseType<T>) => void,
    errorCallback?: () => void,
    fnCallback?: () => void
  ) => {
    console.log('method');
    
    axiosPrivate
      .get<responseType<T>>(fetch.url, {
        headers: {
          "Accept-Language": "fr",
          Authorization: `Bearer ${init.token}`,
        },
      })
      .then(({ data, status, headers }) => {
        if (status === 200) {
          dispatch(hideList());
          okCallback(data);
        } else {
          console.log("else", data);
        }
      })
      .catch(({ response }) => {
        if (response) {
          if (response.data.description) {
            dispatch(
              showErrorNotif({
                message: response.data.description,
              })
            );
            dispatch(hideList());
          }
          errorCallback && errorCallback();
        }
      })
      .finally(() => {
        fnCallback && fnCallback();
        console.log("finally");
      });
  };
  const handlePost = <T extends unknown>(
    fetch: fetch,
    okCallback: (data: responseType<T>) => void,
    errorCallback?: () => void,
    fnCallback?: () => void
  ) => {
    axiosPrivate
      .post<responseType<T>>(fetch.url, fetch.data, {
        headers: {
          "Accept-Language": "fr",
          Authorization: `Bearer ${init.token}`,
        },
      })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch(hideList());
          okCallback(data);
        } else {
          console.log("else", data);
        }
      })
      .catch(({ response }) => {
        if (response) {
          if (response.data.description) {
            dispatch(
              showErrorNotif({
                message: response.data.description,
              })
            );
            dispatch(hideList());
          }
          errorCallback && errorCallback();
        }
      })
      .finally(() => {
        fnCallback && fnCallback();
        console.log("finally");
      });
  };
  return { handleGet, handlePost };
};

export default usePrivateApi;
