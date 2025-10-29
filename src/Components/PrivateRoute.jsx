import  { use } from 'react';

import { Navigate } from 'react-router';

import { AuthContext } from '../Provider/AuthProvider';
import Loading from './Loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){

        return children
    }
    return <Navigate to="/Login"></Navigate>
          
          
      
    
};

export default PrivateRoute;