import React from 'react'
import { Route } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../LogoText.png'
import cartimg from '../logo.png'
import { userLogout } from '../actions/userActions'
import SearchBox from './searchBox'
const Header = () => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const logoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <header>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        className='p-2'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={Logo}
                height='40vh'
                className='d-inline-block align-top'
                alt='logo'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/Cart'>
                <Nav.Link>
                  {' '}
                  <img
                    src={cartimg}
                    height='20vh'
                    className='d-inline-block align-top'
                    alt='logo'
                  />{' '}
                  Go to Cart
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {' '}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {user && user.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
