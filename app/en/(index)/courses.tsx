import {
  Code2Icon,
  FlaskConicalIcon,
  LandmarkIcon,
  LanguagesIcon,
  PaletteIcon,
  RadicalIcon,
} from "lucide-react";

export default function CoursesCatagories() {
  const texts = {
    title: "Explore Course Categories",
    subtitle: "Find the perfect catch-up course for your needs",
    categories: [
      {
        title: "Mathematics",
        description: "Catch up on algebra, calculus, geometry, and more",
        icon: <RadicalIcon className="text-xl text-indigo-600" />,
        bg: "var(--math-bg, #bfdbfe)", // Tailwind's blue-100 equivalent
      },
      {
        title: "Science",
        description: "Biology, chemistry, physics, and environmental science",
        icon: <FlaskConicalIcon className="text-xl text-indigo-600" />,
        bg: "var(--science-bg, #bbf7d0)", // green-100 equivalent
      },
      {
        title: "Languages",
        description: "English, Spanish, French, and more world languages",
        icon: <LanguagesIcon className="text-xl text-indigo-600" />,
        bg: "var(--languages-bg, #fef3c7)", // yellow-100 equivalent
      },
      {
        title: "History & Social Studies",
        description: "World history, geography, economics, and civics",
        icon: <LandmarkIcon className="text-xl text-indigo-600" />,
        bg: "var(--history-bg, #fecaca)", // red-100 equivalent
      },
      {
        title: "Computer Science",
        description: "Programming, algorithms, data structures, and more",
        icon: <Code2Icon className="text-xl text-indigo-600" />,
        bg: "var(--cs-bg, #e9d5ff)", // purple-100 equivalent
      },
      {
        title: "Arts & Music",
        description: "Visual arts, music theory, and creative expression",
        icon: <PaletteIcon className="text-xl text-indigo-600" />,
        bg: "var(--arts-bg, #fbcfe8)", // pink-100 equivalent
      },
    ],
  };

  return (
    <section
      className="courses-section py-16"
      style={{ backgroundColor: "var(--secondary-background)" }}
    >
      <div className="courses-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="courses-header text-center">
          <h2
            className="courses-title text-3xl font-extrabold sm:text-4xl"
            style={{ color: "var(--title-color)" }}
          >
            {texts.title}
          </h2>
          <p
            className="courses-subtitle mt-4 max-w-2xl mx-auto text-xl"
            style={{ color: "var(--foreground)" }}
          >
            {texts.subtitle}
          </p>
        </div>

        <div className="courses-grid mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {texts.categories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              style={{ backgroundColor: category.bg }}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-md p-3"
                    style={{ backgroundColor: "var(--card-background)" }}
                  >
                    {category.icon}
                  </div>
                  <div className="ml-5">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "var(--title-color)" }}
                    >
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--foreground)" }}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
