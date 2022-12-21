// import { useCookies } from 'react-cookie';
// import AppReducer from './AppReducer';
// import React,{useState,useEffect,createContext,useReducer} from 'react';


//   const initialState = {
//     ingelogd : false
//  }
 
//  export const GlobalContext = createContext(initialState);
 
//  export const GlobalProvider = ({ children }) => {
//     const [state] = useReducer(AppReducer, initialState);
 

//     const [authenticated, setAuthenticated] = useState(false);
//     //const [user, setUser] = React.useState(undefined);
//     const [cookies] = useCookies(['XSRF-TOKEN']);  

//     useEffect(() => {
//       fetch('/login/getUser', { credentials: 'include' })
//         .then(response => response.text())
//         .then(body => {
//           if (body === '') {
//             setAuthenticated(false);
//             ingelogd = false;
//           } else {
//             //setUser(JSON.parse(body));
//             setAuthenticated(true);
//             ingelogd = true;
//           }
//         });
//     }, [setAuthenticated/*, setUser*/])


//     //login functie. 
//     const login = () => {
//         let port = (window.location.port ? ':' + window.location.port : '');
//         if (port === ':3000') {
//           port = ':8081';
//         }
//         window.location.href = `//${window.location.hostname}${port}/private`;
//       }
    
//       //logout functie
//       const logout = () => {
//         fetch('/login/logout', {
//           method: 'POST', credentials: 'include',
//           headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
//         })
//           .then(res => res.json())
//           .then(response => {
//             window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
//               + `&post_logout_redirect_uri=${window.location.origin}`;
//           });
//       }
 
//     return(
//        <GlobalContext.Provider value = {{ingelogd : state.ingelogd, login,logout}}> 
//          {children} 
//     </GlobalContext.Provider>
//     )
//  }