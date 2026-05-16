import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const Home = () => {
  useGetAllJobs();

  return (
    <div className="relative overflow-x-hidden bg-white">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute top-[700px] left-0 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
