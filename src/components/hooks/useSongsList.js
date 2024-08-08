import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useSongsList = ({url}) => {

    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const [result] = useFetch(url);

    useEffect(() => {
        setLoading(result.isLoading);
        setNext(result.data.next);
        setPrevious(result.data.previous);
    }, [result]);

    return [loading, next, previous, result];
}