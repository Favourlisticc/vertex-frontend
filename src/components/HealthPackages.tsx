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
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  package?: string;
  message?: string;
}

export default function HealthPackages() {
  // State for booking form
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"whatsapp" | "form">("whatsapp");
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "08:30",
    package: "",
    message: ""
  });
  
  // Form validation
  const [errors, setErrors] = useState<Errors>({});
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setBookingStatus("error");
      return;
    }

    setIsSubmitting(true);
    setBookingStatus(null);

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          package: selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium"
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "08:30",
          package: "",
          message: ""
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowBookingModal(false);
          setBookingStatus(null);
        }, 2000);
      } else {
        setBookingStatus("error");
        console.error('Booking failed:', result.error);
      }
    } catch (error) {
      setBookingStatus("error");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open WhatsApp with package details
  const openWhatsApp = (packageName: string) => {
    const phoneNumber = "2348166634066";
    const message = `Hello, I would like to book the ${packageName} Health Package. Please provide more information.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Open modal with package selection
  const openBookingModal = (packageId: string) => {
    setSelectedPackage(packageId);
    setFormData(prev => ({
      ...prev,
      package: packageId === "basic" ? "Basic" : packageId === "standard" ? "Standard" : "Premium"
    }));
    setShowBookingModal(true);
    setActiveTab("whatsapp");
    setBookingStatus(null);
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
      color: "text-gray-500",
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
          className={`mb-6 sm:mb-8 text-center ${isSticky || stickyDesktop ? 'max-sm:hidden' : ''}`}
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
            className="hidden md:block w-fit bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="overflow-x-auto">
              <table className="w-fit divide-y divide-gray-200">
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
                  <h3 className="text-lg text-gray-600 font-semibold">
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
                onClick={() => openBookingModal(selectedPackage || "basic")} 
                className={`w-full py-3 px-4 rounded-md shadow text-white flex items-center justify-center
                  ${selectedPackage === "basic" ? "bg-amber-600 hover:bg-amber-700" : 
                    selectedPackage === "standard" ? "bg-gray-500 hover:bg-gray-600" : 
                    "bg-yellow-500 hover:bg-yellow-600"} transition-colors duration-200`}
              >
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
              
              {/* Desktop Booking Buttons */}
              <motion.div 
                className="hidden md:flex flex-wrap justify-center w-full md:w-auto md:justify-end gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <button 
                  onClick={() => openBookingModal("basic")} 
                  className="px-4 py-2 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700 transition-colors duration-200"
                >
                  Book Basic (₦20,000)
                </button>
                <button 
                  onClick={() => openBookingModal("standard")} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition-colors duration-200"
                >
                  Book Standard (₦60,000)
                </button>
                <button 
                  onClick={() => openBookingModal("premium")} 
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-colors duration-200"
                >
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
                <span className="font-medium">Visit Us:</span> 🏢 Lekki Phase 1, Lagos 📍
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

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Book {selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium"} Package
                  </h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-blue-100 mt-1">
                  {selectedPackage === "basic" ? "₦20,000" : selectedPackage === "standard" ? "₦60,000" : "₦120,000"}
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("whatsapp")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === "whatsapp"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === "form"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Contact Form
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "whatsapp" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Contact us on WhatsApp
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get instant responses and quick booking confirmation via WhatsApp.
                    </p>
                    <button
                      onClick={() => openWhatsApp(selectedPackage === "basic" ? "Basic" : selectedPackage === "standard" ? "Standard" : "Premium")}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Open WhatsApp
                    </button>
                  </motion.div>
                )}

                {activeTab === "form" && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {bookingStatus === "success" && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Booking submitted successfully! We'll contact you shortly.
                      </div>
                    )}

                    {bookingStatus === "error" && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        Please check the form for errors and try again.
                      </div>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.date ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time *
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="08:30">08:30 AM</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="09:30">09:30 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="10:30">10:30 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="11:30">11:30 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="14:30">02:30 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="15:30">03:30 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tell us about any specific requirements or questions..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Booking Request'
                      )}
                    </button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}