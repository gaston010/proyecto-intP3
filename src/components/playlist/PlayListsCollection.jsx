import { useContext } from "react"
import { SongsListContext } from "../../context/SongsListContext"

//Utilizo los setters proporcionados por el Context para cambiar el contenido de
//Cada lista de canciones por cada playlist seleccionada.
const { setSongs, setError, setNext, setPrevious} = useContext(SongsListContext);