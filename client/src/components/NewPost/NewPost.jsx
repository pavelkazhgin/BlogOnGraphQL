import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const CREATE_POST_MUTATION = gql`
    mutation CreatePost($input: CreatePostInput!){
      createPost(input: $input){
        title
        body
        authors_nickname
        createdAt
      }
    }
  `

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt] = useState(new Date());
  let navigate = useNavigate();

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST_MUTATION);
  
  useEffect( () =>  {
    if(loading) {
      <h1>Data is loading</h1>
    }
    if(error){
      alert("Ошибка на сервере. Попробуйте позже!")
    }
    if(data){
        return navigate("/")
      }
    }, [data, error, loading, navigate])

  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Title</Label>
        <Input
          id="exampleEmail"
          name="title"
          placeholder="Input name of title"
          type="text"
          onChange={(event) => {
            event.preventDefault()
            setTitle(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Body</Label>
        <Input
          id="examplePassword"
          name="body"
          placeholder="Input text of body"
          type="text"
          onChange={(event) => {
            event.preventDefault()
            setBody(event.target.value);
          }}
        />
      </FormGroup>
      <Button
       onClick={(event) => {
        event.preventDefault()
        createPost({ variables: { input: {
          title, body, createdAt
        } } })
        ;
      }}
      >Submit</Button>
    </Form>
  );
}
