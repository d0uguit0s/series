import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    render(){
        return (
            <View>
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder='user_exemplo@email.com'
                    />
                </FormRow>
                <FormRow>
                    <TextInput
                        style={styles.input}
                        placeholder='**************'
                        secureTextEntry
                    />
                </FormRow>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 5,
    }
})