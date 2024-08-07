
import {ListItem} from '@rneui/themed';
import React, {useState} from 'react';
import epStyles from './epAccordion.styles';
import useAKTheme from '@lib/hooks/useAKTheme';
interface Props {
  data?: string;
  header?: string;
  children?: any;
  textStyle?: any;
}
const AkAccordion: React.FC<Props> = ({data, children, header, textStyle}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = useAKTheme();
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            {/* <ListItem.Title style={[styles.commonTextStyle, {...textStyle}]}> */}
            <ListItem.Title>
              {header}
            </ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}>
      {children}
    </ListItem.Accordion>
  );
};

export default AkAccordion;
