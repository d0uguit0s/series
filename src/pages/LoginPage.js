import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FormRow from '../components/FormRow'

export default function LoginPage({ navigation }) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
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
    });

    function tryLogin() {
        setIsLoading(true);
        setMessage('');

        const loginUserSuccess = user => {
            setMessage('Sucesso!');
            navigation.navigate('Main');
        }

        const loginUserFailed = error => {
            setMessage(getMessageByErrorCode(error.code));
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(loginUserSuccess)
            .catch(error => {
                if(error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [
                            {
                                text: 'Não',
                                onPress: () => {console.log('Usuário não quer criar conta')},
                                style: 'cancel', //funciona apenas para IOS
                            },
                            {
                                text: 'Sim',
                                onPress: () => {
                                    firebase.auth().createUserWithEmailAndPassword(mail, password)
                                    .then(loginUserSuccess)
                                    .catch(loginUserFailed);
                                },
                            },
                        ],
                        { cancelable: false }
                    )
                }else{
                    loginUserFailed(error)
                }
                // console.log('Usuário NÂO encontrado', error);
            })
            .then(setIsLoading(false))
    }

    function getMessageByErrorCode(errorCode) {
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

    function RenderButton() {
        if (isLoading){
            return <ActivityIndicator />
        }

        return (
            <Button
                title='Entrar'
                onPress={() => tryLogin()}    
            />
        )
    }

    function renderMessage() {
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

    return (
        <View style={styles.container}>
            <FormRow first >
                <TextInput
                    style={styles.input}
                    placeholder='user_exemplo@email.com'
                    value={mail}
                    onChangeText={value => setMail(value)}
                />
            </FormRow>
            <FormRow last>
                <TextInput
                    style={styles.input}
                    placeholder='**************'
                    secureTextEntry
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
            </FormRow>

            { RenderButton() }
            { renderMessage() }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    input: {
        paddingHorizontal: 5,
    },
})