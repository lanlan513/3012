import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TimelinePage from "@/pages/Timeline";
import Chapter from "@/pages/Chapter";
import PersonDetail from "@/pages/PersonDetail";
import PlaceDetail from "@/pages/PlaceDetail";
import EventDetail from "@/pages/EventDetail";
import MapPage from "@/pages/MapPage";
import PersonRelationPage from "@/pages/PersonRelation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/relations" element={<PersonRelationPage />} />
        <Route path="/chapter/:id" element={<Chapter />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}
