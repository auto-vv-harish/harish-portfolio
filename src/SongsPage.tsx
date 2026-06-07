import Navbar from "./components/Navbar";
import Songs from "./components/Songs";
import Footer from "./components/Footer";

function SongsPage() {
  return (
    <div className="bg-[#0B1120] text-white min-h-screen">
      <Navbar />

      <div className="pt-24">
        <Songs />
      </div>

      <Footer />
    </div>
  );
}

export default SongsPage;