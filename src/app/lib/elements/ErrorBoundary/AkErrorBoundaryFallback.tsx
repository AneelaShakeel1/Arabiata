import {useEffect} from 'react';
import {Text} from 'react-native';

type TProps = {
  error: Error;
  componentStack: string;
  eventId: string;
  resetError(): void;
};

const TIME_OUT_DURATION = 3000;

export default function AkErrorBoundaryFallback(props: TProps) {
  // setTimeout(() => props.resetError(), TIME_OUT_DURATION);
  return <Text>An error has occurred. app will restart shortly</Text>;
}
