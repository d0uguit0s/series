import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/pages/LoginPage'

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Login'
				// Definições default para todas as telas
				screenOptions={
					{
						title: 'Series!',
						headerStyle: {
							backgroundColor: '#6ca2f7',
							borderBottomWidth: 1,
							borderBottomColor: '#c5c5c5'
						},
						headerTitleStyle: {
							color: '#fff',
							fontSize: 30,
						},
						headerTitleAlign: 'center',
						headerTintColor: '#fff',
					}
				}
			>
				<Stack.Screen
					name="Login"
					component={LoginPage}
					// Definições especificas de uma tela, sobrescreve definições default da 'screenOptions'
					options={
						{
							title: 'Bem Vindo!',
						}
					}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
