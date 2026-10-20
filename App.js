import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';

export default function App() {
    const { height, width } = useWindowDimensions();

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>PocketDrum</Text>
            <View style={[styles.topBox, { height: height * 0.15, width: width * 0.92 }]}>
                <Text style={styles.c_text}>New</Text>
            </View>

            <View style={[styles.middleBox, { height: height * 0.30, width: width * 0.92 }]}>
                <Text style={styles.c_text}>Load Recent</Text>
            </View>

            <View style={[styles.bottomBox, { height: height * 0.15, width: width * 0.92 }]}>
                <Text style={styles.c_text}>Saved</Text>
            </View>

            <View style={styles.nav}></View>

        </View>
    );
}

const styles = StyleSheet.create({
    nav: {

    backgroundColor: 'black',
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0},

    header:{
        fontSize:35,
        marginBottom:30
    },
    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 75,
        alignItems: 'center',
        gap: 12,
    },

    topBox: {
        backgroundColor: 'black',
        borderRadius: 20,
    },

    middleBox: {
        backgroundColor: 'black',
        borderRadius: 20,
    },

    bottomBox: {
        backgroundColor: 'black',
        borderRadius: 20,
    },

    c_text: {
        textAlign: 'center',
        color: 'white',
    },
});