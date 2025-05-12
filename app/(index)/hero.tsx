import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-l from-indigo-600 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Accelerate Your Learning</span>
              <span className="block text-indigo-200">In Any Language</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl">
              Catch up on standard curriculum with AI-assisted simplification.
              Learn faster in your preferred language.
            </p>
            {/* <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </a>
              </div>
            </div> */}
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <div className="pl-4 -mr-16 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <Image
                width={820}
                height={420}
                src={"/AiLearn.png"}
                alt="EduMate Dashboard Screenshot"
                className="w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
