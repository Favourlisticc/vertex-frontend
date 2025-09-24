"use client";

import { useState, useEffect, useRef } from "react";
import { CheckIcon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

// Define types for our form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  package: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  package?: string;
}

export default function HealthPackages() {
  // State for booking form
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "08:30",
    package: ""
  });
  
  // Form validation
  const [errors, setErrors] = useState<Errors>({});
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  // For mobile view, track which tests to show details for
  const [expandedTests, setExpandedTests] = useState<{[key: string]: boolean}>({});

  // For sticky header animation
  const tableRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyDesktop, setStickyDesktop] = useState(false);
  const desktopTableRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const tableTop = tableRef.current.getBoundingClientRect().top;
        setIsSticky(tableTop <= 0);
      }
      
      // For desktop sticky header
      if (desktopTableRef.current) {
        const desktopTableTop = desktopTableRef.current.getBoundingClientRect().top;
        setStickyDesktop(desktopTableTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.date) newErrors.date = "Date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log("Form submitted:", formData);
      setBookingStatus("success");
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "08:30",
          package: ""
        });
        setShowBookingForm(false);
        setBookingStatus(null);
      }, 2000);
    } else {
      setBookingStatus("error");
    }
  };

  // Open WhatsApp with package details
  const openWhatsApp = (packageName: string) => {
    const phoneNumber = "2348166634066"; // WhatsApp requires country code
    const message = `Hello, I would like to book the ${packageName} Health Package. Please provide more information.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Toggle expanded state for tests on mobile
  const toggleTestDetails = (testName: string) => {
    setExpandedTests(prev => ({
      ...prev,
      [testName]: !prev[testName]
    }));
  };

  // Table data for tests and packages
  const testsData = [
    { name: "Full Blood Count", basic: true, standard: true, premium: true },
    { name: "Urinalysis", basic: true, standard: true, premium: true },
    { name: "Blood Sugar (FBS/RBS)", basic: true, standard: true, premium: true },
    { name: "Malaria Parasite Test", basic: true, standard: true, premium: true },
    { name: "HIV I & II Screening", basic: true, standard: true, premium: true },
    { name: "Hepatitis B Surface Antigen (HBsAg)", basic: true, standard: true, premium: true },
    { name: "Genotype & Blood Group", basic: true, standard: true, premium: true },
    { name: "Liver Function Test (LFT)", basic: false, standard: true, premium: true },
    { name: "Kidney Function Test (KFT)", basic: false, standard: true, premium: true },
    { name: "Lipid Profile", basic: false, standard: true, premium: true },
    { name: "Uric Acid", basic: false, standard: true, premium: true },
    { name: "Electrolytes, Urea & Creatinine (E/U/Cr)", basic: false, standard: true, premium: true },
    { name: "PSA (for men > 40)", basic: false, standard: true, premium: true },
    { name: "Thyroid Function (T3, T4, TSH)", basic: false, standard: false, premium: true },
    { name: "HbA1c (Diabetes monitoring)", basic: false, standard: false, premium: true },
    { name: "Vitamin D & B 12", basic: false, standard: false, premium: true },
    { name: "Abdominal Ultrasound", basic: false, standard: false, premium: true },
  ];
  
  const optionalTests = [
    "Pregnancy Test",
    "Stool Microscopy",
    "Testosterone"
  ];

  useEffect(() => {
    if (!selectedPackage) {
      setSelectedPackage("basic");
    }
  }, []);
  
  const packages = [
    {
      id: "basic",
      name: "Basic",
      medal: "🥉",
      color: "text-gray-500 ",
      bgColor: "bg-gray-500",
      borderColor: "border-gray-500",
      price: "₦20,000"
    },
    {
      id: "standard",
      name: "Standard",
      medal: "🥈",
      color: "text-amber-700",
      bgColor: "bg-amber-700",
      borderColor: "border-amber-700",
      price: "₦60,000"
    },
    {
      id: "premium",
      name: "Premium",
      medal: "🥇",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
      price: "₦120,000"
    }
  ];

  return (
    <div className="py-6 sm:py-10 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`mb-6 sm:mb-8 text-center ${isSticky || stickyDesktop ? 'max-sm:hidden ' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">HEALTH PACKAGES</h1>
        </motion.div>
        
       {/* Desktop Sticky Header */}
       
<div className="flex justify-center">
  <motion.div 
    className={`hidden w-fit md:block sticky top-0 z-20 bg-white transition-all duration-300 ${stickyDesktop ? 'shadow-md py-2 px-4' : 'py-0 opacity-0 pointer-events-none h-0 overflow-hidden'}`}
    initial={false}
    animate={{ 
      padding: stickyDesktop ? '0.5rem 1rem' : '0',
      opacity: stickyDesktop ? 1 : 0,
      height: stickyDesktop ? 'auto' : '0',
    }}
  >
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">HEALTH PACKAGES</h2>
      <div className="flex space-x-4">
        {packages.map((pkg) => (
          <button 
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`py-2 px-3 rounded-md transition-colors duration-200 flex items-center
              ${selectedPackage === pkg.id ? `bg-${pkg.id === 'basic' ? 'amber-100' : pkg.id === 'standard' ? 'gray-100' : 'yellow-100'} ${pkg.color}` : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <span className="text-lg mr-1">{pkg.medal}</span>
            <span className="font-medium">{pkg.name}</span>
            <span className="ml-1 text-sm">({pkg.price})</span>
          </button>
        ))}
      </div>
    </div>
  </motion.div>
</div>
     
        
       {/* Desktop Table View (hidden on small screens) */}
       <div className="flex justify-center">
        <motion.div 
          ref={desktopTableRef}
          className="hidden md:block  w-fit bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className=" w-fit divide-y divide-gray-200">
              <thead className={`bg-gray-50 ${stickyDesktop ? 'sticky top-16 z-10 shadow-sm' : ''}`}>
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-base font-medium text-gray-500 tracking-wider w-1/3">
                    Test / Service
                  </th>
                  <motion.th 
                    scope="col" 
                    className="px-6 py-4 text-center font-medium text-amber-700 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-2">🥉</span>
                      <span className="text-lg">Basic</span>
                    </div>
                  </motion.th>
                  <motion.th 
                    scope="col" 
                    className="px-6 py-4 text-center font-medium text-gray-500 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-2">🥈</span>
                      <span className="text-lg">Standard</span>
                    </div>
                  </motion.th>
                  <motion.th 
                    scope="col" 
                    className="px-6 py-4 text-center font-medium text-yellow-500 tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-2">🥇</span>
                      <span className="text-lg">Premium</span>
                    </div>
                  </motion.th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testsData.map((test, index) => (
                  <motion.tr 
                    key={test.name} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <td className="px-6 py-4 text-base text-gray-900">
                      {test.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.div 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * index + 0.2 }}
                      >
                        {test.basic ? (
                          <CheckIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-500" />
                        )}
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.div 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * index + 0.3 }}
                      >
                        {test.standard ? (
                          <CheckIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-500" />
                        )}
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.div 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * index + 0.4 }}
                      >
                        {test.premium ? (
                          <CheckIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-500" />
                        )}
                      </motion.div>
                    </td>
                  </motion.tr>
                ))}
                
                {/* Optional Tests Section */}
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  <td colSpan={4} className="px-6 py-4 bg-gray-100">
                    <div className="text-lg font-semibold text-gray-700">OPTIONAL*</div>
                  </td>
                </motion.tr>
                
                {optionalTests.map((test, idx) => (
                  <motion.tr 
                    key={test}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9 + (idx * 0.1), duration: 0.5 }}
                  >
                    <td className="px-6 py-3 text-base text-gray-900">
                      *{test}
                    </td>
                    <td className={idx === 0 ? "px-6 py-3" : "px-6 py-1"} colSpan={3}>
                      {idx === 0 && (
                        <motion.div 
                          className="text-amber-500 font-medium text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.0, duration: 0.5 }}
                        >
                          FREE medical consultations for groups of 5+ on Standard & Premium
                        </motion.div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
       </div>

        {/* Mobile View (visible only on small screens) */}
        <div className="md:hidden" ref={tableRef}>
          {/* Sticky package selector for mobile */}
          <motion.div 
            className={`sticky top-0 z-10 bg-white border-b border-gray-200 transition-all duration-300 ${isSticky ? 'shadow-md py-2' : 'py-3'}`}
            initial={false}
            animate={{ 
              padding: isSticky ? '0.5rem 0' : '0.75rem 0',
            }}
          >
            {/* Include the title in the sticky header for mobile */}
            {isSticky && (
              <div className="text-center mb-1">
                <h2 className="text-lg font-bold text-gray-900">HEALTH PACKAGES</h2>
              </div>
            )}
            
            <div className="flex">
              {packages.map((pkg, index) => (
                <button 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`flex-1 py-2 px-2 text-center transition-colors duration-200 relative ${selectedPackage === pkg.id ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  <div className="flex flex-col items-center">
                    <span className={isSticky ? "text-lg" : "text-xl mb-1"}>{pkg.medal}</span>
                    <span className="text-sm font-medium">{pkg.name}</span>
                    <span className="text-xs">{pkg.price}</span>
                  </div>
                  {selectedPackage === pkg.id && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
                      layoutId="activePackageIndicator"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mobile Package Details */}
          <motion.div
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mb-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {selectedPackage === "basic" ? "🥉" : selectedPackage === "standard" ? "🥈" : "🥇"}
                  </span>
                  <h3 className="text-lg text-gray-600 font-semibold ">
                    {selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium"} Package
                  </h3>
                </div>
                <div className="text-lg text-gray-600 font-bold">
                  {selectedPackage === "basic" ? "₦20,000" : selectedPackage === "standard" ? "₦60,000" : "₦120,000"}
                </div>
              </div>
            </div>

            {/* Tests list for selected package */}
            <div className="divide-y divide-gray-200">
              {testsData.map((test, index) => {
                const isIncluded = selectedPackage === "basic" ? test.basic : 
                                  selectedPackage === "standard" ? test.standard : test.premium;
                
                return (
                  <div 
                    key={test.name}
                    className={`p-3 flex items-center justify-between ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <span className="text-sm text-gray-800">{test.name}</span>
                    <div className="ml-2">
                      {isIncluded ? (
                        <CheckIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Optional tests for mobile */}
              <div className="p-3 bg-gray-100">
                <div className="text-base font-semibold text-gray-700">OPTIONAL TESTS</div>
              </div>
              
              {optionalTests.map((test, idx) => (
                <div key={test} className="p-3 flex items-center">
                  <span className="text-sm text-gray-800">*{test}</span>
                </div>
              ))}
              
              {/* Mobile promo message */}
              <div className="p-3 bg-amber-50">
                <p className="text-sm text-amber-600 font-medium text-center">
                  FREE medical consultations for groups of 5+ on Standard & Premium packages
                </p>
              </div>
            </div>

            {/* Mobile Book Button */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button 
                onClick={() => openWhatsApp(selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium")} 
                className={`w-full py-3 px-4 rounded-md shadow text-white flex items-center justify-center
                  ${selectedPackage === "basic" ? "bg-amber-600 hover:bg-amber-700" : 
                    selectedPackage === "standard" ? "bg-gray-500 hover:bg-gray-600" : 
                    "bg-yellow-500 hover:bg-yellow-600"} transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.80-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.260.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.680.116-.173.231-.145.390-.087s1.011.477 1.184.564c.173.087.289.130.332.202.043.720.043.433-.101.593z"/>
                </svg>
                Book {selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium"} Package
              </button>
            </div>
          </motion.div>
        </div>

        {/* Common Footer for both views */}
        <div className="flex justify-center">
        <div className="bg-white shadow-xl mt-4 rounded-xl overflow-hidden border border-gray-200">
          {/* Call to Action Buttons */}
          <div className="bg-gray-50 px-4 sm:px-2 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <motion.div 
              className="flex items-center justify-center mb-4 sm:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <a href="tel:+2348166634066" className="text-gray-700 font-bold">0816 663 4066</a>
            </motion.div>
            
            {/* Only show buttons on desktop (mobile has its own buttons) */}
            <motion.div 
              className="hidden md:flex flex-wrap justify-center w-full md:w-auto md:justify-end gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              <button 
                onClick={() => openWhatsApp("Basic")} 
                className="px-4 py-2 bg-gray-500  text-white rounded-md shadow hover:bg-amber-700 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.80-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.260.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.680.116-.173.231-.145.390-.087s1.011.477 1.184.564c.173.087.289.130.332.202.043.720.043.433-.101.593z"/>
                </svg>
                Book Basic (₦20,000)
              </button>
              <button 
                onClick={() => openWhatsApp("Standard")} 
                className="px-4 py-2  bg-amber-600 text-white rounded-md shadow hover:bg-gray-600 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.80-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.260.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.680.116-.173.231-.145.390-.087s1.011.477 1.184.564c.173.087.289.130.332.202.043.720.043.433-.101.593z"/>
                </svg>
                Book Standard (₦60,000)
              </button>
              <button 
                onClick={() => openWhatsApp("Premium")} 
                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.80-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.260.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.680.116-.173.231-.145.390-.087s1.011.477 1.184.564c.173.087.289.130.332.202.043.720.043.433-.101.593z"/>
                </svg>
                Book Premium (₦120,000)
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white max-sm:text-center px-2 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            <div className="text-gray-700 text-sm sm:text-base mb-2 sm:mb-0">
              <span className="font-medium">Visit Us:</span> 🏢 40 Providence St, Lekki Phase 1, Lagos 📍
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-gray-700 text-sm sm:text-base">Book Online</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  );
}