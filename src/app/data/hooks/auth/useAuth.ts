import { ENDPOINTS } from "../../api/endpoints";
import useRESTAPI, { ERequestMethods } from "../../api/rest";
import * as env from "../../env";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { setLoginInfo } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/store/store";


export function useHAuth() {
  const dispatch = useAppDispatch();
  const { callAPI } = useRESTAPI();

  async function login(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_LOGIN,
        config: {
          method: ERequestMethods.POST,
          data
        }
      })
      console.log("LOGIN RESPONSE", apiResponse);
      if (apiResponse?.data?.id) {
        dispatch(setLoginInfo(apiResponse.data));
      }
      dispatch(setLoading(false));
      return apiResponse;

    } catch (error) {
      dispatch(setLoading(false));
      console.log("LOGIN API ERROR", error);
    }
  }

  async function register(data: any) {
    data = {
      ...data,
      mobile: data.phone,
      "token": env.API_TOKEN,
      "login_type": "email",
      "register_type": "email",
      "referral_code": ""
    }
    delete data.phone
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_REGISTER,
        config: {
          method: ERequestMethods.POST,
          data
        }
      })
      console.log("REGISTER RESPONSE", apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log("REGISTER API ERROR", error);
    }
  }

  async function forgotPassword(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_FORGOT_PASSWORD,
        config: {
          method: ERequestMethods.POST,
          data
        }
      })
      console.log("FROGOT PASSWORD RESPONSE", apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log("FROGOT PASSWORD API ERROR", error);
    }
  }

  async function resendOtp(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_RESEND_EMAIL_OTP,
        config: {
          method: ERequestMethods.POST,
          data
        }
      })
      console.log("RESEND OTP RESPONSE", apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log("RESEND OTP API ERROR", error);
    }
  }

  async function verfiyOtp(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_VERIFY_EMAIL_OTP,
        config: {
          method: ERequestMethods.POST,
          data
        }
      })
      console.log("VERIFY OTP RESPONSE", apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log("VERIFY OTP API ERROR", error);
    }
  }

  return {
    login,
    register,
    forgotPassword,
    resendOtp,
    verfiyOtp
  }
}
