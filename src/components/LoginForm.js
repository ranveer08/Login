import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common/Index';

class Loginform extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const {email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
            console.log(error);
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }
    
    onLoginFail() {
        this.setState({ error: "Authentication Failed", loading: false });

    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,  
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Image 
                        style={{ width: 100, height: 100, marginLeft: 140 }}
                        source={require('./common/Img/iconfinder_Login_73221.png')}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                    placeholder="user@gmail.com"
                    label="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                    secureTextEntry
                    placeholder="password"
                    label="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>


            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default Loginform;