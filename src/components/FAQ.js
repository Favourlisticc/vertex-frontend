// DiagnosticServices.tsx - Replace the existing component with this one

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Faqq() {
  const [openId, setOpenId] = useState("howitworks");
  
  const toggle = (id) => {
    setOpenId(prevId => prevId === id ? null : id);
  };
  
  const faqs = [
    {
      id: "howitworks",
      question: "How does it work?",
      answer: "Find the test you need, book online or walk in, and receive your results via e-mail. It's that simple!"
    },
    {
      id: "bookonline",
      question: "Can I book my tests online?",
      answer: "Yes. You can book lab tests online by selecting the tests or package that you want & paying through your bank or card. However for radiology and some specific swab tests you need to visit the diagnostic centre as they cannot be performed at your home or office."
    },
    {
      id: "homecollection",
      question: "Can the samples be collected from home?",
      answer: "Yes. Our expert phlebotomist can come to your home and collect your sample at a time scheduled by you."
    },
    {
      id: "benefit",
      question: "How will I benefit from my lab test results?",
      answer: "ONEVERTEXX LABORATORY empowers you to Take Control of Your Health. Many illnesses and diseases can be identified and prevented by managing your healthcare proactively, and working with your physician when test results are out of the normal range. Knowing the results of your tests can help you make educated decisions that can ultimately improve the quality of your life. Depending on the type of test, test results can also answer social questions, from marital to drug abuse, and allow tested parties to better evaluate their next decision steps."
    },
    {
      id: "receivingresults",
      question: "How will I receive my test results?",
      answer: "ONEVERTEXX LABORATORY follows all HEFAMAA guidelines and state regulations regarding distribution of test results. You can choose to have your test results mailed or come by to pick them up. Written consent is required to provide a copy of your test results to any party other than you. Confidentiality and discretion are of the utmost importance to ONEVERTEXX LABORATORY SERVICES."
    },
    {
      id: "emailresults",
      question: "Can you e-mail my test results?",
      answer: "ONEVERTEXX LABORATORY is able to e-mail certain lab test results to our customers. We must follow all HEFAMAA guidelines and state regulations regarding distribution of test results. All release of records must have a signed authorization from the consenting individual before results are released in any matter. Tests such as HIV are not allowed to be sent via e-mail due to federal regulations and need to be picked up in person."
    },
    {
      id: "appointment",
      question: "Do I need an appointment?",
      answer: "No appointment is necessary. However, scheduling an appointment can be beneficial. The medical assistant will have all the proper supplies and documents ready and waiting for your visit; thereby, reducing any wait time to get you back to your daily activities quickly. Call or schedule an appointment online."
    },
    {
      id: "waittime",
      question: "How long will I need to wait in the lab?",
      answer: "We know your time is valuable. Most of our customers are in and out in 15 minutes or less, unless a specialized test is ordered where specimens must be collected within specific time ranges or in cases where the donor is unable to provide a specimen at the time of collection, such as during a urine drug test."
    },
    {
      id: "nonreactive",
      question: "What does \"non-reactive\" mean?",
      answer: "\"Non-reactive\" means that no antibodies or infection can be detected so your result is negative."
    },
    {
      id: "falsenegative",
      question: "Is it possible to get a false negative on an STD Test?",
      answer: "Even though you have tested negative, you may still need to be tested again in the future. Depending on the STD, antibodies or infections have a window of time that they may not show up in your blood or urine sample. If you suspect exposure and have a negative test, it is recommended you be retested in 6 weeks. If you are leading a lifestyle that will put you in possible transmission contact with infected people, it's suggested that you be tested routinely."
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our diagnostic services and procedures
          </p>
        </div>
        
        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`overflow-hidden rounded-lg border transition ${
                openId === faq.id
                  ? "border-teal-200 bg-teal-50 shadow"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="flex w-full items-start justify-between p-5 text-left"
              >
                <span className="text-base font-medium text-gray-900 sm:text-lg">
                  {faq.question}
                </span>
                <span className={`ml-6 flex h-7 items-center transition-transform duration-200 ${
                  openId === faq.id ? 'rotate-180 transform' : ''
                }`}>
                  <ChevronDownIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                </span>
              </button>
              
              {openId === faq.id && (
                <div className="animate-fadeIn px-5 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}