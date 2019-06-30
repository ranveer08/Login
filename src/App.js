import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common/Index';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB6RQ2-r0r0WScy5f3_FZqSOlcZYbeST5I',
            authDomain: 'auth-27e41.firebaseapp.com',
            databaseURL: 'https://auth-27e41.firebaseio.com',
            projectId: 'auth-27e41',
            storageBucket: '',
            messagingSenderId: '77020851263',
            appId: '1:77020851263:web:0d895ecab66fffab'
          });
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({ loggedIn: true });
              }else {
                  this.setState({ loggedIn: false});
              }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>;
            case false:
                return <LoginForm />;
            default:
                return <CardSection>
                            <Spinner size="large" />     
                       </CardSection>;
        }
    }

    render () {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;