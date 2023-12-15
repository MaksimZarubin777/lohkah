import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ( {element: Component, ...props} ) => (
  props.isLoggedIn ? <Component {...props} /> : <Navigate to='/signin' replace />
)

export default ProtectedRouteElement