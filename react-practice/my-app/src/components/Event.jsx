// This is about handling events
import {useState} from "react";

function EventDemo() {
    const [message, setMessage] = useState("Nothing has been clicked yet.");

    const handleClick = () => {
        setMessage("You have just clicked a detonation button")
    }

    return(
        <>
            <h2>{message}</h2>
            <button onClick={handleClick}>Boom💥</button>
        </>
    )
}

export default EventDemo;