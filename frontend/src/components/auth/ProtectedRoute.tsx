import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import LoadingSpinner from "../common/LoadingSpinner";

export type ProtectedRouteProps = {
    children: React.ReactElement;
    requireAuth?: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requireAuth = false 
}) => {
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 