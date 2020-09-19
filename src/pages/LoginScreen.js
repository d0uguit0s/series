import React from 'react';
import { View, Text, TextInput } from 'react-native';

import FormRow from '../components/FormRow'

export default function LoginScreen() {
    return (
        <View>
            <FormRow>
                <TextInput />
            </FormRow>
            <FormRow>
                <TextInput />
            </FormRow>
        </View>
    );
}