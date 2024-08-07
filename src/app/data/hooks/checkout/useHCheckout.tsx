import {getUserId} from '~/app/lib/utils/userId';
import {ENDPOINTS} from '../../api/endpoints';
import useRESTAPI, {ERequestMethods} from '../../api/rest';
import {setLoading} from '../../redux/slices/appConfigSlice';
import {useAppDispatch} from '../../redux/store/store';
export function useHCheckout() {
  const dispatch = useAppDispatch();
  const {callAPI} = useRESTAPI();

  async function verifyPromoCode(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_PROMO_CODE,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('VERIFY PROMOCODE API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('VERIFY PROMOCODE API ERROR', error);
    }
  }

  async function getPromoCodes(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: `${ENDPOINTS.GET_PROMO_CODE}?${
          data?.user_id ? `user_id=${data.user_id}` : `device_id=${data.device_id}`
        }`,
        config: {method: ERequestMethods.GET, data},
      });
      console.log('GET PROMOCODE API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('GET PROMOCODE API ERROR', error);
    }
  }

  return {
    verifyPromoCode,
    getPromoCodes,
  };
}
