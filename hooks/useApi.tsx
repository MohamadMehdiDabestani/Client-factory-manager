import axios from "axios";
import { fetch, responseType } from "@/types/public";
import { useAppDispatch } from "@/redux_/store";
import { showErrorNotif } from "@/redux_/slices/common/Notification";
import { hideList, showList } from "@/redux_/slices/common/ValidationAlert";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { initializerSelector, setToken } from "@/redux_/slices/common/Initializer";
import { useSelector } from "react-redux";
interface responseRefreshToken {
  expireAt : string,
  token : string,
  refreshToken : string,
  refreshTokenExpireAt : string
}
const useApi = () => {
  const dispatch = useAppDispatch();

  const config = {
    local: "",
    external: process.env.NEXT_PUBLIC_API,
  };
  const handleGet = <T extends unknown>(
    fetch: fetch,
    okCallback: (data: responseType<T>) => void,
    errorCallback?: () => void,
    fnCallback?: () => void
  ) => {
    const api = config[fetch.type];
    // getToken()
      
    axios
      .get<responseType<T>>(`${api}${fetch.url}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": "fr",
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
        if(response) {
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
    const api = config[fetch.type];
    axios
      .post<responseType<T>>(`${api}${fetch.url}`, fetch.data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": "fr",
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
        if(response) {
          console.log("error", response.data);
          if (response.data.isValidationError) {
            dispatch(
              showList({
                list: response.data.validationErrors,
                description: response.data.description,
              })
            );
          } else {
            if (response.data.description) {
              dispatch(
                showErrorNotif({
                  message: response.data.description,
                })
              );
              dispatch(hideList());
            }
          }
          errorCallback && errorCallback();
        }
      })
      .finally(() => {
        fnCallback && fnCallback();
        console.log("finally");
      });
  };
  return { handlePost , handleGet };
};

export default useApi;
