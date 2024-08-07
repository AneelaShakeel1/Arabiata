import {useRef} from 'react';
import {TextInputProps} from 'react-native';
import AkInput from './AkInput';
import debounce from 'lodash/debounce';

interface IControlledInputProps extends TextInputProps {
  error?: string;
  name: string;
}

export function AkControlledInput({error, name, ...props}: IControlledInputProps) {
  const delayedQuery = useRef(
    debounce((value: string) => {
      props.onChangeText?.(value);
    }, 500),
  ).current;

  function handleChange(value: string) {
    if (!value) return;
    // delay function
    delayedQuery(value);
  }
  return <AkInput {...props} name={name} onChangeText={handleChange} />;
}
