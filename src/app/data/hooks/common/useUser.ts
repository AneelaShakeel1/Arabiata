import callAPI, { ERequestMethods } from "../../api/rest";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ENDPOINTS } from "../../api/endpoints";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { setLoginInfo } from "../../redux/slices/userSlice";


export function useHUser() {
    const dispatch = useAppDispatch();
    const { loginInfo } = useAppSelector(state => state.user);

    function setReduxLoginInfo(data: any) {
        dispatch(setLoginInfo(data))
    }

    return {
        loginInfo,
        setReduxLoginInfo
    }
}
