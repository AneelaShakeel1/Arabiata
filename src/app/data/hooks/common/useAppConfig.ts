import { setAccessToken, setLanguage, setThemeMode } from "../../redux/slices/appConfigSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";


export function useAppConfig() {
    const dispatch = useAppDispatch();
    const { loading, accessToken, language, themeMode } = useAppSelector(state => state.appConfig);
    

    function setReduxAccessToken(accessToken: string) {
        dispatch(setAccessToken(accessToken))
    }
    function setReduxLanguage(language: string) {
        dispatch(setLanguage(language))
    }
    function setReduxThemeMode(themeMode: string) {
        dispatch(setThemeMode(themeMode))
    }
   

    return {
        loading,
        language,
        themeMode,
        accessToken,
        setReduxAccessToken,
        setReduxLanguage,
        setReduxThemeMode
    }
}