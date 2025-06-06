import { CDBContainer } from "cdbreact";
export default function UsersCountChart({count}){
    return (
        <CDBContainer className="p-4 shadow-sm analytic">
            <h4>Total Registered Users</h4>
            <span className="users-count-box">{count}</span>
        </CDBContainer>
    )
}