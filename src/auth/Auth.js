import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            {isLogin ? (
                <LoginForm changeForm={changeForm} />
            ) : (
                 <RegisterForm changeForm={changeForm} />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
});