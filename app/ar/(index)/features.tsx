import { Brain, Languages, Zap } from "lucide-react";
export default function FeaturesSection() {
  return (
    <section className="features-section py-16 bg-white">
      <div className="features-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="features-header text-center">
          <h2 className="features-title text-3xl font-extrabold text-gray-900 sm:text-4xl">
            سرّع رحلتك التعليمية
          </h2>
          <p className="features-subtitle mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            منصتنا المدعومة بالذكاء الاصطناعي تكيف المناهج الدراسية القياسية
            لتلبية احتياجاتك
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
                دعم متعدد اللغات
              </h3>
              <p className="multilingual-description mt-2 text-base text-gray-500">
                تعلم بلغتك الأم مع دورات متاحة بأكثر من 30 لغة.
              </p>
            </div>
            {/* <!-- Feature 2: Accelerated Learning --> */}
            <div className="accelerated-feature flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="accelerated-icon-wrapper rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Zap className="accelerated-icon" />
              </div>
              <h3 className="accelerated-title mt-5 text-lg font-medium text-gray-900">
                تعلم سريع
              </h3>
              <p className="accelerated-description mt-2 text-base text-gray-500">
                استدرك ما فاتك بسرعة من خلال مناهجنا المحسنة المصممة للتعلم
                الفعال.
              </p>
            </div>

            {/* <!-- Feature 3: AI-Assisted Simplification --> */}
            <div className="ai-feature flex flex-col bg-gray-100 rounded-lg p-6 border border-gray-100">
              <div className="ai-icon-wrapper rounded-md bg-indigo-500 text-white p-3 w-12 h-12 flex items-center justify-center">
                <Brain className="ai-icon" />
              </div>
              <h3 className="ai-title mt-5 text-lg font-medium text-gray-900">
                تبسيط بمساعدة الذكاء الاصطناعي
              </h3>
              <p className="ai-description mt-2 text-base text-gray-500">
                المفاهيم المعقدة مبسطة إلى دروس سهلة الفهم باستخدام تقنية الذكاء
                الاصطناعي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
