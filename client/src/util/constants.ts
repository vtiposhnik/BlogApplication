export const API_URL = 'http://localhost:3307/api';

interface AuthFetchProps {
    formData: object,
    method: string,
    auth: string
}

export async function authFetch({ formData, method, auth }: AuthFetchProps) {
    try {
        const response = await fetch(`/api/auth/${auth}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
