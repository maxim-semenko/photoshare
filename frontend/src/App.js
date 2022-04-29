import {Route, Routes} from "react-router-dom";
import ProfilePage from "./component/page/ProfilePage";
import NewsPage from "./component/page/NewsPage";
import MessengerPage from "./component/page/MessengerPage";
import NotFoundPage from "./component/page/NotFoundPage";
import SignUpPage from "./component/page/auth/SignUpPage";
import SignInPage from "./component/page/auth/SignInPage";
import ProtectedRoute from "./component/common/ProtectedRoute";
import './style/App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute><NewsPage/></ProtectedRoute>}/>
                <Route path="news" element={<NewsPage/>}/>
                <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="messenger" element={<MessengerPage/>}/>
                <Route path="sign-up" element={<SignUpPage/>}/>
                <Route path="sign-in" element={<SignInPage/>}/>
                <Route path='*' exact={true} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
