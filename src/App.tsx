import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TimelinePage from "@/pages/Timeline";
import Chapter from "@/pages/Chapter";
import PersonDetail from "@/pages/PersonDetail";
import PlaceDetail from "@/pages/PlaceDetail";
import EventDetail from "@/pages/EventDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/chapter/:id" element={<Chapter />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}
