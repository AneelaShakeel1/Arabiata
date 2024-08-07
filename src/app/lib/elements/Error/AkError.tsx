import {ReactNode} from 'react';
import {View, Text} from 'react-native';

import {Icon} from '@rneui/base';
import AkView from '../AkView/AkView/AkView';
import AkText from '../Text/AkText';

type Props = {
  children: ReactNode;
  errorMsg?: string | null;
};

function AkError({children, errorMsg}: Props) {
  return (
    <>
      {children}
      {errorMsg && (
        <AkView
          style={{flexDirection: 'row', marginLeft: 3, alignItems: 'center', opacity: 0.7}}
          >
          <Icon color={'red'} name="information-outline" type="material-community" size={20} />
          <AkText style={{color: 'red', marginLeft: 1, fontSize: 12}}>
            {errorMsg?.charAt(0).toUpperCase() + errorMsg?.slice(1, errorMsg.length)}
          </AkText>
        </AkView>
      )}
    </>
  );
}

export default AkError;
