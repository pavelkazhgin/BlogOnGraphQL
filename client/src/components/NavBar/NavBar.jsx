import React from 'react';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from "react-router-dom";

function Example(args) {

  let token = localStorage.getItem('token')

  const deleteToken = () => {
    localStorage.clear();
  }

  return (
    <div>
 
<Nav
  justified
  pills
>
  {token? (
  <>
    <NavItem>
    <Link to ="/">
      Posts
    </Link>
    </NavItem>
    <NavItem>
    <Link to="/newPost">
      New post
    </Link>
    </NavItem>
    <NavItem>
      <Link to="/"
      onClick={deleteToken}>
      LogOut
      </Link>
    </NavItem>
  </>
  ):(
    <NavItem>
    <Link to = '/user/SignIn'
    >
      SignIn
    </Link>
  </NavItem>
  )}
 
  
</Nav>
    </div>
  );
}

export default Example;
