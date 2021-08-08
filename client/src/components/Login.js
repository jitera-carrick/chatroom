import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
  error: {
    color: "red",
  },
}));

const Login = ({ socket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h3" align="center" className={classes.title}>
            Join Chatroom
          </Typography>
        </Box>
        <Box m={2}>
          <TextField
            variant="filled"
            fullWidth
            className={classes.textField}
            placeholder="Username"
            InputProps={{ disableUnderline: true }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
        </Box>
        <Box m={2}>
          <TextField
            variant="filled"
            className={classes.textField}
            placeholder="RoomID"
            InputProps={{ disableUnderline: true }}
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          ></TextField>
        </Box>
        {errors.length > 0 &&
          errors.map((error) => (
            <Box m={2}>
              <Typography className={classes.error}>{error}</Typography>
            </Box>
          ))}
        <Box m={2} mt={10}>
          <Button
            className={classes.button}
            onClick={async () => {
              setErrors([]);

              let temp = [];
              if (!username.length) {
                temp.push("Username cannot be empty!");
              }
              if (!roomId.length) {
                temp.push("RoomID cannot be empty!");
              }

              if (temp.length) {
                setErrors(temp);
                return;
              }

              try {
                await axios.post(`${document.location.origin}/api/users`, {
                  name: username,
                  roomId,
                });
              } catch (e) {
                setErrors(["Username already taken!"]);
                return;
              }

              if (!socket) {
                console.error("socket is not defined!");
                return;
              }
              socket.emit("joinRoom", { username, roomId });
              history.push(`/room/${roomId}/${username}`);
            }}
          >
            JOIN
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
