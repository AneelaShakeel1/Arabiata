declare module '*.svg' {
    import React from 'react';
    import {SvgProps} from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
  
  declare module '*.png';
  declare module '*.jpeg';
  declare module '*.jpg';
  declare module '*.gif';
  declare module 'react-native-config' {
    export const ISPRODUCTION: string;
    //   export const MAIN_API_URL: string;
    //   export const AUTH_API_URL: string;
    //   export const CHAT_API_URL: string;
    //   export const ENC_API_URL: string;
    //   export const WEB_BASE_URL: string;
    //   export const THUMBNAIL_UPLOAD: string;
    export const IS_WEB: string;
    export const IS_DEV: string;
    export const LOCAL_DATA: string;
    export const BASE_URL: string;
  }