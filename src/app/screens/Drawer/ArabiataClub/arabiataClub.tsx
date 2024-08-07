import {useIsFocused} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHDrawer} from '~/app/data/hooks/common/useDrawer';
import {AkText, AkView} from '~/app/lib/elements';
import Col from '~/app/lib/elements/AkView/Col/Col';
import Row from '~/app/lib/elements/AkView/Row/Row';
import useAKThemeImages from '~/app/lib/hooks/useAKImages';
import useAKTheme from '~/app/lib/hooks/useAKTheme';
import Header from '~/app/lib/components/Header/Header';

export default function ArabiataClub(props: any) {
  const [loyaltyBalance, setLoyaltyBalance] = useState<null | number>(0);
  const [loyaltyDetails, setLoyaltyDetails] = useState<null | any[]>(null);
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {colors} = useAKTheme();
  const {ArrowBack, Navigation, Logo, TrophyGreen} = useAKThemeImages();
  const {loyaltyDetailsList} = useHDrawer();

  useLayoutEffect(() => {
    callGetLoyaltyDetailsListAPI();
  }, [isFocused]);

  async function callGetLoyaltyDetailsListAPI() {
    const result = await loyaltyDetailsList();
    if (result?.status === 1) {
      setLoyaltyBalance(result.loyaltybalance);
      setLoyaltyDetails(result.data);
    }
    // console.log(result.state[0], "AREA LIST STATE");
    // console.log(result.branch[0], "AREA LIST BRANCH");
  }

  return (
    <SafeAreaView style={{flex: 1, width: '100%', paddingHorizontal: 20}}>
      <Header title={t('loyalty')} />
      <AkView
        style={{
          backgroundColor: colors.colorPrimary,
          width: '100%',
          height: 180,
          borderRadius: 9,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col style={{alignItems: 'center'}}>
          <Icon
            name={'trophy'}
            type="evilicon"
            size={80}
            style={{fontWeight: 'bold'}}
            color={colors.white}
          />
          <AkText
            style={{fontWeight: 'bold', fontSize: 18, color: colors.white, marginVertical: 10}}>
            {t('loyalty_balance')}
          </AkText>
          <AkText style={{fontWeight: 'bold', fontSize: 18, color: colors.white}}>
            {loyaltyBalance}
          </AkText>
        </Col>
      </AkView>

      <AkView>
        <AkText style={{fontWeight: 'bold', fontSize: 19, marginVertical: 10}}>
          {t('my_coins')}
        </AkText>
      </AkView>

      {loyaltyDetails && loyaltyDetails !== null && loyaltyDetails.length > 0 ? (
        <FlatList
          data={loyaltyDetails}
          renderItem={({item, index}) => {
            return (
              <AkView
                style={{
                  backgroundColor: colors.white,
                  height: 90,
                  padding: 18,
                  borderRadius: 8,
                  marginVertical: 10,
                }}>
                <Image source={TrophyGreen} style={{width: 35, height: 35}} />
                <Col style={{flex: 1, marginHorizontal: 10}}>
                  <AkView style={{alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <AkText>{item.order_number}</AkText>
                    <AkText>{item.date}</AkText>
                  </AkView>
                  <AkView
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flex: 1,
                      marginTop: 8,
                    }}>
                    <AkText style={{color: colors.light_green}}>{t('new_order_loyalty')}</AkText>
                    <AkView>
                      <AkText style={{color: colors.light_green, marginHorizontal: 5}}>
                        {item.order_coins}
                      </AkText>
                      <Icon
                        name={'trophy'}
                        type="font-awesome"
                        size={20}
                        style={{fontWeight: 'bold'}}
                        color={colors.light_green}
                      />
                    </AkView>
                  </AkView>
                </Col>
              </AkView>
            );
          }}
        />
      ) : (
        <AkView style={{height: '50%', alignItems: 'center', justifyContent: 'center'}}>
          <AkText style={{fontSize: 20, color: colors.black}}>
            No {t('loyalty')} Available
          </AkText>
        </AkView>
      )}
    </SafeAreaView>
  );
}
