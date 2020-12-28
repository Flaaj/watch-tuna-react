import React, {useState} from "react";

const LandingScreen = ({user, setUser, firebase}) => {
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    };

    const logOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                // Sign-out successful.
            })
            .catch(function (error) {
                // An error happened.
            });
    };

    return !user ? (
        <div>
            <form action="">
                <h1>sign up</h1>
                <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                />
                <button onClick={(e) => signUp(signUpEmail, signUpPassword, e)}>
                    sign up
                </button>
            </form>

            <form action="">
                <h1>log in</h1>
                <input
                    type="email"
                    value={logInEmail}
                    onChange={(e) => setLogInEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={logInPassword}
                    onChange={(e) => setLogInPassword(e.target.value)}
                />
                <button onClick={(e) => logIn(logInEmail, logInPassword, e)}>
                    sign up
                </button>
            </form>
        </div>
    ) : (
        <div>
            <h2>welcome {user.email.split("@")[0]}</h2>
            <button onClick={logOut}>Log out</button>
        </div>
    );
};

export default LandingScreen;
