import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Function to check if any user is logged in
export default function OnlyUserPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Check if there is a logged-in user
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}