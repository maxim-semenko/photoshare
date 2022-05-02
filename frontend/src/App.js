import {Route, Routes} from "react-router-dom";
import ProfilePage from "./component/page/profile/ProfilePage";
import NewsPage from "./component/page/NewsPage";
import MessengerPage from "./component/page/MessengerPage";
import NotFoundPage from "./component/page/NotFoundPage";
import SignUpPage from "./component/page/auth/RegisterPage";
import LoginPage from "./component/page/auth/LoginPage";
import ProtectedRoute from "./component/common/ProtectedRoute";
import './style/App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="register" element={<ProtectedRoute accessIfAuth={false}><SignUpPage/></ProtectedRoute>}/>
                <Route path="login" element={<ProtectedRoute accessIfAuth={false}><LoginPage/></ProtectedRoute>}/>
                <Route path="news" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="messenger" element={<ProtectedRoute><MessengerPage/></ProtectedRoute>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
