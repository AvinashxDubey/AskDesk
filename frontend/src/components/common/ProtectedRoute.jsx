import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const token = useAuth();
    
    if(!token){
        <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute