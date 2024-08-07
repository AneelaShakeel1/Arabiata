export const loginFormInitialValues = {
    email: '',
    password: ''
}

export const forgotPasswordFormInitialValues = {
    email: '',
}

export const registerFormInitialValues = {
    name: '',
    email: '',
    phone: '',
    referral_code: '',
    terms_accepted: false,
    password: ''
}

export const editProfileFormInitialValues = {
    name: '',
}

export const changePasswordFormInitialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export const newAddressFormInitialValues = {
    // stateId: 1,
    // cityId: 1,
    // cityName: "Abc",
    // deliveryCharge: "0.00",
    // minOrder: "5.00",
    addressType: 1,
    area: null,
    block: 12,
    street: "xyz", //street
    houseNo: 12,
    officeNo: 12,
    flatNo: 12,
    building: "12",
    specialDirections: "These are spcial directions"
}

export const editAddressFormInitialValues = {
    addressId: 1432,
    stateId: 1,
    cityId: 1,
    cityName: "Abc",
    deliveryCharge: "0.00",
    minOrder: "5.00",
    addressType: 1,
    area: 12,
    block: 12,
    address: "xyz", //street
    houseNo: 12,
    specialDirections: "These are spcial directions"
}

export const contactUsFormInitialValues = {
    firstName: '',
    latName: '',
    email: '',
    message: ''
}

export const ratingAndReviewFormInitialValues = {
    rating: 1,
    review: ''
}