import React from 'react';
import { Button, View, Text} from 'react-native';
import Room from './Room';

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
            {/* <Room></Room>  */}
        </View>
        
    )
}

export default HomeScreen;