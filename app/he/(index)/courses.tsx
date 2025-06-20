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
    title: "גלה קטגוריות קורסים",
    subtitle: "מצא את הקורס המתאים לצרכים שלך",
    categories: [
      {
        title: "מתמטיקה",
        description: "תלמדו אלגברה, חשבון אינפיניטסימלי, גאומטריה ועוד",
        icon: <RadicalIcon className="text-xl text-indigo-600" />,
        bg: "var(--math-bg, #bfdbfe)",
      },
      {
        title: "מדעים",
        description: "ביולוגיה, כימיה, פיזיקה ומדעי הסביבה",
        icon: <FlaskConicalIcon className="text-xl text-indigo-600" />,
        bg: "var(--science-bg, #bbf7d0) ",
      },
      {
        title: "שפות",
        description: "אנגלית, ספרדית, צרפתית ועוד שפות עולם",
        icon: <LanguagesIcon className="text-xl text-indigo-600" />,
        bg: "var(--languages-bg, #fef3c7) ",
      },
      {
        title: "היסטוריה ומדעי החברה",
        description: "היסטוריה עולמית, גאוגרפיה, כלכלה ואזרחות",
        icon: <LandmarkIcon className="text-xl text-indigo-600" />,
        bg: "var(--history-bg, #fecaca) ",
      },
      {
        title: "מדעי המחשב",
        description: "תכנות, אלגוריתמים, מבני נתונים ועוד",
        icon: <Code2Icon className="text-xl text-indigo-600" />,
        bg: "var(--cs-bg, #e9d5ff) ",
      },
      {
        title: "אומנות ומוזיקה",
        description: "אמנות חזותית, תורת המוזיקה והבעה יצירתית",
        icon: <PaletteIcon className="text-xl text-indigo-600" />,
        bg: "var(--arts-bg, #fbcfe8) ",
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
            style={{ color: "var(--foreground)" }}
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
                  <div className="ms-5">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "var(--foreground)" }}
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