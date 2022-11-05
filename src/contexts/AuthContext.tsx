import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps{
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true}),
    scopes: ['profile', 'email']
  })
  async function signIn() {
    try{
      setIsUserLoading(true);
      await promptAsync();

    } catch (error){
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(accessToken: string){
    try{
      const { data } = await api.post('/users', {
        access_token: accessToken
      })
      console.log(data)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      console.log(`Bearer ${data.token}`)
      const userInfoReponse = await api.get('/me')
      setUser(userInfoReponse.data.user)
    } catch (error){
      console.log(error)
      throw error;
    } finally{
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken){
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}