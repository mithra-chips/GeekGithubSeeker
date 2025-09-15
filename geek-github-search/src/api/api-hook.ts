import { useState } from "react";

export const useApiHook = () => {
    const [error, setError] = useState(null as any);
    const callApi = async (func: Promise<void>) => {
        try{
            await func;
        }catch(error){
            setError(error as any);
            throw error;
        }
    }

    return { callApi, error, clearError: () => setError(null) };
}