import { useState,useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from './firebase-config';
import { Button, FormControl, InputLabel, TextField} from "@mui/material";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

export default function SignUp(){
    let location = useLocation();
   let navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [pageShown,setPageShown] = useState(true);
    const [snackbar,setSnackbar] = useState(location.state.showSnackBar)
    useEffect(()=>{
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser){
          setUser(auth.currentUser.email)
        }
        else {
          console.log('no user')
        }
      })
    },[])
    const handleClose = (event,reason) => {
      if (reason=='clickaway') {
        return;
      }
    }
    function loginPage(){
      return (
        <div>
          
          <FormControl style={{backgroundColor:'white',width:'30vw'}}>
            <h1>Login</h1>
            <TextField id="email-login"
              label="Email..."
              style={{width:'80%',marginLeft:'auto',marginRight:'auto',marginTop:'5vh'}}
            />
            <TextField id="password-login"
            label="Password..."
            style={{width:'80%',marginLeft:'auto',marginRight:'auto',marginTop:'5vh'}}
            />
            <Button onClick={login} style={{marginTop:'5vh',width:'80%',marginLeft:'auto',marginRight:'auto'}} variant="contained">Log In</Button>
      <Button onClick={()=>{setPageShown(false)}}>Need a new account?</Button>
      </FormControl>
      <Snackbar
            open={snackbar}
            autoHideDuration={200}
            onClose={handleClose}
            message="Sign out successful"
          ></Snackbar>
      </div>
      )
    }

    function signUpPage(){
      return (
        <div>
          <FormControl style={{backgroundColor:'white',width:'30vw'}}>
            <h1 style={{color:'black',fontfamily:'monospace'}}>Sign Up</h1>
            <TextField id="email-register"
              label="Email..."
              style={{width:'80%',marginLeft:'auto',marginRight:'auto',marginTop:'5vh'}}
            />
            <TextField id="password-register"
              label="Password..."
              style={{width:'80%',marginLeft:'auto',marginRight:'auto',marginTop:'5vh'}}
              />
            <Button onClick={register} style={{marginTop:'5vh',width:'80%',marginLeft:'auto',marginRight:'auto'}} variant="contained"> Create User</Button>
            <Button onClick={()=>{setPageShown(true)}}>Login?</Button>
          </FormControl>
      </div>
      )
    }


    const register = async() => {
        try {
            const user = await createUserWithEmailAndPassword(auth, document.getElementById('email-register').value, document.getElementById('password-register').value)
            console.log(user)
        }
        catch(error) {
            console.log(error.message)
        }
    }
    
    const login = async() => {
        try {
            const user = await signInWithEmailAndPassword(
              auth,
              document.getElementById('email-login').value,
              document.getElementById('password-login').value
            )
            navigate('/')
          } catch (error) {
            console.log(error.message);
          }
    }
  
    const logout = async() => {
        await signOut(auth)
        navigate('/')
    }
    return (
        pageShown ? (
          loginPage()
        ):(
          signUpPage()
        )
      )
    {/*
      state? (
        signOut(auth).then(()=>{
          <h1> User signed out successful</h1>
        }
        )
      ):(*/}
}