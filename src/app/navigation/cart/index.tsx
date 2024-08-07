import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CartScreen,
  CheckoutScreen,
  PaymentMethodScreen
} from '@src/app/screens';
import * as React from 'react';


import Route from '../routes';


export type CartStackParamList = {
  [Route.CART_SCREEN]: undefined;
  [Route.CART_CHECKOUT_SCREEN]: undefined;
  [Route.CART_PAYMENT_METHOD_SCREEN]: undefined;
};

const Cart = createNativeStackNavigator<CartStackParamList>(); //Instead of this const Stack = createNativeStackNavigator(); by typescript

const CartNavigator = ({ }) => (
  <>
    <Cart.Navigator initialRouteName={Route.CART_SCREEN}>
      <Cart.Screen
        name={Route.CART_SCREEN}
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Cart.Screen
        name={Route.CART_CHECKOUT_SCREEN}
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
      <Cart.Screen
        name={Route.CART_PAYMENT_METHOD_SCREEN}
        component={PaymentMethodScreen}
        options={{ headerShown: false }}
      />
    </Cart.Navigator>
  </>
);

export default CartNavigator;
