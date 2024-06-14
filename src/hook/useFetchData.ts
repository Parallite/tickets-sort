import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchData = <TypeResponse>(url: string, params?: AxiosRequestConfig) => {
    const [data, setData] = useState<TypeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<TypeResponse> = await axios.get(url, params);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error getting the data");
                setLoading(false);
            }
        };

        fetchData();
    }, [url, params]);

    return { data, loading, error };
};