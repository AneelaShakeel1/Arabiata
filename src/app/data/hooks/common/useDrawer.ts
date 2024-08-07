import useRESTAPI, { ERequestMethods } from '../../api/rest';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { ENDPOINTS } from '../../api/endpoints';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { setLoginInfo } from '../../redux/slices/userSlice';
import { setAddressInfo } from '../../redux/slices/settingsSlice';

export function useHDrawer() {
  const dispatch = useAppDispatch();
  const { loginInfo } = useAppSelector((state) => state.user);
  const { addressInfo } = useAppSelector((state) => state.settings);
  const { callAPI } = useRESTAPI();

  async function newRating(data: any) {
    try {
      data = {
        ...data,
        user_id: loginInfo?.id,
        ratting: data.rating,
        comment: data.review,
      };
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_RATING,
        config: {
          method: ERequestMethods.POST,
          data,
        },
      });
      console.log('RATING AND REVIEW API RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('RATING AND REVIEW API ERROR', error);
    }
  }

  async function ratingList() {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.GET_RATING,
        config: {
          method: ERequestMethods.GET,
          data: { user_id: loginInfo.id }
        }
      });
      console.log('RATING AND REVIEW LIST API RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('RATING AND REVIEW LIST API ERROR', error);
    }
  }

  async function loyaltyDetailsList() {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_LOYALTY,
        config: {
          method: ERequestMethods.POST,
          data: { user_id: loginInfo.id }
        },
      });
      console.log('LOYALTY DETAILS LIST API RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('LOYALTY DETAILS LIST API ERROR', error);
    }
  }

  async function favouritesList() {
    try {
      const userId = loginInfo.id;
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_FAVOURITE_LIST,
        config: {
          method: ERequestMethods.POST,
          data: { user_id: userId },
        },
      });
      console.log('FAVOURITE LIST API RESPONSE', apiResponse);
      return apiResponse;
    } catch (error) {
      console.log('FAVOURITE LIST API ERROR', error);
    }
  }
  async function addFavourite(data: any) {
    try {
      data.user_id = loginInfo.id;
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_FAVOURITE,
        config: {
          method: ERequestMethods.POST,
          data,
        },
      });
      console.log('ADD FAVOURITE API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('ADD FAVOURITE API ERROR', error);
    }
  }

  async function deleteFavourite(favouriteId: number) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_REMOVE_FAVOURITE,
        config: {
          method: ERequestMethods.POST,
          data: {
            user_id: loginInfo.id,
            favorite_id: favouriteId,
          },
        },
      });
      console.log('DELETE FAVOURITE LIST API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('DELETE FAVOURITE LIST API ERROR', error);
    }
  }

  async function newOrder(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_ORDER,
        config: { method: ERequestMethods.POST, data },
      });
      console.log('NEW ORDER API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('NEW ORDER API ERROR', error);
    }
  }

  async function ordersList() {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_ORDER_HISTORY,
        config: { method: ERequestMethods.POST, data: { user_id: loginInfo.id } },
      });
      console.log('ORDER LIST API RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('ORDER LIST API ERROR', error);
    }
  }

  async function ordersDetails(data: any) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_ORDER_DETAILS,
        config: { method: ERequestMethods.POST, data },
      });
      console.log('ORDER DETAILS API RESPONSE', JSON.stringify(apiResponse, null, 2));
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('ORDER DETAILS API ERROR', error);
    }
  }

  async function cancelOrder(orderId: number) {
    try {
      dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CANCEL_ORDER,
        config: {
          method: ERequestMethods.POST,
          data: {
            order_id: orderId,
            user_id: loginInfo.id
          }
        },
      });
      console.log('CANCEL ORDER API RESPONSE', apiResponse);
      dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      dispatch(setLoading(false));
      console.log('CANCEL ORDER API ERROR', error);
    }
  }
  async function getSearchItem(data: any) {
    try {
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_SEARCH_ITEM,
        config: { method: ERequestMethods.POST, data },
      });
      console.log('SEARCH ITEM API RESPONSE', apiResponse);
      return apiResponse;
    } catch (error) {
      console.log('SEARCH ITEM API ERROR', error);
    }
  }

  async function getOrderSummary(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_ORDER_SUMMARY,
        config: { method: ERequestMethods.POST, data },
      });
      console.log('ORDER SUMMARY API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('ORDER SUMMARY API ERROR', error);
    }
  }

  return {
    newRating,
    ratingList,
    loyaltyDetailsList,
    favouritesList,
    addFavourite,
    deleteFavourite,
    newOrder,
    ordersList,
    ordersDetails,
    cancelOrder,
    getSearchItem,
    getOrderSummary,
  };
}
