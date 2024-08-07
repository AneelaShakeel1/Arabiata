import useRESTAPI, { ERequestMethods } from "../../api/rest";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { ENDPOINTS } from "../../api/endpoints";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { setLoginInfo } from "../../redux/slices/userSlice";
import { setAddressInfo } from "../../redux/slices/settingsSlice";

export function useHSettings() {
    const dispatch = useAppDispatch();
    const { loginInfo } = useAppSelector(state => state.user);
    const { addressInfo } = useAppSelector(state => state.settings);
    const { callAPI } = useRESTAPI();
    async function editProfile(data: any) {
        try {
            data = {
                ...data,
                user_id: loginInfo?.id
            }
            dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.UPDATE_PROFILE,
                config: {
                    method: ERequestMethods.POST,
                    data,
                    multipart: true
                }
            })
            console.log("EDIT PROFILE API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("EDIT PROFILE API ERROR", error);
        }
    }

    async function changePassword(data: any) {
        try {
            data = {
                user_id: loginInfo.id,
                old_password: data.oldPassword,
                new_password: data.newPassword,
                confirm_password: data.confirmPassword,
            }
            delete data.oldPassword;
            delete data.newPassword;
            delete data.confirmPassword;
            dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.CHANGE_PASSWORD,
                config: {
                    method: ERequestMethods.POST,
                    data
                }
            })
            console.log("CHANGE PASSWORD API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("CHANGE PASSWORD API ERROR", error);
        }
    }

    async function getAreaList() {
        try {
            dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.GET_AREA
            })
            console.log("AREA LIST API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("AREA LIST API ERROR", error);
        }
    }

    async function getAdressList() {
        try {
            dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.GET_ADDRESS,
                config: { method: ERequestMethods.POST, data: { user_id: loginInfo.id } }
            })
            console.log("ADDRESS LIST API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("ADDRESS LIST API ERROR", error);
        }
    }

    async function newAddress(data: any) {
        try {
            dispatch(setLoading(true));
            data = {
                user_id: loginInfo.id,
                ...data.area,
                block: data.block,
                address: data.street, //street
                address_type: data.addressType, //street
                house_no: data.houseNo,
                office_no: data.officeNo,
                flat_no: data.flatNo,
                building: data.building,
                special_directions: data.specialDirections
                // "area": 12,
            }
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.POST_ADDRESS,
                config: {
                    method: ERequestMethods.POST,
                    data
                }
            })
            console.log("NEW ADDRESS API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("NEW ADDRESS API ERROR", error);
        }
    }

    async function editAddress(data: any) {
        try {
            dispatch(setLoading(true));
            data = {
                address_id: data.addressId,
                user_id: data.userId,
                state_id: data.area.stateId,
                city_id: data.area.cityId,
                city_name: data.area.cityName,
                delivery_charge: data.area.deliveryCharge,
                min_order: data.area.minOrder,
                address_type: data.addressType,
                area: data.area,
                block: data.block,
                address: data.street,
                building: data.building,
                floor: data.floorNo,
                [data.addressType === 1 ? 'house_no' : data.addressType === 2 ? 'office_no' : 'flat_no']: data.addressType === 1 ? data.houseNo : data.addressType === 2 ? data.officeNo : data.flatNo,
                landmark: data.specialDirections,
            }
            if (data.addressType == 1) {
                delete data.building
                delete data.floor
            }
            delete data.area;
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.UPDATE_ADDRESS,
                config: {
                    method: ERequestMethods.POST,
                    data
                }
            })
            console.log("Edit ADDRESS API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("EDIT ADDRESS API ERROR", error);
        }
    }

    async function deleteAddress(addressId: number) {
        try {
            dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.DELETE_ADDRESS,
                config: {
                    method: ERequestMethods.POST,
                    data: { user_id: loginInfo.id, address_id: addressId }
                }
            })
            console.log("DELETE API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("DELETE API ERROR", error);
        }
    }

    async function contactUs(data: any) {
        try {
            dispatch(setLoading(true));
            data = {
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                message: data.message,
            }
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.POST_CONTACT,
                config: {
                    method: ERequestMethods.POST,
                    data
                }
            })
            console.log("CONTACTUS API RESPONSE", apiResponse);
            dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            dispatch(setLoading(false));
            console.log("CONTACTUS API ERROR", error);
        }
    }

    function setReduxAddressInfo(data: any) {
        dispatch(setAddressInfo(data));
    }

    async function getProfile(data: any) {
        try {
            // dispatch(setLoading(true));
            const apiResponse = await callAPI({
                subUrl: ENDPOINTS.GET_PROFILE,
                config: { method: ERequestMethods.POST, data },
            });
            console.log('GET PROFILE API RESPONSE', apiResponse);
            // dispatch(setLoading(false));
            return apiResponse;
        } catch (error) {
            // dispatch(setLoading(false));
            console.log('GET PROFILE API ERROR', error);
        }
    }

    return {
        editProfile,
        changePassword,
        getAreaList,
        getAdressList,
        newAddress,
        editAddress,
        deleteAddress,
        contactUs,
        setReduxAddressInfo,
        addressInfo,
        getProfile
    }
}
