import NavBar from "./navbar";
import HeroSection from "./hero";
import FeaturesSection from "./features";
import CoursesCatagories from "./courses";
import Footer from "./footer";
export default function Home() {
  return (
    <div dir="rtl">
      <header className="relative">
        <NavBar />
      </header>
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesCatagories />
      </main>

      <Footer />
    </div>
  );
}
