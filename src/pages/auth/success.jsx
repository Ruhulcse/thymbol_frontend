import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthSuccess = () => {
    const navigate = useNavigate ();
    useEffect(() => {
        // Get the user data from the URL query parameters
        const params = new URLSearchParams(window.location.search);
        const user = params.get('user');
    
        if (user) {
          // Store the user data in local storage
          localStorage.setItem('user', user);
          // Redirect to the dashboard
          navigate('/dashboard');
        } else {
          // Redirect to login if no user data is found
          navigate('/login');
        }
      }, [navigate]);

    return <div>Loading...</div>;
};

export default AuthSuccess;