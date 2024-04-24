import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';


//making create-post page private and have the access only to event organiser
export default function OnlyEventOgPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isEventOrganiser ? <Outlet /> : <Navigate to='/sign-in' />;
}