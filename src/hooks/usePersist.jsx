import { useState, useEffect } from 'react'

export const usePersist = () => {

    // default is false
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist));
    }, [persist])

    return [persist, setPersist];
};
