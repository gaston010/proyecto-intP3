//Custom hook que permite reproducir una canción (MediaContext) obtenida del
//arreglo de canciones en el contexto SongsListContext a partir de un índice especificado
//por parámetro

import { useEffect, useContext } from "react";
// import useFetch from "./useFetch";
import { MediaContext } from "../../context/MediaContext";

const useSong = ({index}) => {

    const { mediaFileList, setMediaFile, setTitle, setDuration, setPrev, setNext } = useContext(MediaContext);
    const song = mediaFileList[index+1];
    useEffect(() => {
        setMediaFile(song.song_file);
        setTitle(song.title);
        setDuration(song.duration);
        setPrev(index);
        if(index+1 === data.length){
            setNext(0);
        }
        else {
            setNext(index+1);
        }
    }, [index]);
}

export default useSong;