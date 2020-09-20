import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function FormRow(props) {
    const { children, first, last } = props;
    return(
        <View style={[
            styles.container,
            first ? styles.first : null,
            last ? styles.last : null
        ]}>
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
    },
    first: {
        marginTop: 10,
    },
    last: {
        marginBottom: 10,
    }
})