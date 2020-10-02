import React from 'react';
import { View, TextInput, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
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
        this.setState({ isLoading: true, message: '' })
        const { mail, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(user => {
                this.setState({ message: 'Sucesso!' });
                // console.log('Usuário autenticado!', user);
            })
            .catch(error => {
                this.setState({
                    message: this.getMessageByErrorCode(error.code)
                });
                // console.log('Usuário NÂO encontrado', error);
            })
            .then(() => this.setState({ isLoading: false }));
    }

    getMessageByErrorCode(errorCode) {
        /*
        auth/wrong-password
        auth/user-not-found
        auth/invalid-email
        */
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/invalid-email':
                return 'Email inválido';
            default:
                return 'Erro inesperado!';
        }
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator />;
        
        return (
            <Button
                title='Entrar'
                onPress={() => this.tryLogin()}    
            />
        )
    }

    renderMessage() {
        const { message } = this.state;
        if(!message)
            return null;
        
        return (
            <View>
                <Text>
                    { message }
                </Text>
            </View>
        )
    }

    render() {
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

                { this.renderButton() }
                { this.renderMessage() }
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