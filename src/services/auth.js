import { auth } from "./firebase";
import { db } from "./firebase";

export const createUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          nickName: "hola",
        })
        .catch((err) => {
          console.error(err.menssage);
        });
    })
    .catch((error) => {
      console.error(error.menssage);
    });
};

export const login = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // console.log(cred.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  auth.signOut();
};

export const watcherUser = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      callback({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
      // console.log(user);
    } else {
      console.log("No hay usuario logueado");
      callback(null);
    }
  });
};
