import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";
import Form from "./pages/form";
import Home from "./pages/home";
import Header from "./components/header";
import { useEffect } from "react";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import Footer from "./pages/footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/:mode" element={<Form />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
