import { Button, View, Text} from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Huvudmeny</Text>
            <Button
            title="Registrerings val"
            onPress={() => navigation.navigate('TestPg')}
        />
        </View>
        
    )
}

export default HomeScreen;