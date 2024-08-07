import { Icon } from "@rneui/themed";
import { FormikHelpers, FormikProps, FormikValues } from "formik";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useHSettings } from "~/app/data/hooks/common/useSettings";
import { AkButton, AkText, AkView } from "~/app/lib/elements";
import Col from "~/app/lib/elements/AkView/Col/Col";
import Row from "~/app/lib/elements/AkView/Row/Row";
import AkCheckbox from "~/app/lib/elements/Checkbox/AkCheckbox";
import AkInputWithFormik from "~/app/lib/elements/Input/AkInput";
// import { editAddressFormInitialValues } from "~/app/lib/global/forms/initialValues";
import { editAddressFormValidationSchema } from "~/app/lib/global/forms/schema";
import useAKThemeImages from "~/app/lib/hooks/useAKImages";
import useAKTheme from "~/app/lib/hooks/useAKTheme";
import FormikWrapper from "~/app/lib/wrappers/formik";
import Header from "~/app/lib/components/Header/Header";

export default function EditAddress(props: any) {
    const [statesList, setStatesList] = useState<null | any[]>(null);
    const [showAreaList, setShowAreaList] = useState(false);
    // const [editAddressFormInitialValues, setEditAddressFormInitialValues] = useState<any>(null);
    const formikRef = useRef<FormikProps<FormikValues> | null>(null);
    const { t } = useTranslation();
    const { colors } = useAKTheme();
    const { ArrowBack, Navigation,
        EditProfileRed,
        LockRed,
        CoinRed,
        LocationRed,
        UserRed,
        NoteRed,
        InformationRed,
        Home,

    } = useAKThemeImages();
    const { getAreaList, newAddress, addressInfo, editAddress } = useHSettings();

    const editAddressFormInitialValues = {
        addressId: addressInfo.id ?? '',
        userId: addressInfo.user_id ?? '',
        area: {
            stateId: addressInfo.state_id ?? '',
            cityId: addressInfo.city_id ?? '',
            cityName: addressInfo.city_name ?? '',
            deliveryCharge: addressInfo.delivery_charge ?? '',
            minOrder: addressInfo.min_order ?? '',
        },
        addressType: addressInfo.address_type ?? '',
        landmark: addressInfo.landmark ?? '',
        block: addressInfo.block ?? '',
        building: addressInfo.building ?? '',
        street: addressInfo.address ?? '',
        houseNo: addressInfo.house_no ?? '',
        officeNo: addressInfo.office_no ?? '',
        flatNo: addressInfo.flat_no ?? '',
        floorNo: addressInfo.floor ?? '',
        specialDirections: addressInfo.landmark ?? '',
    }

    useLayoutEffect(() => {
        callGetAreaListAPI();
    }, [])

    async function callGetAreaListAPI() {
        const result = await getAreaList();
        if (result?.state) {
            setStatesList(result.state);
        }
        // console.log(result.state[0], "AREA LIST STATE");        
        // console.log(result.branch[0], "AREA LIST BRANCH");        
    }

    function EditAddressForm({ handleSubmit, values, setFieldValue }: FormikProps<FormikValues>) {
        console.log(addressInfo, "===========VALUES EDIT ADRESS==========");

        let colorForAddressType1 = values.addressType === 1 ? colors.colorPrimary : colors.white
        let colorForAddressType1IconText = values.addressType === 1 ? colors.white : colors.black
        let colorForAddressType2 = values.addressType === 2 ? colors.colorPrimary : colors.white
        let colorForAddressType2IconText = values.addressType === 2 ? colors.white : colors.black
        let colorForAddressType3 = values.addressType === 3 ? colors.colorPrimary : colors.white
        let colorForAddressType3IconText = values.addressType === 3 ? colors.white : colors.black
        return (
            <>
                <AkView style={{ justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => setFieldValue('addressType', 1)}>
                        <Col style={{ backgroundColor: colorForAddressType1, width: 100, height: 80, padding: 10, borderRadius: 6, alignItems: 'center' }}>
                            <Icon name="home" type="antdesign" size={40} color={colorForAddressType1IconText} />
                            <AkText style={{ color: colorForAddressType1IconText, marginTop: 5, fontWeight: 'bold' }}>{t('house')}</AkText>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFieldValue('addressType', 2)}>
                        <Col style={{ backgroundColor: colorForAddressType2, width: 100, height: 80, padding: 10, borderRadius: 6, alignItems: 'center' }}>
                            <Icon name="office-building-cog-outline" type="material-community" size={40} color={colorForAddressType2IconText} />
                            <AkText style={{ color: colorForAddressType2IconText, marginTop: 5, fontWeight: 'bold' }}>{t('office')}</AkText>
                        </Col>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFieldValue('addressType', 3)}>
                        <Col style={{ backgroundColor: colorForAddressType3, width: 100, height: 80, padding: 10, borderRadius: 6, alignItems: 'center' }}>
                            <Icon name="building-o" type="font-awesome" size={40} color={colorForAddressType3IconText} />
                            <AkText style={{ color: colorForAddressType3IconText, marginTop: 5, fontWeight: 'bold' }}>{t('flat')}</AkText>
                        </Col>
                    </TouchableOpacity>
                </AkView>
                <AkInputWithFormik name="area" placeholder={t('select_city_title')} label={t('select_city_title')} value={values.area ? values.area?.cityName : ''} onFocus={() => { setShowAreaList(true) }} caretHidden showSoftInputOnFocus={false} />
                <AkInputWithFormik name="block" placeholder={t('block')} label={t('block')} keyboardType="number-pad" />
                <AkInputWithFormik name="street" placeholder={t('street_title')} label={t('street_title')} />
                {(values.addressType === 2 || values.addressType === 3) && <AkInputWithFormik name="building" placeholder={t('building_title')} label={t('building_title')} keyboardType="number-pad" />}
                {(values.addressType === 2 || values.addressType === 3) && <AkInputWithFormik name="floorNo" placeholder={t('floor_title')} label={t('floor_title')} keyboardType="number-pad" />}
                {values.addressType === 1 && <AkInputWithFormik name="houseNo" placeholder={t('house')} label={t('house')} keyboardType="number-pad" />}
                {values.addressType === 2 && <AkInputWithFormik name="officeNo" placeholder={t('office')} label={t('office')} keyboardType="number-pad" />}
                {values.addressType === 3 && <AkInputWithFormik name="flatNo" placeholder={t('flat')} label={t('flat')} keyboardType="number-pad" />}
                <AkInputWithFormik name="specialDirections" placeholder={t('special_direction_title')} label={t('special_direction_title')} />
                <AkButton btnText={t("save_address")} onClick={handleSubmit} containerStyles={{ marginVertical: 20 }} />
            </>
        );
    }

    async function onSubmit(values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
        console.log("FORMIK EDIT ADDRESS FINAL FORM VALUES", values);
        const result = await editAddress(values);
        if (result?.message) {
            Toast.show({ position: 'bottom', text1: result?.message });
        } else {
            return;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            <Header title={t('edit_address')}/>
            <FormikWrapper initialValues={editAddressFormInitialValues} validationSchema={editAddressFormValidationSchema} onSubmit={onSubmit} children={EditAddressForm} />

            {/* AREA LIST */}
            <Modal visible={showAreaList}>
                <Col style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Col style={{ flex: 0.8, backgroundColor: colors.white, padding: 10, marginBottom: 50, borderRadius: 6 }}>
                        <AkText style={{ textAlign: 'right' }} onPress={() => setShowAreaList(false)}>Close</AkText>
                        <AkText style={{ marginVertical: 10, fontWeight: 'bold' }}>Select Area</AkText>
                        <FlatList
                            data={statesList}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={"handled"}
                            renderItem={
                                ({ item, index }) => {
                                    return (
                                        <Col key={item.state_name + index}>
                                            <AkText style={{ marginVertical: 10, marginHorizontal: 10, fontWeight: 'bold' }}>{item.state_name}</AkText>

                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={item.city}
                                                style={{ marginHorizontal: 20 }}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => {
                                                            // setSelectedArea({
                                                            //     state_id: item.state_id,
                                                            //     city_id: item.id,
                                                            //     city_name: item.city_name,
                                                            //     delivery_charge: item.delivery_fee,
                                                            //     min_order: item.min_order,
                                                            // });
                                                            if (formikRef?.current) {
                                                                formikRef.current.setFieldValue('area', {
                                                                    state_id: item.state_id,
                                                                    city_id: item.id,
                                                                    city_name: item.city_name,
                                                                    delivery_charge: item.delivery_fee,
                                                                    min_order: item.min_order,
                                                                })
                                                            }
                                                            setShowAreaList(false);
                                                        }} style={{ marginVertical: 10, borderBottomWidth: 0.2, borderBottomColor: colors.gray }}>
                                                            <AkView >
                                                                <AkText key={item.city_name + index}>{item.city_name}</AkText>
                                                            </AkView>
                                                        </TouchableOpacity>
                                                    );
                                                }}
                                            />
                                        </Col>
                                    );
                                }
                            }
                        />
                    </Col>
                </Col>
            </Modal>
        </SafeAreaView>
    )
}