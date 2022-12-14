import React from 'react';
import './Signin.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

class Signin extends React.Component {
    constructor(props) { // To use props, set props in constructor
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isLoading: false
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        const { loadUser, onRouteChange } = this.props;
        this.setState({isLoading: true});
        fetch('https://whispering-spire-95505.herokuapp.com/signin', { 
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // It doesn't understand JavaScript, so change it to JSON 
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user)
                    onRouteChange('home'); // If I used 'onClick={onRouteChange('home')}' => when rendering it will be running.
                                         // However, by adding arrow function, It's going to get called the function when it get clicked
                    this.setState({isLoading: false});
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="login-form mv4 w-100 w-50-m w-25-l mw6">
                <div>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input 
                                placeholder='Email'
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" name="password" placeholder="Password" onChange={this.onPasswordChange} />
                        </div>
                    </div>
                    {this.state.isLoading 
                        ?
                            <LoadingSpinner />
                        :
                        <div className="action">
                            <button onClick={this.onSubmitSignIn}>Log in</button>
                            <button onClick={() => onRouteChange('register')}>Sign up</button>
                        </div>    
                    }
                </div>
            </div>
        )
    }
}

export default Signin;