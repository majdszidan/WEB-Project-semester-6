import { Brain, Languages, Zap } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="features-section py-16 bg-white">
      <div className="features-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="features-header text-center">
          <h2 className="features-title text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Accelerate Your Educational Journey
          </h2>
          <p className="features-subtitle mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our AI-powered platform adapts standard curriculum to your needs
          </p>
        </div>

        <div className="features-grid mt-16">
          <div className="features-cards grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* <!-- Feature 1: Multilingual Support --> */}
            <div className="multilingual-feature flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="multilingual-icon-wrapper rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Languages className="multilingual-icon" />
              </div>
              <h3 className="multilingual-title mt-5 text-lg font-medium text-gray-900">
                Multilingual Support
              </h3>
              <p className="multilingual-description mt-2 text-base text-gray-500">
                Learn in your native language with courses available in over 30
                languages.
              </p>
            </div>

            {/* <!-- Feature 2: Accelerated Learning --> */}
            <div className="accelerated-feature flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="accelerated-icon-wrapper rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Zap className="accelerated-icon" />
              </div>
              <h3 className="accelerated-title mt-5 text-lg font-medium text-gray-900">
                Accelerated Learning
              </h3>
              <p className="accelerated-description mt-2 text-base text-gray-500">
                Catch up quickly with our optimized curriculum designed for
                efficient learning.
              </p>
            </div>

            {/* <!-- Feature 3: AI-Assisted Simplification --> */}
            <div className="ai-feature flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="ai-icon-wrapper rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Brain className="ai-icon" />
              </div>
              <h3 className="ai-title mt-5 text-lg font-medium text-gray-900">
                AI-Assisted Simplification
              </h3>
              <p className="ai-description mt-2 text-base text-gray-500">
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