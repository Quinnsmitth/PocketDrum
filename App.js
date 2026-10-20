import { Text, View, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function App (){
    return(
        <ScrollView style= {{backgroundColor:'white', 
                             flexDirection:'column'}}>

            <Text style={{textAlign:"center",
                          marginTop:200}}>This is the HomePage</Text>
                          
        </ScrollView>

    );}