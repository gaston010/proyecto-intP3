import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useSongsList = ({url}) => {

    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        result = useFetch(url);
        if(!result.isError){
            setLoading(result.isLoading);
            setNext(result.data.next);
            setPrevious(result.data.previous);
            setCurrent(result.data);
        } else {
            setLoading(false);
            setNext(null);
            setPrevious(null);
            setCurrent(null);
        }
        
    }, [url]);

    return { loading, previous, next, current };
}