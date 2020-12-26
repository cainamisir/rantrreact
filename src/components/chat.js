import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Message from "../components/message";
import Axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../components/styles.css";
const io = require("socket.io-client");
const ENDPOINT = "http://127.0.0.1:5000";

export default function Chat(props) {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const myRef = useRef(null);

    function addMessage(data) {
        console.log(data);
        console.log(messageList);
        let aux = messageList;

        setMessageList((messageList) => [
            ...messageList,
            {
                text: data.text,
                author: "Other ranter",
                time: data.time,
            },
        ]);
        myRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        console.log(props.socket);
        console.log(props.mySocket);
        props.mySocket.on("incoming", (data) => {
            console.log(data);
            addMessage(data);
        });
    }, []);
    function sendMessage(event) {
        console.log(message);
        let nowtime = new Date();
        console.log(nowtime.toTimeString());
        myRef.current.scrollIntoView({ behavior: "auto", block: "end" });

        setMessageList((messageList) => [
            ...messageList,
            {
                author: "You",
                text: message,
                time: nowtime.toLocaleTimeString(),
            },
        ]);
        myRef.current.scrollIntoView({ behavior: "auto", block: "end" });

        props.mySocket.emit("message", {
            text: message,
            to: props.socket,
            time: nowtime.toLocaleTimeString(),
        });
        setMessage("");
        myRef.current.scrollIntoView({ behavior: "auto", block: "end" });

        event.preventDefault();
    }
    return (
        <>
            <Container
                className="scrollbar"
                id="style-3"
                style={{
                    height: "75vh",
                    overflowY: "scroll",
                    scrollbarColor: "green",
                    backgroundColor: "#06d6a0",
                    border: "none",
                    boxShadow: "0px 11px 20px 8px rgba(0,0,0,0.25)",
                }}
            >
                <h3 style={{ color: "#480ca8", paddingTop: "5px" }}>
                    {" "}
                    Matched{" "}
                </h3>

                {messageList.map((value) => {
                    return (
                        <Message
                            author={value.author}
                            text={value.text}
                            time={value.time}
                        />
                    );
                })}
                <div ref={myRef} style={{ marginTop: "10vh" }}></div>
            </Container>
            <Container>
                <Form
                    style={{ height: "10vh" }}
                    onSubmit={sendMessage}
                    className="mt-2"
                >
                    <Form.Group>
                        <Form.Control
                            type="message"
                            className="ml-auto mr-auto"
                            style={{
                                boxShadow: "0px 4px 13px 7px rgba(0,0,0,0.15)",

                                width: "90%",
                            }}
                            placeholder="Write message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        style={{
                            backgroundColor: "#06d6a0",
                            border: "none",
                            boxShadow: "0px 4px 13px 7px rgba(0,0,0,0.15)",
                        }}
                    >
                        Send
                    </Button>
                </Form>
            </Container>
        </>
    );
}
