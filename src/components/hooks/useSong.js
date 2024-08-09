//Custom hook que permite reproducir una canción (MediaContext) obtenida del
//arreglo de canciones en el contexto SongsListContext a partir de un índice especificado
//por parámetro

import { useEffect, useState, useContext } from "react";
import useFetch from "./useFetch";
import { SongsListContext } from "../../context/SongsListContext";

const { songs } = useContext(SongsListContext);

const { setMediaFile, setTitle, setDuration, setPrev, setNext } = useContext(MediaContext);

const useSong = ({index}) => {
    const [song, setSong] = useState(null);
    const [file] = useFetch(null);

    useEffect(() => {
        setSong(songs[index]);
        file = useFetch(song.song_file);
        setMediaFile(file);
        setTitle(song.title);
        setDuration(song.duration);
        setPrev(index);
        if(index+1 === data.length){
            setNext(songs[0]);
        }
        else {
            setNext(index+1);
        }
    }, [index]);
}

export default useSong;