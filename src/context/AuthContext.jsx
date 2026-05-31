import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {

          console.log(
            "FIREBASE USER:",
            firebaseUser
          );

          try {

            if (firebaseUser) {

              let role = "admin";

              try {

                const userRef = doc(
                  db,
                  "usuarios",
                  firebaseUser.uid
                );

                const userSnap =
                  await getDoc(userRef);

                if (userSnap.exists()) {

                  role =
                    userSnap.data().role;

                }

              } catch (err) {

                console.log(
                  "No se pudo leer rol"
                );

              }

              const userData = {

                uid: firebaseUser.uid,

                email: firebaseUser.email,

                role

              };

              console.log(
                "USER DATA:",
                userData
              );

              setUser(userData);

            } else {

              setUser(null);

            }

          } catch (error) {

            console.error(error);

          } finally {

            setLoading(false);

          }
        }
      );

    return () => unsubscribe();

  }, []);

  const logout = async () => {

    await signOut(auth);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export function useAuth() {

  return useContext(AuthContext);

}