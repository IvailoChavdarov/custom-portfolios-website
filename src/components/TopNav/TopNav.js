import { NavLink, useLocation  } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { db } from "../../firebase.js";
import { doc, getDoc } from 'firebase/firestore';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./TopNav.scss"


export default function TopNav() {
      const {currentUser} = useAuth();
      const [currentUserName, setCurrentUserName] = useState('')
      const location = useLocation();
      const isHomePage = location.pathname === "/";
      const [scrolled, setScrolled] = useState(false);

      useEffect(()=>{
        if(currentUser){
            async function fetchUserNames() {
                await getDoc(doc(db, 'profiles', currentUser.uid)).then(data=>
                {
                    let userData = data.data()
                    setCurrentUserName(userData.firstName + " " + userData.lastName);
                });
            }  
            fetchUserNames();
        }
      }, [currentUser])

      //the homepage topnav has transparend background until scolled down
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
                        <Nav.Link as={NavLink} className="mr-3" to="/account">{currentUserName}</Nav.Link>
                        :
                        <>
                            <Nav.Link as={NavLink} className="mr-3" to="/signin">Sign in</Nav.Link>
                            <Button as={NavLink} variant='outline-info' to="/signup">Sign up</Button>
                        </>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}