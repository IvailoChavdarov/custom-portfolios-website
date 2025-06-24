import Table from 'react-bootstrap/Table';
import { CDBIcon } from 'cdbreact';
import Dropdown from 'react-bootstrap/Dropdown';

function UsersTable({ users, group, openDeleteModal }) {


    if (users.length === 0) return <div className="text-muted p-3">No users in this category</div>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th className='icon-field'></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={`${group}-${user.id}`}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td className='icon-field'>
                            <Dropdown>
                                <Dropdown.Toggle 
                                    id={`dropdown-actions-${group}-${user.id}`}
                                    className="p-0 border-0 bg-transparent"
                                >
                                    <CDBIcon 
                                        icon="ellipsis-v" 
                                        style={{ 
                                            cursor: 'pointer',
                                            fontSize: '1.2rem'
                                        }} 
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item 
                                        onClick={() => console.log('Edit', user.id)}
                                        className="text-info"
                                    >
                                        Edit user
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        onClick={() => console.log('Change Role', user.id)}
                                        className="text-info"
                                    >
                                        Change role
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        onClick={() => openDeleteModal(user.id)}
                                        className="text-danger"
                                    >
                                        Delete user
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UsersTable;