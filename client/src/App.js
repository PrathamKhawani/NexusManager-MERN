import './App.css';
import AddUser from './adduser/AddUser';
import User from './getuser/User';
import Update from './updateuser/Update';
import Login from './auth/Login';
import Register from './auth/Register';
import { createBrowserRouter, RouterProvider, Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin } = useAuth();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Layout = () => {
  const { admin, logout } = useAuth();
  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <i className="fa-solid fa-layer-group"></i>
          NexusManager
        </Link>
        <div className="nav-links">
          {admin && (
             <button onClick={logout} className="btn-secondary-premium" style={{padding: '0.4rem 1rem', fontSize: '0.85rem'}}>
               <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
             </button>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute><User/></ProtectedRoute>,
        },
        {
          path: "/add",
          element: <ProtectedRoute><AddUser/></ProtectedRoute>
        },
        {
          path: "/update/:id",
          element: <ProtectedRoute><Update/></ProtectedRoute>
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    }
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
