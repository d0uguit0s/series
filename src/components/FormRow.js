import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FormRow(props) {
    const { children } = props;
    return(
        <View style={styles.container}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        elevation: 1,
    }
})