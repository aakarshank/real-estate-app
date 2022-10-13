import { onAuthStateChanged, signOut } from 'firebase/auth';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import {useState,useEffect} from 'react';

const auth = getAuth();

export default function NavBar(){
    const [user,setUser] = useState(null);
    let navigate=useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser) => {
          if (currentUser){
            setUser(currentUser)
          }
          else {
            console.log('no user')
          }
        })
      },[])
    return (
        <Navbar style={{backgroundColor:'#1D1B26',fontFamily:'sans-serif',fontWeight:500}} sticky='top' className='Navbar'>
            <Nav>
                <Nav.Link style={{color:'white'}} onClick={()=>{
                    if (auth.currentUser){
                        console.log(auth.currentUser)
                        navigate('/db')
                    }
                    else {
                        console.log('no auth detected')
                        navigate('/signIn',{state:{userLoggedIn:false}})
                    }
                    //Auth.login(()=>navigate('/db'))
                    }}>View Properties</Nav.Link>
                {user?(
                    <Nav.Link style={{color:'white'}} onClick={()=>{signOut(auth).then(()=>{navigate('/signIn',{state:{userLoggedIn:false,showSnackBar:true}})})}}>Sign Out {auth.currentUser?auth.currentUser.email:null}</Nav.Link>
                ):(
                    <Nav.Link style={{color:'white'}} onClick={()=>{navigate('/signIn',{state:{userLoggedIn:false,showSnackBar:false}})}}>Sign In</Nav.Link>
                )}
            </Nav>
        </Navbar>
    )
}   