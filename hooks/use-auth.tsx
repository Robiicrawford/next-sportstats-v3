import React, { useState, useEffect, useContext, createContext } from "react";
import {Amplify, Auth } from 'aws-amplify';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { useRouter } from 'next/router'

import LoginContent from '../components/auth/LoginContent';

import { 
  Container
} from '@chakra-ui/react'

import aws_exports from '../aws-exports'
Amplify.configure({...aws_exports, ssr: true});


type AuthContextType = {
    auth?: any,
    error?: any,
    signin?: any,
    signout?: any,
    user?: any
}

const authContext = createContext<AuthContextType>({});

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth =  () => {
  return useContext(authContext);
};



export const AuthCheck = ({ children }) => {
  const router = useRouter()

  const { route } = useAuthenticator((context) => [context.route]);

  if(route === 'idle') {
    return <>'..loading..'</>
  }
  return (
    <>
      {route === 'authenticated' ? <> {children} </> : <Container className='card'> <LoginContent style={{flexGrow:'1'}} /> </Container> }
    </>
  );

 //  router.push('/sign-in')

}


// Provider hook that creates auth object and handles state
const useProvideAuth =  () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

 

 const getUser = async ()  => {
 	var unsubscribe = await Auth.currentUserInfo()
  if(unsubscribe){
    setUser(unsubscribe)
    setLoading(false)
  } else {
    setUser(false)
    setLoading(false)
  }
 	
  
 }

  const signout = async ()  => {
    return Auth
      .signOut()
      .then(() => {
        setUser(false);
        setLoading(null)
        router.push('/')
      });
  };

 
  const signin = async (email, password)  => {

    Auth.configure({authenticationFlowType:'USER_SRP_AUTH'});
    try {
      const user2 = await Auth.signIn(email.trim(), password.trim());
      if(user2) {
        setUser(user2);
        return user2
      } 
    }catch (error) {
      try {
        Auth.configure({authenticationFlowType:'USER_PASSWORD_AUTH'});
        const user = await Auth.signIn(email.trim(), password.trim());
        if(user) {
          Auth.configure({authenticationFlowType:'USER_SRP_AUTH'});
          const user3 = await Auth.signIn(email.trim(), password.trim());
          if(user3) {
            setUser(user3);
            return user3
          }
        }
      } catch (error) { 
        setError(error.code)
        console.log('error signing in', error);
      }
    }

  };


    {/*

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };
  
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };
*/}
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = getUser()
   // setUser(unsubscribe)
    getUser()
  //  setLoading(false)
    // Cleanup subscription on unmount
    return () => unsubscribe;
  }, []);
  // Return the user object and auth methods

  return {
    isLoading,
    user,
    error,
    signin,
 //   signup,
    signout,
 //   sendPasswordResetEmail,
 //   confirmPasswordReset,
  };
}

type AuthTypes = {
  error: any,
  signin: any,
  signout: any,
  user: any
}

type error = {
  [key: string]: any; // 👈️ variable key
};

type signin = {
  [key: string]: any; // 👈️ variable key
};

type signout = {
  [key: string]: any; // 👈️ variable key
};

type user = {
  [key: string]: any; // 👈️ variable key
};