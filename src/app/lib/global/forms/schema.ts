import * as Yup from 'yup';

export const loginFormValidationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required")
});

export const registerFormValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    referralCode: Yup.string(),
    termsAccepted: Yup.boolean().test('is-true', 'Please accept the terms', (value) => value === true).required("Please accept the terms"),
    password: Yup.string().required("Password is required")
});

export const forgotPasswordFormValidationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
});

export const editProfileFormValidationSchema = Yup.object({
    name: Yup.string(),
});

export const changePasswordFormValidationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Confirm password do not match to new password').required("Confirm Password is required")
});

export const newAddressFormValidationSchema = Yup.object({
    area: Yup.object({
        stateId: Yup.number(),
        cityId: Yup.number(),
        cityName: Yup.string(),
        deliveryCharge: Yup.string(),
        minOrder: Yup.string(),
    }).required("Area is required"),
    addressType: Yup.number().required("Address type is required"),
    block: Yup.number().required("block is required"),
    street: Yup.string().required("Address is required"), //street
    houseNo: Yup.number().required("House No. is required"),
    officeNo: Yup.string().required("Office No. is required"),
    floorNo: Yup.number(),
    flatNo: Yup.number().required("Flat No. is required"),
    building: Yup.string().required("Building is required"),
    specialDirections: Yup.string()
});

export const editAddressFormValidationSchema = Yup.object({
    addressId: Yup.number(),
    userId: Yup.number(),
    area: Yup.object({
        stateId: Yup.number(),
        cityId: Yup.number(),
        cityName: Yup.string(),
        deliveryCharge: Yup.string(),
        minOrder: Yup.string(),
    }),
    addressType: Yup.number(),
    block: Yup.number(),
    street: Yup.string(),
    houseNo: Yup.number(),
    officeNo: Yup.number(),
    flatNo: Yup.number(),
    floorNo: Yup.number(),
    building: Yup.number(),
    specialDirections: Yup.string()
});

export const contactUsFormValidationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required")
});

export const ratingAndReviewFormValidationSchema = Yup.object({
    rating: Yup.number().required("Rating is required"),
    review: Yup.string().required("Review is required")
});