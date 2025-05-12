import {
  Code2Icon,
  FlaskConicalIcon,
  LandmarkIcon,
  LanguagesIcon,
  PaletteIcon,
  RadicalIcon,
} from "lucide-react";

export default function CoursesCatagories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Course Categories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find the perfect catch-up course for your needs
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <RadicalIcon className="text-xl text-indigo-600"></RadicalIcon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mathematics
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Catch up on algebra, calculus, geometry, and more
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <FlaskConicalIcon className="text-xl text-indigo-600"></FlaskConicalIcon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Science</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Biology, chemistry, physics, and environmental science
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-yellow-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <LanguagesIcon className="text-xl text-indigo-600"></LanguagesIcon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Languages
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    English, Spanish, French, and more world languages
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <LandmarkIcon className="text-xl text-indigo-600"></LandmarkIcon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    History &amp; Social Studies
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    World history, geography, economics, and civics
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-purple-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <Code2Icon className="text-xl text-indigo-600"></Code2Icon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Computer Science
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Programming, algorithms, data structures, and more
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="bg-pink-100 px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white rounded-md p-3">
                  <PaletteIcon className="text-xl text-indigo-600"></PaletteIcon>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Arts &amp; Music
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Visual arts, music theory, and creative expression
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
