export default function Message(props) {
    return (
        <div
            style={{
                backgroundColor: "#480ca8",
                borderRadius: "10px",
                padding: "20px",
                margin: "10px",
            }}
        >
            <p
                style={{
                    padding: "0",
                    margin: "0",
                    fontSize: "0.8rem",
                    color: "white",
                }}
            >
                <strong>{props.author}</strong> at{" "}
                <span
                    style={{
                        padding: "0",
                        margin: "0",
                        fontSize: "0.8rem",
                        color: "whitesmoke",
                    }}
                >
                    {" "}
                    {props.time}{" "}
                </span>
            </p>
            <p style={{ color: "white" }}>{props.text}</p>
        </div>
    );
}
