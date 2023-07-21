import React, { useRef, useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './Login.css';
import AuthServices from "../Services/AuthServices";

const Login = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let creds = localStorage.getItem('user');
    if (creds != null) {
      setIsLoggedIn(true);
    }
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [inputPassValue, setInputPassValue] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);


  function streamReader(stream) {
    const reader = stream.getReader();
    const chunks = [];

    return reader.read().then(function processResult(result) {
      if (result.done) {
        const uint8Array = new Uint8Array(chunks);
        return String.fromCharCode.apply(null, uint8Array);
      }

      chunks.push(...result.value);
      return reader.read().then(processResult);
    });
  }




  const clearInput = () => {
    setInputValue('');
    setInputPassValue('');
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };
  const handleLogin = () => {
    const loginData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };
    console.log(loginData)
    clearInput();
    AuthServices.login(loginData.username, loginData.password).then(
      () => {
        setIsValid(true)
        setIsError(false)
        navigate("/")
      },
      (error) => {
        console.log(error)
        setIsError(true)
        setIsValid(false)
        console.log("error")
      }
    )

  }

  if (isValid || isLoggedIn) {
    return <Navigate replace to="/" />;
  }


  return (
    <>

      <div className="p-4 box">
        <div className="row align-items-center">
          <div className="col-md-6 logoc">
            <img
              src={"temp_reel-transformed.jpeg"}
              alt="Cinema"
              className="img-fluid"
              style={{ maxWidth: "80%" }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div>
              <h3 className="mb-3 headP">Welcome to cenima</h3>

              <Form>
                <Form.Group className="mb-3" >
                  <Form.Control onChange={(e) => setInputValue(e.target.value)} type="text" value={inputValue} ref={usernameRef} id="username" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Control onChange={(e) => setInputPassValue(e.target.value)} type="password" value={inputPassValue} ref={passwordRef} id="password" placeholder="Password" />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    onClick={handleLogin}
                    variant="primary"
                    type="Button"
                    style={{
                      backgroundColor: "#FFA500",
                      borderColor: "#FFA500",
                      color: "black",
                    }}
                  >
                    Log In
                  </Button>
                </div>
              </Form>
              {isError ? <div className="statusHandle"> <Alert variant="warning">
                Invalid Password or Username
              </Alert></div> : isValid ? <div className="statusHandle"> <Alert variant="success">
                Login successful
              </Alert></div> : <></>}
              <hr />
              <div className="p-4 box mt-3 text-center bottomP">
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#FFA500" }}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
