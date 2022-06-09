import {Route, Routes} from "react-router-dom";
import ProfilePage from "./component/page/user/profile/ProfilePage";
import NewsPage from "./component/page/user/news/NewsPage";
import NotFoundPage from "./component/page/user/NotFoundPage";
import SignUpPage from "./component/page/auth/RegisterPage";
import LoginPage from "./component/page/auth/LoginPage";
import ProtectedRoute from "./component/common/ProtectedRoute";
import './style/App.css';
import SearchPage from "./component/page/user/SearchPage";
import FeedbackPage from "./component/page/user/FeedbackPage";
import BookmarkPage from "./component/page/user/BookmarkPage";
import SettingsPage from "./component/page/user/SettingsPage";
import MessagesPage from "./component/page/user/messanger/MessagesPage";
import CreatePostDialog from "./component/common/dialog/CreatePostDialog";
import EditProfilePage from "./component/page/user/profile/EditProfilePage";
import AccountPage from "./component/page/user/AccountPage";
import AdminProfile from "./component/page/admin/AdminProfile";
import AllUsersPage from "./component/page/admin/AllUsersPage";
import AllFeedbacksPage from "./component/page/admin/AllFeedbacksPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="register" element={<ProtectedRoute><SignUpPage/></ProtectedRoute>}/>
                <Route path="login" element={<ProtectedRoute><LoginPage/></ProtectedRoute>}/>
                <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="account/:username" element={<ProtectedRoute><AccountPage/></ProtectedRoute>}/>
                <Route path="edit" element={<ProtectedRoute><EditProfilePage/></ProtectedRoute>}/>
                <Route path="news" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="search" element={<ProtectedRoute><SearchPage/></ProtectedRoute>}/>
                <Route path="messages" element={<ProtectedRoute><MessagesPage/></ProtectedRoute>}/>
                <Route path="bookmarks" element={<ProtectedRoute><BookmarkPage/></ProtectedRoute>}/>
                <Route path="feedback" element={<ProtectedRoute><FeedbackPage/></ProtectedRoute>}/>
                <Route path="settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
                <Route path="test" element={<ProtectedRoute><CreatePostDialog/></ProtectedRoute>}/>
                <Route path="administrator" element={<ProtectedRoute><AdminProfile/></ProtectedRoute>}/>
                <Route path="administrator/users" element={<ProtectedRoute><AllUsersPage/></ProtectedRoute>}/>
                <Route path="administrator/feedbacks" element={<ProtectedRoute><AllFeedbacksPage/></ProtectedRoute>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
