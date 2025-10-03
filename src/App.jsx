import "./App.css";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Category from "./pages/category.jsx";
import Questions from "./pages/questions.jsx";
import { ReviewAnswer } from "./pages/interviewReport.jsx";
import AuthWatcher from "./components/others/authWatcher.jsx";
import Layout from "./components/layout/layout.jsx";
import ErrorBoundary from "./components/others/error.boundry.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <AuthWatcher />
      <Routes>
        <Route
          path=""
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/category"
          element={
            <Layout>
              <Category />
            </Layout>
          }
        />
        <Route
          // path="/category/domain/start"
          path="/category/start_interview"
          element={
            <ErrorBoundary>
            <Layout>
              <Questions />
            </Layout>
            </ErrorBoundary>  
          }
        />
        <Route
        path="/interview_report"
        element={
          <ErrorBoundary>
        <Layout>
          <ReviewAnswer/>
        </Layout>
        </ErrorBoundary>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/category" element={<Category />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
