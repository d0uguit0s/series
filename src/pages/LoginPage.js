import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            mail: '',
            password: '',
        }
    }

    onCHangeHandler(field, value) {
        // ANTIGO
        // const newState = {};
        // newState[field] = value;
        // this.setState(newState);

        // NOVO
        this.setState({
            [field]: value
        });
    }

    tryLogin() {
        console.log(this.state);
    }

    render(){
        return (
            <View style={styles.container}>
                <FormRow first >
                    <TextInput
                        style={styles.input}
                        placeholder='user_exemplo@email.com'
                        value={this.state.mail}
                        onChangeText={value => this.onCHangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        style={styles.input}
                        placeholder='**************'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onCHangeHandler('password', value)}
                    />
                </FormRow>

                <Button
                    title='Entrar'
                    onPress={() => this.tryLogin()}    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    input: {
        paddingHorizontal: 5,
    },
})