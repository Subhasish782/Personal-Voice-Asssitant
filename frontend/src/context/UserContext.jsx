import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
    const [userData, setUserData] = useState(null);
    const [backendImage,setBackendImage]=useState(null);
    const [frontendImage,setFrontendImage]=useState(null);
    const [selectedImage,setSelectedImage]=useState(null);

    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
            setUserData(result.data);
            console.log(result.data);
        } catch (error) {
            console.error("Error fetching current user:", error.response?.data || error.message);
            // Don't set userData to null on network errors, only on auth errors
            if (error.response?.status === 401 || error.response?.status === 403) {
                setUserData(null);
            }
        }
    };

    const getGeminiResponse=async (command)=>{
      try {
        const result=await axios.post(
            `${serverUrl}/api/user/asktoassistant`,
            {command},
            {withCredentials:true}
        )
        return result.data
      } catch (error) {
        console.error("Error getting Gemini response:", error.response?.data || error.message);
        return { response: "Sorry, I'm having trouble connecting right now. Please try again." };
      }
    }

    useEffect(() => {
        handleCurrentUser();
    }, []);

    const value = {
        serverUrl,
        userData,
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse
    };

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}



export default UserContext;

