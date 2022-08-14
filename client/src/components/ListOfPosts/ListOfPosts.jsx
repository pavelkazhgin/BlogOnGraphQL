import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const QUERY_PAGINATION = gql`
  query {
    posts(posts: { page: 1, per_page: 20}) {
      posts {
        id
        title
        body
        createdAt
        authors_nickname
      }
      lastPage
      countPages
      countPosts
    }
  }
`;

export default function Posts() {
  const { data, loading, error } = useQuery(QUERY_PAGINATION);
  if (loading) {
    return <h1> DATA IS LOADING!</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
    const listOfPosts = data.posts.posts;
    console.log("HAHAHA", listOfPosts);
    return (
      <>
        <CardGroup>
            {listOfPosts &&
              listOfPosts.map((e) => {
                return (
                  <Card>
                    <CardImg
                      alt="Card image cap"
                      src="https://picsum.photos/318/180"
                      top
                      width="100%"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{e.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Author: {e.authors_nickname}
                      </CardSubtitle>
                      <CardText>{e.body}</CardText>
                      <Link to={`/post/${e.id}`}>
                      <Button>Open</Button>
                      </Link>
                    </CardBody>
                  </Card>
                );
              })}
        </CardGroup>
      </>
    );
  }
}
