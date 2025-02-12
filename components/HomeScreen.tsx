import { Button, View, Text} from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Man kan inte!</Text>
            <Button
            title="Man kan alltid"
            onPress={() => navigation.navigate('TestPg')}
        />
        </View>
        
    )
}

export default HomeScreen;