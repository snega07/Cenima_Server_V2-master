import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AuthServices from "../Services/AuthServices";
import './Signup.css';
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReenterPasswordChange = (event) => {
    setReenterPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (username != "" && email != "" && password != "" && password === reenterPassword) {
      AuthServices.register(username, password, email).then(
        (res) => {
          setErrorType(res.data)
          if (res.status == 200) {
            return <Navigate replace to="/login" />;

          }
        },
        (error) => {
          setErrorType("Username or EmailId already taken")
        }
      )
    }
  }




  return (
    <>
      <div className="p-4 box">
        <div className="row align-items-center">
          <div className="col-md-6 logoc">
            <img
              src="temp_reel-transformed.jpeg"
              alt="Signup"
              className="img-fluid"
              style={{ maxWidth: "80%" }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <div>
              <h3 className="mb-3 headC">Register here</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }} />
                  {errorType}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email address" onChange={(e) => { setEmail(e.target.value); }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={handleReenterPasswordChange} type="password" placeholder="Re-enter Password" />
                  {password !== reenterPassword && <p style={{ color: 'wheat' }}>Passwords do not match.</p>}
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="Button"
                    style={{
                      backgroundColor: "#FFA500",
                      borderColor: "#FFA500",
                      color: "black",
                    }}
                    onClick={handleSubmit}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
              <hr />
              <div className="p-4 box mt-3 text-center bottomC">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#FFA500" }}>
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
