import Image from "next/image";
import AiLearn from "@/public/AiLearn.png";

export default function HeroSection() {
  return (
    <section
      className="hero-section pt-32 pb-16"
      style={{
        background: `linear-gradient(to left, var(--primary-color), var(--background))`,
      }}
    >
      <div className="hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-content lg:flex lg:items-center lg:justify-between">
          {/* Text Content */}
          <div className="hero-text-container lg:w-1/2">
            <h1
              className="hero-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: "var(--title-color)" }}
            >
              <span className="hero-heading-main block">                האיצו את הלמידה שלכם
</span>
              <span
                className="hero-heading-sub block"
                style={{ color: "var(--title-color)" }}
              >
                בכל שפה
              </span>
            </h1>
            <p
              className="hero-description mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl"
              style={{ color: "var(--title-color)" }}
            >
 השלימו פערים בתכניות לימוד סטנדרטיות בעזרת פישוט מבוסס בינה
              מלאכותית. למדו מהר יותר בשפה המועדפת עליכם.            </p>
          </div>

          {/* Image Content */}
          <div className="hero-image-container mt-12 lg:mt-0 lg:w-1/2">
            <div className="hero-image-wrapper lg:px-0 lg:m-0 lg:relative lg:h-full">
              <Image
                src={AiLearn}
                alt="EduMate Dashboard Screenshot"
                className="hero-image m-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
