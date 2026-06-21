import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TimelinePage from "@/pages/Timeline";
import Chapter from "@/pages/Chapter";
import PersonDetail from "@/pages/PersonDetail";
import PlaceDetail from "@/pages/PlaceDetail";
import EventDetail from "@/pages/EventDetail";
import MapPage from "@/pages/MapPage";
import PersonRelationPage from "@/pages/PersonRelation";
import CafePage from "@/pages/CafePage";
import NewspaperPage from "@/pages/Newspaper";
import CultureEvolution from "@/pages/CultureEvolution";
import StreetArchivePage from "@/pages/StreetArchive";
import DualTimelinePage from "@/pages/DualTimeline";
import StarMap from "@/pages/StarMap";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/star-map" element={<StarMap />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/relations" element={<PersonRelationPage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/newspaper" element={<NewspaperPage />} />
        <Route path="/culture" element={<CultureEvolution />} />
        <Route path="/street-archive" element={<StreetArchivePage />} />
        <Route path="/dual-timeline" element={<DualTimelinePage />} />
        <Route path="/chapter/:id" element={<Chapter />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}
