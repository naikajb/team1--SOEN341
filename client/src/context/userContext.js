import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    // initially no user, nobody's logged in
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (!user) {
            fetchUserProfile();
        }
    }, [user]);

    const logout = async () => {
        try {
            console.log('Attempting logout...');
            // Update the user state to null before making the logout request
            setUser(null);
            await axios.post('/api/logout');
            console.log('Logout successful');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}
    