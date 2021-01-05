import React, { useState, useEffect } from "react";
import "./landingScreen.scss";

const LandingScreen = ({ user, setUser, firebase, setInitialized }) => {
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [reload, setReload] = useState(false)
    const signUp = (email, password, e) => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firebase
                    .database()
                    .ref("users/" + user.user.uid)
                    .set({
                        email,
                        uid: user.user.uid,
                        watches: [],
                    });
                logIn(email, password);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const [logInEmail, setLogInEmail] = useState("");
    const [logInPassword, setLogInPassword] = useState("");
    const logIn = (email, password, e) => {
        e && e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUser(user.user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const logOut = () => {
        setLogInEmail("")
        setLogInPassword("")
        setUser(undefined)
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("signed out")
                setInitialized(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return !user ? (
        <div className="landing-screen">
            {!showSignUpForm ? (
                <form
                    action=""
                    className="landing-screen__form landing-screen__form--log-in"
                >
                    <h1>log in</h1>
                    <input
                        type="email"
                        value={logInEmail}
                        onChange={(e) => setLogInEmail(e.target.value)}
                        placeholder="E-mail address"
                    />
                    <input
                        type="password"
                        value={logInPassword}
                        onChange={(e) => setLogInPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        onClick={(e) => logIn(logInEmail, logInPassword, e)}
                    >
                        Log in
                    </button>
                    <span>Don't have an account yet? </span>
                    <button
                        onClick={() => {
                            setShowSignUpForm(true);
                        }}
                    >
                        Create new account
                    </button>
                </form>
            ) : (
                <form
                    action=""
                    className="landing-screen__form landing-screen__form--sign-up"
                >
                    <h1>New account</h1>
                    <input
                        type="email"
                        id="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="E-mail address"
                    />
                    <input
                        type="password"
                        id="password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        onClick={(e) => signUp(signUpEmail, signUpPassword, e)}
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    ) : (
        <div>
            <h2>welcome {user.username ? user.username : user.email.split("@")[0]}</h2>
            <button onClick={logOut}>Log out</button>
        </div>
    );
};

export default LandingScreen;
