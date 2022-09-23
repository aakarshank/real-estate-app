import {Navigate} from 'react-router-dom';

import Auth from './Auth';
import Database from './Database'; 


export default function ProtectedDatabaseRoute(){
    return Auth.isAuthenticated() ? <Database /> : <Navigate to = '/' />
}