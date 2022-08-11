import {
  initializerSelector,
  setTokenAndRefreshToken,
} from "@/redux_/slices/common/Initializer";
import { useAppDispatch } from "@/redux_/store";
import { axiosPrivate } from "@/api/axios";
import { useSelector } from "react-redux";
import { responseType } from "@/types/public";
import { setCookie } from "cookies-next";
interface responseRefreshToken {
  expireAt: string;
  token: string;
  refreshToken: string;
  refreshTokenExpireAt: string;
}
const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const init = useSelector(initializerSelector);

  const refresh = (refreshToken : string) => {
    console.log(
      "this is state befor send req for refresh token",
      init
    );

    axiosPrivate
      .post<responseType<responseRefreshToken>>("User/RefreshToken", {
        refreshToken,
      })
      .then(({ data }) => {
        setCookie("TokenVerification", data.data.token, {
          expires: new Date(data.data.expireAt),
        });
        setCookie("RefreshTokenVerification", data.data.refreshToken, {
          expires: new Date(data.data.refreshTokenExpireAt),
        });
        dispatch(
          setTokenAndRefreshToken({
            token: data.data.token,
            refreshToken: data.data.refreshToken,
          })
        );
      });
  };
  return refresh;
};
export default useRefreshToken;
