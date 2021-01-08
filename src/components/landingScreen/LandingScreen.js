import React, { useState, useEffect } from "react";
import "./landingScreen.scss";

const LandingScreen = ({ user, setUser, firebase, setInitialized, notify }) => {
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [reload, setReload] = useState(false);
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
                notify("Welcome, new user!");
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
                e && notify("Logged in. Welcome! :)");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                notify("Ops! Wrong email or/and password.");
            });
    };

    const logOut = () => {
        setLogInEmail("");
        setLogInPassword("");
        setUser(undefined);
        firebase
            .auth()
            .signOut()
            .then(() => {
                notify("Logged out. See you later!");
                setInitialized(false);
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
                    <h1 className="landing-screen__heading">Sign in:</h1>
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
                        className="landing-screen__btn"
                    >
                        
                        Login
                    </button>
                    <span>Don't have an account yet? </span>
                    <button
                        onClick={() => {
                            setShowSignUpForm(true);
                        }}
                        className="landing-screen__btn"
                    >
                        Create new account
                    </button>
                </form>
            ) : (
                <form
                    action=""
                    className="landing-screen__form landing-screen__form--sign-up"
                >
                    <h1 className="landing-screen__heading">New account:</h1>
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
                        className="landing-screen__btn"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => {
                            setShowSignUpForm(false);
                        }}
                        className="landing-screen__btn"
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    ) : (
        <div className="landing-screen">
            <div className="row">
                <h2>
                    Logged in as{" "}
                    {user.username ? user.username : user.email.split("@")[0]}
                </h2>
                <button
                    onClick={logOut}
                    className="landing-screen__btn landing-screen__btn--logout"
                >
                    Log out
                </button>
            </div>
            <h3 className="landing-screen__heading">Tips and instructions:</h3>
            <ul className="landing-screen__tips">
                <li className="landing-screen__tip">
                    Try to find a spot where your watch makes the most audible
                    sounds and put your microphone close to this spot
                </li>
                <li className="landing-screen__tip">
                    Obviously, if you want to measure your watch's accuracy, you
                    need to find a silent place. Few sounds will not disturb the
                    measurement by much, but the less sounds the better.
                </li>
                <li className="landing-screen__tip">
                    Use a good microphone. Microphone with low quality will not
                    give satisfying results. Microphone with good quality will
                    provide an accuracy of +-15seconds
                </li>
                <li className="landing-screen__tip">
                    The results are not stable, with each detected tick they
                    will change, but the "correct" value will be the value that
                    displays most of the times.
                </li>
                <li className="landing-screen__tip">
                    The longer the measurement, the more accurate the results.
                    Although on some smartphones after 20-30 seconds microphone
                    loses some samples, making the measured tick distances
                    shorter and therefore making measurement highly incorrect.
                </li>
                <li className="landing-screen__tip">
                    If you don't know your watch's beat frequency, set it to
                    10Hz and look at resulting frequency. Then set the correct
                    one and measure again.
                </li>
                <li className="landing-screen__tip">
                    Some watches have balance wheel that sounds different when
                    contracting and relaxing. That makes it hard for algorithm
                    to measure tick speed. In this case it's good to set beat
                    frequency to half of the actual one (e.g. 3Hz instead of 6)
                </li>
            </ul>
        </div>
    );
};

export default LandingScreen;
