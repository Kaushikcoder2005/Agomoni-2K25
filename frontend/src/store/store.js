import { data } from 'react-router-dom';
import { create } from 'zustand';

// set is responsible for updating the user state

export const useStore = create((set) => ({
    user: [],
    
    getFoodCount: async() => {
        try{
            const response = await fetch("http://localhost:8000",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
            const data = await response.json();
            console.log(data.foodCount);
            
            return{
                success:true,
                message: "Food count fetched",
                data: data.foodCount,
            }
            
        }
        catch(error) {
            console.error('Error fetching food count:', error);
            return {
                success: false,
                message: 'Failed to fetch food count'
            };
        }
    },

    createUser: async (users) => {
        if (!users.name || !users.college_roll || !users.year || !users.sem) {
            return {
                success: false,
                message: 'All fields are required'
            }
        }
        try {

            const response = await fetch("http://localhost:8000/students", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(users)
            })
            const data = await response.json();
            if (response.ok) {
                set((state)=>(
                     {user: [...state.user, data.data]}
                ))
            }
            return {
                success: data.success,
                message: data.message,
                data: data.data
            };
        } catch (error) {
            console.error('Error creating user:', error);
            return {
                success: data.success || false,
                message: 'Failed to create user'
            };

        }

    }
}))

export default useStore;