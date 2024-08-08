import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useSongsList = ({url}) => {

    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [current, setCurrent] = useState(null);

    const [result] = useFetch(url);

    useEffect(() => {
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
        
    }, [result]);

    return [loading, previous, next, result];
}