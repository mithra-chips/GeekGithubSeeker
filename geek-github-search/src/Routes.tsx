import { Routes, Route } from "react-router";
import TopPage from "./pages/TopPage";
import RepositoryListPage from "./pages/RepositoryListPage";
const CustomRoutes = ()=>{
    return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/list" element={<RepositoryListPage />} />
    </Routes>);
}

export default CustomRoutes;