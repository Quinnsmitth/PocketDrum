import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';

export default function App() {
    const { height, width } = useWindowDimensions();

    return (
        <View style={styles.screen}>
            <Text style={styles.header}>PocketDrum</Text>

            {/* Start a new beat */}
            <View
                style={[
                    styles.topBox,
                    {
                        height: height * 0.22,
                        width: width * 0.92,
                    },
                ]}
            >
                <Text style={styles.c_text_top_box_header}>
                    Start with a simple beat
                </Text>

                <Text style={styles.c_text_top_box_body}>
                    Pick a sound, tap the steps you want to hear, and press play.
                </Text>

                <View style={styles.topBox_button}>
                    <Text>+ Create new beat</Text>
                </View>
            </View>

            {/* Load recent beats */}
            <View
                style={[
                    styles.middleBox,
                    {
                        height: height * 0.35,
                        width: width * 0.92,
                    },
                ]}
            >
                <Text style={styles.c_text}>Load Recent</Text>
            </View>

            {/* View saved patterns */}
            <View
                style={[
                    styles.bottomBox,
                    {
                        height: height * 0.08,
                        width: width * 0.92,
                    },
                ]}
            >
                <Text style={styles.c_text_bottom}>
                    View saved patterns
                </Text>
            </View>

            {/* Bottom navigation bar */}
            <View style={styles.nav} />
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'white',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderColor: 'grey',
        borderWidth: 2,
    },

    header: {
        fontSize: 35,
        marginBottom: 30,
    },

    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 75,
        alignItems: 'center',
        gap: 12,
    },

    topBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        padding: 12,
    },

    topBox_button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 10,
    },

    middleBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },

    c_text: {
        textAlign: 'center',
        color: 'black',
    },

    c_text_bottom: {
        color: 'black',
        fontSize: 16,
    },

    c_text_top_box_header: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    c_text_top_box_body: {
        color: 'grey',
        marginTop: 5,
    },
});
