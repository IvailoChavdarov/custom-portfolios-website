import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "../../firebase.js";
import Loader from '../Loader/Loader.js';
import Accordion from 'react-bootstrap/Accordion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UsersTable from '../UsersTable/UsersTable.js';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap/';
import { useAuth } from '../../contexts/AuthContext';
import "./ManageUsers.scss";

function ManageUsers() {
    const [userGroups, setUserGroups] = useState({
        admins: [],
        recruiters: [],
        developers: []
    });
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState({
        admins: true,
        recruiters: true,
        developers: true
    });
    const {resetPassword} = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "profiles"));
                const usersData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setUserGroups({
                    admins: usersData.filter(user => user.isAdmin),
                    recruiters: usersData.filter(user => user.profileType === "recruiter"),
                    developers: usersData.filter(user => user.profileType === "developer")
                });
            } catch (error) {
                console.error("Error while fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState("");

    function openDeleteModal(userId){
       setShowDeleteModal(true);
       setUserToDeleteId(userId);
    }

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    function handleDeleteUser(userId){
        //Handle user deletion
    }
    

    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [userPasswordToResetEmail, setUserPasswordToResetEmail] = useState("");

    function openPasswordResetModal(userEmail){
       setShowResetPasswordModal(true);
       setUserPasswordToResetEmail(userEmail);
    }

    const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

    function handleResetPassword(userId){
        resetPassword(userId)
        .then(()=>handleCloseResetPasswordModal());
    }

    //todo: edit, change role functions, forgotten password, user deletion

    if (loading) return <Loader />;

    return (
        <>
            <Accordion defaultActiveKey={['admins', 'recruiters', 'developers']} alwaysOpen>
                {/* Admins Section */}
                <Accordion.Item eventKey="admins">
                    <Accordion.Header onClick={() => toggleSection('admins')}>
                        <div className="d-flex align-items-center">
                            {expandedSections.admins ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                            Administrators ({userGroups.admins.length})
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <UsersTable users={userGroups.admins} group="admins" openPasswordResetModal={openPasswordResetModal} openDeleteModal={openDeleteModal}/>
                    </Accordion.Body>
                </Accordion.Item>

                {/* Recruiters Section */}
                <Accordion.Item eventKey="recruiters">
                    <Accordion.Header onClick={() => toggleSection('recruiters')}>
                        <div className="d-flex align-items-center">
                            {expandedSections.recruiters ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                            Recruiters ({userGroups.recruiters.length})
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <UsersTable users={userGroups.recruiters} group="recruiters" openPasswordResetModal={openPasswordResetModal} openDeleteModal={openDeleteModal}/>
                    </Accordion.Body>
                </Accordion.Item>

                {/* Developers Section */}
                <Accordion.Item eventKey="developers">
                    <Accordion.Header onClick={() => toggleSection('developers')}>
                        <div className="d-flex align-items-center">
                            {expandedSections.developers ? <FaChevronUp className="me-2" /> : <FaChevronDown className="me-2" />}
                            Developers ({userGroups.developers.length})
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <UsersTable users={userGroups.developers} group="developers" openPasswordResetModal={openPasswordResetModal} openDeleteModal={openDeleteModal}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {/* user delete modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting user is unrecovarable!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Close
                </Button>
                <Button variant="danger" onClick={()=>handleDeleteUser(userToDeleteId)}>
                    Delete user
                </Button>
                </Modal.Footer>
            </Modal>

            {/* user reset password modal */}
            <Modal show={showResetPasswordModal} onHide={handleCloseResetPasswordModal}>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to reset this user's password?</Modal.Title>
                </Modal.Header>
                <Modal.Body>An email will be sent to user with instructions!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseResetPasswordModal}>
                    Close
                </Button>
                <Button variant="info" onClick={()=>handleResetPassword(userPasswordToResetEmail)}>
                    Reset user's password
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageUsers;