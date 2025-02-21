import React from 'react';
import { Button, View, Text} from 'react-native';
import Room from './Room';
import UsageStats from './UsageStats';
import Dashboard from './Dashboard';

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Huvudmeny</Text>
           {/*  <Button
                title="Registrerings val"
                onPress={() => navigation.navigate('TestPg')}
            />

            <Button
                title="Room"
                onPress={() => navigation.navigate('Room')}
            /> */}
            <UsageStats></UsageStats>
            {/* <Dashboard></Dashboard> */}
            {/* <Room></Room>  */}
        </View>
        
    )
}

export default HomeScreen;