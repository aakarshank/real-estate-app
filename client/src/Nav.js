import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
export default function NavBar(){
    const navigate=useNavigate();
    return (
        <Navbar bg="dark">
            <Nav>
                <Nav.Link style={{color:'white'}} onClick={()=>Auth.login(()=>navigate('/db'))}>View Properties</Nav.Link>
            </Nav>
        </Navbar>
    )
}   