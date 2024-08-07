// IS_WEB is required for web .env veriable convention started from REACT_APP_VERIABLE_NAME
// for Mobile IS_WEB is false and .env veriable convetion started from without REACT_APP prefix.
export const IS_WEB = process.env.NEXT_PUBLIC_IS_WEB || false;
export const IS_DEV = IS_WEB ? process.env.NEXT_PUBLIC_IS_DEV : process.env.IS_DEV;
export const BASE_URL = IS_WEB ? process.env.NEXT_PUBLIC_BASE_URL : process.env.BASE_URL;
export const DATA_PROVIDER = IS_WEB ? process.env.NEXT_PUBLIC_DATA_PROVIDER : process.env.DATA_PROVIDER 
export const API_TOKEN = IS_WEB ? process.env.NEXT_PUBLIC_DATA_PROVIDER : process.env.API_TOKEN 