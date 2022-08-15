import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  Routes,
  Route,
} from 'react-router-dom';
import Posts from './components/ListOfPosts/ListOfPosts';
import NavBar from './components/NavBar/NavBar';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SIgnIn/SignIn';
import NewPost from './components/NewPost/NewPost';
import PostPage from './components/PostPage/PostPage';



function App(uri) {
  
  let token = localStorage.getItem('token');
  const {el} = uri;
 console.log('REACT_APP_SERVER_URL', el)
  let client
  if (token) {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: el,
      headers: {
        authorization: localStorage.getItem('token'),
      }
    })
  }
  if(!token){
    client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: el,
    })
  }
  


  return (
   
      <>
      <NavBar />

        <Container>
          <div className="App">
      <ApolloProvider client={client}>
          <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/user/signIn" element={<SignIn />} />
          <Route path="/newPost" element={<NewPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          </Routes>
      </ApolloProvider>
          </div>
        </Container>
      </>
  );
}

export default App;
