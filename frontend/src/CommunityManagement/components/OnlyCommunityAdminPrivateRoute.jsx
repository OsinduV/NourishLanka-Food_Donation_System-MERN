import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyCommunityAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isCommunityAdmin ? <Outlet /> : <Navigate to='/sign-in' />;
}


