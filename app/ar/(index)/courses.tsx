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
    title: "استكشف فئات الدورات",
    subtitle: "ابحث عن الدورة التكميلية المثالية لاحتياجاتك",
    categories: [
      {
        title: "الرياضيات",
        description:
          "استدرك ما فاتك في الجبر، وحساب التفاضل والتكامل، والهندسة، والمزيد",
        icon: <RadicalIcon className="text-xl text-indigo-600" />,
        bg: "bg-blue-100",
      },
      {
        title: "العلوم",
        description: "الأحياء، والكيمياء، والفيزياء، وعلوم البيئة",
        icon: <FlaskConicalIcon className="text-xl text-indigo-600" />,
        bg: "bg-green-100",
      },
      {
        title: "اللغات",
        description: "الإنجليزية، والإسبانية، والفرنسية، ولغات عالمية أخرى",
        icon: <LanguagesIcon className="text-xl text-indigo-600" />,
        bg: "bg-yellow-100",
      },
      {
        title: "التاريخ والدراسات الاجتماعية",
        description: "التاريخ العالمي، والجغرافيا، والاقتصاد، والتربية الوطنية",
        icon: <LandmarkIcon className="text-xl text-indigo-600" />,
        bg: "bg-red-100",
      },
      {
        title: "علوم الحاسوب",
        description: "البرمجة، والخوارزميات، وهياكل البيانات، والمزيد",
        icon: <Code2Icon className="text-xl text-indigo-600" />,
        bg: "bg-purple-100",
      },
      {
        title: "الفنون والموسيقى",
        description: "الفنون البصرية، ونظرية الموسيقى، والتعبير الإبداعي",
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
