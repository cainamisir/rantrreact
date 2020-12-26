import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Container from "react-bootstrap/Container";
import ReactLoading from "react-loading";
import Chat from "./components/chat";
const io = require("socket.io-client");

const ENDPOINT = "http://127.0.0.1:5000";

function App() {
    const [response, setResponse] = useState("");
    const [found, setFound] = useState(false);
    const [socket, setSocket] = useState("");
    const [mySocket, setMySocket] = useState({});
    useEffect(() => {
        document.body.style = "background: #2e9e4;";

        if (found === false) {
            const socket = io(ENDPOINT, {
                withCredentials: true,
                extraHeaders: {
                    "my-custom-header": "abcd",
                },
            });
            setMySocket(socket);
            socket.on("chat begin", (data) => {
                setSocket(data);
                setFound(true);
            });
            socket.on("matchdisconnect", (data) => {
                setFound(false);
            });
        }
    }, []);

    return (
        <Container
            fluid
            style={{ backgroundColor: "#f2e9e4", height: "100vh" }}
        >
            <Container className="text-center mt-auto mb-auto">
                {found === false ? (
                    <>
                        <h1 style={{ fontSize: "2rem" }}>
                            {" "}
                            We are matching you right now to another ranter
                        </h1>
                        <ReactLoading
                            className="ml-auto mr-auto"
                            type={"balls"}
                            color={"blue"}
                            height={"20%"}
                            width={"50%"}
                        />
                    </>
                ) : (
                    <div className="pt-5 pb-5">
                        <Chat socket={socket} mySocket={mySocket} />
                    </div>
                )}
            </Container>
        </Container>
    );
}

export default App;
