import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useSong = ({data, index}) => {

    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);
    const [song, setSong] = useFetch(null);

    useEffect(() => {
        setSong(data[index]);
        setPrev(data[index]);
        if(index+1 === data.length){
            setNext(data[0]);
        }
        else {
            setNext(data[index+1]);
        }
    }, [data]);

    return [song, prev, next];
}