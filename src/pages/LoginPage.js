import React from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
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
        this.setState({ isLoading: true })
        const { mail, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(user => {
                console.log('Usuário autenticado!', user);
            })
            .catch(error => {
                console.log('Usuário NÂO encontrado', error);
            })
            .then(() => this.setState({ isLoading: false }));
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