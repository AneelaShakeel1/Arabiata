import { View, ViewProps } from "react-native";
import useAKTheme from "~/app/lib/hooks/useAKTheme";

export default function Col(props: ViewProps){
    const {viewStyles}= useAKTheme();
    return(
        <View {...props} style={[viewStyles.columnContainer, props.style]} />
    )
}