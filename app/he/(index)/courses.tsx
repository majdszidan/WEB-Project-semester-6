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
    title: "גלו קטגוריות קורסים",
    subtitle: "מצאו את קורס ההשלמה המושלם לצרכים שלכם",
    categories: [
      {
        title: "מתמטיקה",
        description:
          "השלימו פערים באלגברה, חשבון דיפרנציאלי ואינטגרלי, גיאומטריה ועוד",
        icon: <RadicalIcon className="text-xl text-indigo-600" />,
        bg: "bg-blue-100",
      },
      {
        title: "מדעים",
        description: "ביולוגיה, כימיה, פיזיקה ומדעי הסביבה",
        icon: <FlaskConicalIcon className="text-xl text-indigo-600" />,
        bg: "bg-green-100",
      },
      {
        title: "שפות",
        description: "אנגלית, ספרדית, צרפתית ושפות עולם נוספות",
        icon: <LanguagesIcon className="text-xl text-indigo-600" />,
        bg: "bg-yellow-100",
      },
      {
        title: "היסטוריה ומדעי החברה",
        description: "היסטוריה עולמית, גאוגרפיה, כלכלה ואזרחות",
        icon: <LandmarkIcon className="text-xl text-indigo-600" />,
        bg: "bg-red-100",
      },
      {
        title: "מדעי המחשב",
        description: "תכנות, אלגוריתמים, מבני נתונים ועוד",
        icon: <Code2Icon className="text-xl text-indigo-600" />,
        bg: "bg-purple-100",
      },
      {
        title: "אמנות ומוזיקה",
        description: "אמנות חזותית, תיאוריה של המוזיקה וביטוי יצירתי",
        icon: <PaletteIcon className="text-xl text-indigo-600" />,
        bg: "bg-pink-100",
      },
    ],
  };

  return (
    <section className="courses-section py-16 bg-gray-50">
      <div className="courses-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="courses-header text-center">
          <h2 className="courses-title text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {texts.title}
          </h2>
          <p className="courses-subtitle mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {texts.subtitle}
          </p>
        </div>
        <div className="courses-grid mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {texts.categories.map((category, idx) => (
            <div
              key={idx}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${category.bg}`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white rounded-md p-3">
                    {category.icon}
                  </div>
                  <div className="ms-5">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
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
