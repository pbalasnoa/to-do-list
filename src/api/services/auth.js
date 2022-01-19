import { auth, db, googleAuth } from "./firebase";

export const createUser = (email, password, callback) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      const success = "ok";
      callback({ success });
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
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      callback({ errorCode });
    });
};

export const loginGoogle = (callback) => {
  auth
    .signInWithPopup(googleAuth)
    .then((res) => {
      const { additionalUserInfo, user } = res;

      if (additionalUserInfo.isNewUser)
        db.collection("users").doc(user.uid).set({
          avatar: user.photoURL,
        });

      const success = "ok";
      callback({
        success,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      callback({
        errorCode,
      });
    });
};

export const login = (email, password, callback) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const success = "ok";
      callback({
        success,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      callback({
        errorCode,
      });
    });
};

export const logOut = () => {
  auth.signOut();
};

export const watcherUser = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      if (user.providerData[0].providerId) {
        callback({
          id: user.uid,
          email: user.email,
          avatar: user.photoURL,
        });
        return;
      }

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
      callback(null);
    }
  });
};

export const getProfileAvatar = (userId, image) => {
  db.collection("users").doc(userId).update({
    avatar: image,
  });
};
