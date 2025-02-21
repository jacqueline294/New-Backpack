import React from 'react';
import { Button, View, Text} from 'react-native';
import Room from './Room';
import UsageStats from './UsageStats';
import Dashboard from './Dashboard';
import AppUsageStats from './AppUsageStats';

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Huvudmeny</Text>
            <Button
                title="Registrerings val"
                onPress={() => navigation.navigate('TestPg')}
            />

            <Button
                title="Room"
                onPress={() => navigation.navigate('Room')}
            />
            <UsageStats></UsageStats>
            <AppUsageStats></AppUsageStats>
            {/* <Dashboard></Dashboard> */}
            {/* <Room></Room>  */}
        </View>
        
    )
}

export default HomeScreen;