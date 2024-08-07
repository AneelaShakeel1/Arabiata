import {ENDPOINTS} from '../../api/endpoints';
import useRESTAPI, {ERequestMethods} from '../../api/rest';
import {setLoading} from '../../redux/slices/appConfigSlice';
import {useAppDispatch} from '../../redux/store/store';
export function useHCart() {
  const dispatch = useAppDispatch();
  const {callAPI} = useRESTAPI();

  async function getCartItems(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CART_ITEMS,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('GET CART ITEMS API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('GET CART ITEMS API ERROR', error);
    }
  }
  async function qtyUpdate(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CART_QUANTITY,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('QTY UPDATE API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('QTY UPDATE API ERROR', error);
    }
  }
  async function getCartCount(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CART_COUNT,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('GET CART COUNT API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('GET CART COUNT API ERROR', error);
    }
  }
  async function addToCart(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CART,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('ADD TO CART API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('ADD TO CART API ERROR', error);
    }
  }
  async function removeCartItem(data: any) {
    try {
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_CART_REMOVE_ITEM,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('REMOVE CART ITEM API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('REMOVE CART ITEM API ERROR', error);
    }
  }
  async function getPaymentLink(data: any) {
    try {
      // const orderTotal = data.order_total;
      // delete data.order_total;
      // dispatch(setLoading(true));
      const apiResponse = await callAPI({
        // subUrl: `${ENDPOINTS.POST_FATOORAH_LINK}?order_total=${orderTotal}`,
        subUrl: ENDPOINTS.POST_PAYMENT_LINK,
        config: {method: ERequestMethods.POST, data},
      });
      console.log('GET PAYMENT LINK API RESPONSE', apiResponse);
      // dispatch(setLoading(false));
      return apiResponse;
    } catch (error) {
      // dispatch(setLoading(false));
      console.log('GET PAYMENT LINK API ERROR', error);
    }
  }

  async function getItemDetails(item_id: number) {
    try {
      const apiResponse = await callAPI({
        subUrl: ENDPOINTS.POST_ITEM_DETAILS,
        config: {method: ERequestMethods.POST, data: {item_id}},
      });
      console.log('GET ITEM DEATILS API RESPONSE', apiResponse);
      return apiResponse;
    } catch (error) {
      console.log('GET ITEM DEATILS API ERROR', error);
    }
  }

  return {
    getPaymentLink,
    getCartItems,
    getCartCount,
    addToCart,
    removeCartItem,
    qtyUpdate,
    getItemDetails,
  };
}
