import React, { useState, useEffect, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";
import "regenerator-runtime/runtime"; // import this to use async/await with parcel

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    "& .MuiFilledInput-root": {
      backgroud: "#f6f6f6",
      borderRadius: 10,
    },
    width: "100%",
  },
  button: {
    background: "#5db075",
    width: "100%",
    borderRadius: 10,
    padding: "0 30px",
    height: "50px",
  },
  title: {
    width: "100%",
    fontWeight: 500,
  },
  container: {
    height: "100vh",
  },
  conversation: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
  },
  chatBox: {
    height: "10%",
  },
  chat: {
    color: "white",
  },
  chatContainer: {
    background: "#5db075",
    borderRadius: 10,
    borderRadius: 10,
    height: "50px",
    width: "50%",
  },
  toRight: {
    marginLeft: "auto",
  },
}));

//declare reducer here to avoid being called multiple times
function reducer(state, action) {
  if (action.type === "NEW_MESSAGE") {
    const temp = { ...state };
    temp.messages.push(action.message);
    return temp;
  }
}

const Room = ({ socket }) => {
  const { username } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [message, setMessage] = useState("");

  const [state, dispatch] = useReducer(reducer, { messages: [] });

  useEffect(() => {
    socket.on("newMessage", (message) => {
      dispatch({ type: "NEW_MESSAGE", message });
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, dispatch]);

  return (
    <Container className={classes.container}>
      <Box className={classes.conversation}>
        {state.messages.map((chat) => (
          <Box
            // key={chat.username}
            m={2}
            p={2}
            mr={0}
            className={`${classes.chatContainer} ${classes.toRight}`}
          >
            {username === chat.username && <div style={{ flex: 1 }}></div>}
            <Typography align="left" className={classes.chat}>
              {chat.message}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className={classes.chatBox}>
        <TextField
          variant="filled"
          fullWidth
          className={classes.textField}
          placeholder="Message here..."
          InputProps={{ disableUnderline: true }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              socket.emit("message", { message });
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></TextField>
      </Box>
    </Container>
  );
};

export default Room;
