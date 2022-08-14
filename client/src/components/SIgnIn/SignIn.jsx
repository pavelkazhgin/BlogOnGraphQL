import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, } from "reactstrap";


const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: signIn!){
    signIn(input: $input)
  }
`;

export default function SignIn() {
  //Input data od auth user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() =>  {
    if(loading) {
      <h1>Data is loading</h1>
    }
    if(error){
      alert("Введен неправильно логин или пароль пароль. Попробуйте email: pablo@gmail.exmpl, password: 123")
    }
    if(data){
      console.log("this is signIn", data, "error", error);
      localStorage.setItem('token', data.signIn)
      const token = localStorage.getItem('token')
      if(token){
        return navigate("/")
      }
    }
  }, [data, error, loading, navigate])


  return (
      <Form>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="write email"
            type="string"
            onChange={(event) => {
              event.preventDefault()
              setEmail(event.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            onChange={(event) => {
              event.preventDefault()
              setPassword(event.target.value);
            }}
          />
        </FormGroup>
        <Button
          onClick={(event) => {
            event.preventDefault()
            signIn({ variables: { input: {
              email, password
            } } })
            ;
          }}
        >
          Submit!
        </Button>
      </Form>
   
  );
}
