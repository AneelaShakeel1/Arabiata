import { View, ViewProps } from "react-native";
import useAKTheme from "~/app/lib/hooks/useAKTheme";

export default function Row(props: ViewProps){
    const {viewStyles}= useAKTheme();
    return(
        <View {...props} style={[viewStyles.rowContainer, props.style]} />
    )
}