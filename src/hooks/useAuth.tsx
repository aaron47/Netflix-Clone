import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import Router, { useRouter } from "next/router";
import {auth} from "../../firebase";


interface IAuth {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>; 
  logOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // * Logged in...
        setUser(user);
        setLoading(false);
      } else {
        // * Not Logged In...
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoading(false);
    }),
    [auth];
  })


  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      router.push("/");
      setLoading(false);
    }).catch((error) => {
      console.error(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }


  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      router.push("/");
      setLoading(false);
    }).catch((error) => {
      console.error(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
    .then(() => {
      setUser(null);
      router.push("/");
      setLoading(false);
    }).catch((error) => {
      console.error(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }


  const memoedValue = useMemo(() => ({
    user,
    signUp,
    signIn,
    loading,
    logOut,
    error,
  }), [user, error]);

  return (
  <AuthContext.Provider value={memoedValue}>
    {!initialLoading && children}
  </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}