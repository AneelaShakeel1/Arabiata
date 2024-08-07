import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function AkCarousel(props: any) {
    const width = Dimensions.get('window').width;
    console.log(props)
    return (

        <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            // data={[...new Array(6).keys()]}
            data={props?.data}
            scrollAnimationDuration={1000}
            mode='parallax'
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item, index }) => {
                console.log(item, "yhn")
                return (<View
                    style={{
                        // flex: 1,
                        paddingHorizontal: 10,
                        // borderWidth: 1,
                        // justifyContent: 'center',
                    }}
                >
                    {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text> */}
                    <Image source={{ uri: item }} style={{ width: null, height: 180, borderRadius: 8 }} />
                </View>)
            }}
        />

    );
}

export default AkCarousel;