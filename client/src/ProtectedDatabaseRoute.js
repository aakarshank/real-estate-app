import {Navigate} from 'react-router-dom';

import {getAuth} from "firebase/auth";


import Database from './Database'; 

const auth = getAuth();

export default function ProtectedDatabaseRoute(){
    return auth.currentUser ? <Database /> : <Navigate to = '/signIn' />
}