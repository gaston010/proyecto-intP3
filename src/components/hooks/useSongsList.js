import { useEffect, useContext } from "react";
import { SongsListContext } from "../../context/SongsListContext";

const useSongsList = ({data}) => {

    const { setCurrPage, setLoading, setNextPage, setPrevPage } = useContext(SongsListContext);

    useEffect(() => {
        if(!data.isError){
            setLoading(data.isLoading);
            setNextPage(data.next);
            setPrevPage(data.previous);
            setCurrPage(data.data);
        } else {
            setLoading(false);
            setNextPage(null);
            setPrevPage(null);
            setCurrPage(null);
        }
        
    }, [data]);

};

export default useSongsList;