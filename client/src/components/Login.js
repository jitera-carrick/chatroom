import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import history from "history";

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
}));

const Login = () => {
  const classes = useStyles();

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
          ></TextField>
        </Box>
        <Box m={2}>
          <TextField
            variant="filled"
            className={classes.textField}
            placeholder="RoomID"
            InputProps={{ disableUnderline: true }}
          ></TextField>
        </Box>
        <Box m={2} mt={10}>
          <Button
            className={classes.button}
            onClick={() => {
              history.push("/room");
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
