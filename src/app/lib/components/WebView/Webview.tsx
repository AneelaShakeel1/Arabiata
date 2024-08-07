import * as React from 'react';
import {WebView} from 'react-native-webview';
import {View, Text} from 'react-native';
import {useHUser} from '~/app/data/hooks/common/useUser';
import {getUserId} from '../../utils/userId';
import DeviceInfo from 'react-native-device-info';

interface IWebViewProps {
  baseUrl: any;
  handleOnMessage: (data: string) => void;
}

export default function Webview(props: IWebViewProps) {
  const {loginInfo} = useHUser();
  //   const initialHTMLContent = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //   <meta charset="utf-8">
  //   <title></title>
  //   <meta name="author" content="">
  //   <meta name="description" content="">
  //   <meta name="viewport" content="width=device-width, initial-scale=1">
  //   <script src='https://unpkg.com/rahulrsingh09-stenciltest2@0.0.3/dist/test/test.js'></script>
  // </head>
  // <body>
  // <h1>Hello</h1>
  // <my-component source-url="/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8"></my-component>
  // </body>
  // </html>`;
  const {baseUrl, handleOnMessage} = props;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <WebView
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          //   html: initialHTMLContent,
          uri: baseUrl,
          method: 'POST',
          // headers: {
          //   Authorization: `Bearer ${process.env.API_TOKEN}`,
          //   'Content-Type': 'application/json',
          // },
        }}
        onMessage={(data) => handleOnMessage(JSON.stringify(data.nativeEvent.data))}
      />
    </View>
  );
}
