import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "../../firebase.js";
import Loader from '../Loader/Loader.js';
import Accordion from 'react-bootstrap/Accordion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UsersTable from '../UsersTable/UsersTable.js';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap/';
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
    
    //todo: edit, change role functions, forgotten password

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
                        <UsersTable users={userGroups.admins} group="admins" openDeleteModal={openDeleteModal}/>
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
                        <UsersTable users={userGroups.recruiters} group="recruiters" openDeleteModal={openDeleteModal}/>
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
                        <UsersTable users={userGroups.developers} group="developers" openDeleteModal={openDeleteModal}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
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
        </>
    );
}

export default ManageUsers;