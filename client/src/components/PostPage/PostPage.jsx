import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const QUERY_POST = gql`
  query PostWithComments($id: ID!, $input: Int!) {
    post(id: $id) {
      title
      body
      createdAt
      authors_nickname
    }
    comments(input: $input) {
      body
      author
    }
  }
`;

const COMMENT_MUTATION = gql`
  mutation Comment($input: newComment!) {
    newComment(input: $input) {
      body
      author
    }
  }
`;

export default function PostPage() {
  const params = useParams();
  const id = params.id;

  const [modal, setModal] = useState(false);
  const [body, setBody] = useState("");

  const toggle = () => setModal(!modal);

  console.log("This is el in postPage", id);
  const { data, loading, error } = useQuery(QUERY_POST, {
    variables: { input: Number(id), id: Number(id) },
  });
  const [comment] = useMutation(COMMENT_MUTATION);
  if (loading) {
    return <h1> DATA IS LOADING!</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (data.post && data.comments) {
    console.log(data);
    const post = data.post;
    const comments = data.comments;
    return (
      <Card
        style={{
          width: "18rem",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">{post.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {post.body}
          </CardSubtitle>
          {comments &&
            comments.map((e) => {
              return (
                <Card>
                  {" "}
                  <CardHeader>{e.author}</CardHeader>
                  <CardBody>
                    <CardTitle>{e.body}</CardTitle>
                  </CardBody>
                </Card>
              );
            })}
          <Button onClick={toggle}>Comment</Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>New Comment</ModalHeader>
            <ModalBody>
              <Input
                id="examplePassword"
                name="body"
                placeholder="please comment"
                type="text"
                onChange={(event) => {
                  event.preventDefault();
                  setBody(event.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={(event) => {
                  event.preventDefault();
                  comment({
                    variables: {
                      input: {
                        body,
                        post_id: Number(id),
                      },
                    },
                  });
                  toggle();
                }}
              >
                Create
              </Button>
              <Button color="primary" onClick={toggle}>
                Cancel
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}
