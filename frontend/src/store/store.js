import { create } from 'zustand';

const API_BASE_URL = "https://agomoni-2k25-backend.onrender.com"; // Consider renaming to something more descriptive

export const useStore = create((set) => ({
    user: [],

    getFoodCount: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Add authorization header if using it
                    // "Authorization": `Bearer ${token}`
                },
                credentials: "include",
            });

            // Check if response is OK (status 200-299)
            if (!response.ok) {
                const errorData = await response.text(); // Try to read error response
                throw new Error(`Server responded with status ${response.status}: ${errorData}`);
            }

            const data = await response.json();

            return {
                success: true,
                message: "Food count fetched",
                data: data,
            }
        } catch (error) {
            console.error('Error fetching food count:', error);
            return {
                success: false,
                message: error.message || 'Failed to fetch food count'
            };
        }
    },

    findStudentID: async (stdData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/students/findstudents`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(stdData),
                credentials: "include"
            })
            const data = await response.json();

            return {
                success: data.success,
                message: data.message,
                data: data.data
            }
        } catch (error) {
            console.log('Error finding student ID:', error);
            return {
                message: 'Failed to find student ID',
                success: false,
                data: null
            }
        }
    },

    createUser: async (users) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/students`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(users),
                credentials: "include"
            })
            const data = await response.json();
            if (response.ok) {
                set((state) => (
                    { user: [...state.user, data.data] }
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
                success: false,
                message: 'Failed to create user'
            };
        }
    },

    validateAdmin: async (adminData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/validate`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(adminData),
                credentials: "include"
            })
            const data = await response.json();
            return {
                success: data.success,
                message: data.message,
            }
        } catch (error) {
            console.error('Error validating admin:', error);
            return {
                success: false,
                message: 'Failed to validate admin'
            };
        }
    },

    adminLogin: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/adminLogin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await response.json();
            return {
                success: data.success,
                message: data.message,
            }
        } catch (error) {
            console.error('Error logging in admin:', error);
            return {
                success: false,
                message: 'Failed to log in admin'
            };
        }
    },

    FindStudentsByID: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/students/studentData`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ id }),
                credentials: "include"
            })
            const data = await response.json();
            return {
                success: data.success,
                message: data.message,
                data: data.data
            }
        } catch (error) {
            console.error('Error finding student by ID:', error);
            return {
                success: false,
                message: 'Failed to find student by ID'
            };
        }
    }
}))