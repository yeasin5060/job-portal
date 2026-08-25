import {createContext, useContext , useState , useEffect} from 'react'

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
}


export const AuthProvider = ({children}) => {
  const [user , setUser] = useState(null);
  const [loading , setLoding] = useState(true);
  const [isAuthenticated , setIsAuthenticated] = useState(false);

  useEffect (() => {
    checkAuthStatus();
  },[]);

  const checkAuthStatus = async () => {};
  const login = (userData , token) => {};
  const logout = () => {};
  const updateUser = (updateUserData) => {};

  const value = {
    user , loading , isAuthenticated , login , logout, updateUser, checkAuthStatus
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
