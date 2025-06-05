import { NavLink, useLocation  } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./TopNav.scss"


export default function TopNav() {
    const {currentUser, currentUserNames, userIsAdmin} = useAuth();
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [scrolled, setScrolled] = useState(false);

    //the homepage topnav has transparent background until scolled down
    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    return (
        <Navbar variant="dark" className={`topnav-${isHomePage && !scrolled ? 'transparent' : 'solid'}`} id="topnav" expand="lg">
            <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div className='account-links'>
                    {currentUser? 
                        <>
                            <Nav.Link as={NavLink} to="/account">{currentUserNames}</Nav.Link>
                            {userIsAdmin? <Button as={NavLink} variant='outline-info' to="/admin">Admin panel</Button> : ""}
                        </>
                        :
                        <>
                            <Nav.Link as={NavLink} to="/signin">Sign in</Nav.Link>
                            <Button as={NavLink} variant='outline-info' to="/signup">Sign up</Button>
                        </>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}