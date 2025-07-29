import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import EnhancedNavbar from "./components/EnhancedNavbar";
import ModernFooter from "./components/ModernFooter";
import EnhancedHome from "./pages/EnhancedHome";

// Lazy load components for better performance
const About = lazy(() => import('./pages/About'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Academics = lazy(() => import('./pages/Academics'));
const NewsEvents = lazy(() => import('./pages/NewsEvents'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Facilities = lazy(() => import('./pages/Facilities'));
const StudentPortal = lazy(() => import('./pages/StudentPortal'));
const Admin = lazy(() => import('./pages/Admin'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <EnhancedNavbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          }>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<EnhancedHome />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student/*" element={<StudentPortal />} />
              <Route path="/admin" element={<Admin />} />
              <Route 
                path="*" 
                element={
                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                    <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                    <Link 
                      to="/" 
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Return Home
                    </Link>
                  </div>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        <ModernFooter />
      </div>
    </Router>
  );
}

export default App;
