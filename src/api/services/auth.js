import { auth } from "./firebase";
import { db } from "./firebase";

export const createUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return {
        data: db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            avatar: "",
          })
          .catch((err) => {
            console.error(err.menssage);
          }),
        status: "ok",
      };
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
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const data = doc.data();
          const avatar = data.avatar;
          callback({
            id: user.uid,
            email: user.email,
            avatar,
          });
        });
    } else {
      console.log("No hay usuario logueado");
      callback(null);
    }
  });
};

export const getProfileAvatar = (userId, image) => {
  db.collection("users").doc(userId).update({
    avatar: image,
  });
};
