import React, {useContext} from 'react'
import {Container, Nav, Navbar} from "react-bootstrap"
import {LIST_ROUTE, LOGIN_ROUTE, TASK_ROUTE} from "../utils/consts"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
      user.setIsAuth(false)
      user.setData({})
      localStorage.removeItem('token')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={LIST_ROUTE}>TODO list</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href={TASK_ROUTE + '/new'}>Create Task</Nav.Link>
                  </Nav>
                  <Nav className="me-right">
                      {user.isAuth ?
                          <Nav.Link href="#logout" onClick={() => logOut()}>Log out</Nav.Link>
                          :
                          <Nav.Link href={LOGIN_ROUTE}>Log in</Nav.Link>
                      }
                  </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar