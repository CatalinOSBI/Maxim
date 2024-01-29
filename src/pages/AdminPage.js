import React from 'react'
import { useAuth } from '../Components/Login/AuthContext';
import { Navigate} from 'react-router-dom';

function AdminPage() {

    const { UserRole } = useAuth()

    

    if (UserRole === 'admin') {
        return <div>AdminPage</div>;
    } else {
        // Use Redirect component to navigate to the "/loading" route
        return <Navigate to="/loading" />;
    }
}

export default AdminPage