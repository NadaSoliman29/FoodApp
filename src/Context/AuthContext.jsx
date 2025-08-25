import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


 export let AuthContext = createContext(null);


 export function AuthContextProvider(props){
  const [loginData, setLoginData] = useState(null);


   const getLoginData =()=>{
  let encodedToken = localStorage.getItem("token");
  let decodedToken = jwtDecode(encodedToken);
  setLoginData(decodedToken);
}

useEffect(() => {
 if(localStorage.getItem("token"))
  getLoginData()

}, [])
return <AuthContext.Provider value={{getLoginData,loginData,setLoginData}}> {props.children}</AuthContext.Provider>

}