import { Brain, Languages, Zap } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Accelerate Your Educational Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our AI-powered platform adapts standard curriculum to your needs
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* <!-- Feature 1 --> */}
            <div className="flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Languages />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">
                Multilingual Support
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Learn in your native language with courses available in over 30
                languages.
              </p>
            </div>

            {/* <!-- Feature 2 --> */}
            <div className="flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Zap />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">
                Accelerated Learning
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Catch up quickly with our optimized curriculum designed for
                efficient learning.
              </p>
            </div>

            {/* <!-- Feature 3 --> */}
            <div className="flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Brain />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">
                AI-Assisted Simplification
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Complex concepts broken down into easily digestible lessons with
                AI technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
