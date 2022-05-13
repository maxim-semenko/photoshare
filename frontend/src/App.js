import {Route, Routes} from "react-router-dom";
import ProfilePage from "./component/page/profile/ProfilePage";
import NewsPage from "./component/page/news/NewsPage";
import NotFoundPage from "./component/page/NotFoundPage";
import SignUpPage from "./component/page/auth/RegisterPage";
import LoginPage from "./component/page/auth/LoginPage";
import ProtectedRoute from "./component/common/ProtectedRoute";
import './style/App.css';
import SearchPage from "./component/page/SearchPage";
import FeedbackPage from "./component/page/FeedbackPage";
import BookmarkPage from "./component/page/BookmarkPage";
import SettingsPage from "./component/page/SettingsPage";
import MessagesPage from "./component/page/messanger/MessagesPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="register" element={<ProtectedRoute><SignUpPage/></ProtectedRoute>}/>
                <Route path="login" element={<ProtectedRoute><LoginPage/></ProtectedRoute>}/>
                <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="news" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="search" element={<ProtectedRoute><SearchPage/></ProtectedRoute>}/>
                <Route path="messages" element={<ProtectedRoute><MessagesPage/></ProtectedRoute>}/>
                <Route path="bookmarks" element={<ProtectedRoute><BookmarkPage/></ProtectedRoute>}/>
                <Route path="feedback" element={<ProtectedRoute><FeedbackPage/></ProtectedRoute>}/>
                <Route path="settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
