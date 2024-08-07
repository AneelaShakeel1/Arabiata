import {ENDPOINTS} from '../../api/endpoints';
import useRESTAPI, {ERequestMethods} from '../../api/rest';
import {setLoading} from '../../redux/slices/appConfigSlice';
import {useAppDispatch} from '../../redux/store/store';
export function useHHome() {
  const dispatch = useAppDispatch();
  const {callAPI} = useRESTAPI();

  async function getCategories() {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.GET_CATEGORY,
        config: {
          method: ERequestMethods.GET,
        },
      });
      console.log('GET CATEGORIES', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('GET CATEGORIES', error);
    }
  }
  async function getBoards() {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_HOME,
        config: {
          method: ERequestMethods.POST,
        },
      });
      console.log('POST HOME RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('POST HOME RESPONSE', error);
    }
  }
  async function getProductsByMenuApi(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_SUBCATEGORY,
        config: {
          method: ERequestMethods.POST,
          data,
        },
      });
      console.log('GET ALL PRODUCTS RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('GET ALL PRODUCTS RESPONSE', error);
    }
  }
  /** GET CATERING API */
  async function getCateringApi(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_SUBCATEGORY,
        config: {
          method: ERequestMethods.POST,
          data,
        },
      });
      console.log('GET ALL PRODUCTS RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('GET ALL PRODUCTS RESPONSE', error);
    }
  }
  /** CREATE JOB API */
  async function createJobApi(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CREATE_JOB,
        config: {
          method: ERequestMethods.POST,
          data,
        },
      });
      console.log('GET ALL PRODUCTS RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('GET ALL PRODUCTS RESPONSE', error);
    }
  }

  return {
    getBoards,
    getCategories,
    createJobApi,
    getProductsByMenuApi,
    getCateringApi,
  };
}
