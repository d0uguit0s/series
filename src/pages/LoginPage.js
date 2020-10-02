import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            mail: '',
            password: '',
        }
    }

    componentDidMount() {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyB0GJuEIAA9QIvFfggtr_3xHMuqEQUSgxw",
            authDomain: "series-9ce76.firebaseapp.com",
            databaseURL: "https://series-9ce76.firebaseio.com",
            projectId: "series-9ce76",
            storageBucket: "series-9ce76.appspot.com",
            messagingSenderId: "187647241475",
            appId: "1:187647241475:web:e590c2965a68cbf78d8d36"
        };
        // Initialize Firebase
        if(firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.
            auth()
            .signInWithEmailAndPassword('teste@mail.com', '123123')
            .then(user => {
                console.log('Usuário autenticado!', user);
            })
            .catch(error => {
                console.log('Usuário NÂO encontrado', error);
            }
            );
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