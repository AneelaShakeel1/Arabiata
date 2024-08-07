import callAPI, { ERequestMethods } from "../../api/rest";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ENDPOINTS } from "../../api/endpoints";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { setLoginInfo } from "../../redux/slices/userSlice";
import { setCartCount } from "../../redux/slices/cartSlice";


export function useHRedux() {
    const dispatch = useAppDispatch();
    const { cartCount } = useAppSelector(state => state.cart);

    function setReduxCartCount(data: any) {
        dispatch(setCartCount(data))
    }

    return {
        cartCount,
        setReduxCartCount
    }
}
