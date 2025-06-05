import Loader from "../components/Loader/Loader.js";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({children}){
    const {userIsAdmin, currentUser} = useAuth();
    if (!currentUser) {
        return <Navigate to="/signin" />;
    }
    if (userIsAdmin === null) return <Loader/>;
    if (!userIsAdmin) {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <>
            {children}
        </>
    )
}