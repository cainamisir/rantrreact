import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Container from "react-bootstrap/Container";
import ReactLoading from "react-loading";

const io = require("socket.io-client");

const ENDPOINT = "http://127.0.0.1:5000";

function App() {
    const [response, setResponse] = useState("");
    const [found, setFound] = useState(false);
    useEffect(() => {
        const socket = io(ENDPOINT, {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd",
            },
        });
        socket.on("chat begin", (data) => {
            setFound(true);
        });
        socket.on("matchdisconnect", (data) => {
            setFound(false);
        });
    }, []);

    return (
        <Container>
            {found === false ? (
                <>
                    <h1> We are matching you right now to another ranter</h1>
                    <ReactLoading
                        type={"balls"}
                        color={"blue"}
                        height={"20%"}
                        width={"50%"}
                    />
                </>
            ) : (
                <h1>Matched with a ranter</h1>
            )}
        </Container>
    );
}

export default App;
