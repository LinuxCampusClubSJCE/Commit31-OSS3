import { Routes, Route ,BrowserRouter} from "react-router-dom";
import Register from "./pages/Register";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes> 
          {/*  Nested Routes */}
          <Route element={<AppLayout/>}>
        <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}


