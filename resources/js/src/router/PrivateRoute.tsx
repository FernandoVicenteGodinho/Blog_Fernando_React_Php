import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateToken } from '../service/auth';


const PrivateRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await validateToken();
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Ou um componente de carregamento
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/blog" />;
};

export default PrivateRoute;
