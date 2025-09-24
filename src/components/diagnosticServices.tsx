// components/DiagnosticServices.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  commonTests: string[];
  sampleType: string;
  turnaroundTime: string;
  price: string;
  ctaText: string;
  image: string;
}

const diagnosticServices = [
  {
    id: '4d-ultrasound',
    name: '4D Ultrasound & Radiology',
    tagline: 'see more, worry less',
    description: 'HD 4D scans, X-ray and Doppler with same-day radiologist report.',
    keyBenefits: [
      'Live 4D foetal imaging – share a secure clip with loved ones',
      'Low-dose digital X-ray reduces radiation exposure by 40%',
      'Cloud-stored images: view anytime, anywhere'
    ],
    commonTests: [
      '4D Obstetric scan',
      'Pelvic scan',
      'Abdominal scan',
      'Chest X-ray'
    ],
    sampleType: 'Imaging (no sample)',
    turnaroundTime: 'Immediate scan • Report in 2 hrs',
    price: '₦15,000',
    ctaText: 'Book a Scan',
    image: 'https://venuswomenshospital.com/uploads/image/3d-4d.jpg'
  },
  {
    id: 'blood-group',
    name: 'Blood Group & Genotype',
    tagline: 'know your type, ensure compatibility',
    description: 'ABO/Rh blood grouping and haemoglobin genotype testing for transfusion safety, maternal care, and genetic counseling.',
    keyBenefits: [
      'Essential for safe blood transfusions by matching compatible blood types',
      'Prevents hemolytic disease of the newborn by identifying Rh incompatibility early',
      'Identifies sickle cell trait for informed family planning'
    ],
    commonTests: [
      'ABO & Rh typing',
      'Haemoglobin genotype (AA, AS, SS, etc.)',
      'Coombs test (Direct/Indirect)'
    ],
    sampleType: 'Whole blood (EDTA)',
    turnaroundTime: '24 hrs',
    price: '₦6,000',
    ctaText: 'Order Blood Typing',
    image: 'https://cdn.modernghana.com/content__/640/457/211202063645-0f738m3yxs-genotype.png'
  },
  {
    id: 'clinical-chemistry',
    name: 'Clinical Chemistry',
    tagline: 'decode your body\'s chemistry',
    description: 'Comprehensive metabolic and organ function tests to assess the health of liver, kidneys, heart and more.',
    keyBenefits: [
      'Automated analysers provide precise measurements of enzymes, electrolytes, and metabolites',
      'Comprehensive panels (liver, kidney, lipid, etc.) enable early detection of organ dysfunction',
      'Results standardized to international quality controls for reliable monitoring'
    ],
    commonTests: [
      'Electrolyte panel (Na, K, Cl, HCO3)',
      'Liver function tests (LFT)',
      'Kidney function tests (KFT)',
      'Lipid profile (cholesterol, triglycerides)'
    ],
    sampleType: 'Blood (serum)',
    turnaroundTime: '24 hrs',
    price: '₦12,000',
    ctaText: 'Order Chemistry Panel',
    image: 'https://eqas.alquds.edu/images/2019/01/12/3.jpg'
  },
  {
    id: 'domestic-staff',
    name: 'Domestic Staff Screening',
    tagline: 'safeguard your household\'s health',
    description: 'Health screening for housekeepers, nannies, drivers, and other domestic staff to ensure they are free of contagious diseases and fit for work.',
    keyBenefits: [
      'Checks for infectious diseases (TB, Hepatitis, HIV) to protect your family',
      'Includes basic fitness tests (blood count, vitals) to ensure staff can perform duties',
      'Early detection of health issues allows prompt treatment, keeping your home safe'
    ],
    commonTests: [
      'HIV & Hepatitis B & C screening',
      'Tuberculosis screening (GeneXpert or chest X-ray)',
      'Full Blood Count (general health)',
      'Urinalysis & stool microscopy'
    ],
    sampleType: 'Blood, urine, stool (plus chest X-ray)',
    turnaroundTime: '48 hrs',
    price: '₦15,000',
    ctaText: 'Schedule Staff Screening',
    image: 'https://blog.healthtracka.com/wp-content/uploads/2023/02/8bbdacb777683d416e41c7bb26014573-1024x683.jpg.webp'
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    tagline: 'hormones in harmony',
    description: 'Comprehensive hormone level testing for thyroid, reproductive, and adrenal health, enabling precise diagnosis of endocrine disorders.',
    keyBenefits: [
      'Highly sensitive assays (CLIA/ELISA) for accurate hormone level detection',
      'Covers thyroid, fertility, adrenal hormones for a full endocrine profile',
      'Expert interpretation correlates hormone levels with symptoms for better care'
    ],
    commonTests: [
      'Thyroid function panel (TSH, T3, T4)',
      'Fertility hormones (FSH, LH, Prolactin)',
      'Diabetes markers (Insulin, HbA1c)',
      'Cortisol levels (morning & evening)'
    ],
    sampleType: 'Blood (serum)',
    turnaroundTime: '48 hrs',
    price: '₦15,000',
    ctaText: 'Check Hormone Levels',
    image: 'https://stmarysphysicianassociates.com/wp-content/uploads/2024/10/Endocrinology.jpg'
  },
  {
    id: 'hematology',
    name: 'Hematology',
    tagline: 'see the story in every cell',
    description: 'Automated cell counting + expert morphology review for anemia, clotting & more.',
    keyBenefits: [
      '5-part differential analyser for unmatched accuracy',
      'Peripheral smear review when anomalies appear',
      'Same-day digital report with colour-coded flags'
    ],
    commonTests: [
      'Full Blood Count (FBC)',
      'Erythrocyte Sedimentation Rate (ESR)',
      'Reticulocyte count',
      'Coagulation profile'
    ],
    sampleType: 'Whole blood (EDTA, citrate)',
    turnaroundTime: '4 hrs',
    price: '₦6,000',
    ctaText: 'Get Blood Count',
    image: 'https://www.avensonline.org/blog/wp-content/uploads/2015/08/Hematology.jpg'
  },
  {
    id: 'immunology',
    name: 'Immunology',
    tagline: 'understand your defences',
    description: 'Auto-immune panels & allergy testing that map your immune landscape.',
    keyBenefits: [
      'Multiplex ELISA for up to 40 allergens in one go',
      'Auto-antibody profiling for lupus, RA, thyroid & more',
      'Physician interpretation included in fee'
    ],
    commonTests: [
      'ANA',
      'RF',
      'Thyroid antibodies',
      'Total/Specific IgE'
    ],
    sampleType: 'Blood serum',
    turnaroundTime: '24 hrs',
    price: '₦22,000',
    ctaText: 'Order Immunology Panel',
    image: 'https://www.the-rheumatologist.org/wp-content/uploads/2023/11/AdobeStock_336670696.png'
  },
  {
    id: 'microbiology',
    name: 'Microbiology',
    tagline: 'pinpoint the pathogen',
    description: 'Culture and sensitivity testing to isolate bacterial, fungal or other pathogens, ensuring targeted antimicrobial therapy.',
    keyBenefits: [
      'Comprehensive cultures (aerobic, anaerobic, fungal) for broad pathogen detection',
      'Antibiotic susceptibility profiling guides effective treatment',
      'Stringent quality controls prevent contamination for reliable results'
    ],
    commonTests: [
      'Urine M/C/S (urine culture & sensitivity)',
      'Blood culture',
      'Stool culture',
      'Wound swab culture'
    ],
    sampleType: 'Urine, blood, stool, swabs',
    turnaroundTime: '48-72 hrs',
    price: '₦14,000',
    ctaText: 'Order Culture Test',
    image: 'https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/D7C8E8F5-EB21-4B26-BE7D25D7B2089254/B9458B20-0699-4EE0-A50A3EE8F902C258/WebsiteWebP_XL-FMICB_Main%20Visual_Cyan_Website.webp'
  },
  {
    id: 'parasitology',
    name: 'Parasitology',
    tagline: 'unmask hidden parasites',
    description: 'Microscopic examination and rapid antigen tests for malaria, intestinal worms, and other parasitic infections.',
    keyBenefits: [
      'Expert microscopy detects malaria, filariasis, and intestinal parasites',
      'Concentration techniques improve detection of low-level infestations',
      'Complementary rapid tests (antigen kits) provide quick, accurate screening'
    ],
    commonTests: [
      'Malaria parasite test (thick & thin film)',
      'Stool ova and parasite exam',
      'Blood microfilaria test',
      'Urine schistosomiasis test'
    ],
    sampleType: 'Blood, stool, urine',
    turnaroundTime: '2-24 hrs',
    price: '₦12,000',
    ctaText: 'Check for Parasites',
    image: 'https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/B6C6F17D-15EB-45FC-AEB84A95BBC38952/7D8763B0-B77D-4A10-A1B4F5363CC2F57A/WebsiteJpg_XL-FPARA_Main%20Visual_Orange_Website.jpg'
  },
  {
    id: 'pathology',
    name: 'Pathology',
    tagline: 'pinpoint the root cause',
    description: 'From biopsies to tissue cytology, our pathologists give you crystal-clear answers fast.',
    keyBenefits: [
      'Consultant-level review on every sample – no junior hand-offs',
      'Digital slide imaging lets you view annotated findings in your patient portal',
      '48-hour standard turnaround (24-hour express add-on)'
    ],
    commonTests: [
      'Histopathology',
      'Cytology FNA',
      'Pap smear',
      'Frozen section'
    ],
    sampleType: 'Tissue, cells, fluids',
    turnaroundTime: '48 hrs (standard) • 24 hrs (express)',
    price: '₦28,500',
    ctaText: 'Book Pathology Pickup',
    image: 'https://www.news-medical.net/images/Article_Images/ImageForArticle_2145_16375579068259097.jpg'
  },
  {
    id: 'pre-employment',
    name: 'Pre-Employment Checks',
    tagline: 'hire with confidence',
    description: 'Medical fitness evaluation and lab tests for new employees, ensuring they are healthy and fit for their job role.',
    keyBenefits: [
      'Screens for communicable diseases (e.g., TB, Hepatitis) to prevent workplace outbreaks',
      'Verifies general health and fitness to reduce the risk of on-the-job illness or injury',
      'Ensures compliance with company and regulatory health requirements'
    ],
    commonTests: [
      'HIV & Hepatitis B screening',
      'Chest X-ray (tuberculosis check)',
      'Urinalysis (including drug screening)',
      'Full Blood Count'
    ],
    sampleType: 'Blood, urine, X-ray',
    turnaroundTime: '48 hrs',
    price: '₦15,000 - ₦30,000',
    ctaText: 'Schedule Employment Check',
    image: 'https://nationalprivateinvestigators.co.uk/wp-content/uploads/2025/02/advanced-pre-employment-checks-service.jpg'
  },
  {
    id: 'semen-analysis',
    name: 'Semen Analysis',
    tagline: 'unlock fertility insights',
    description: 'Detailed analysis of semen to assess male fertility, including sperm count, motility, and morphology evaluations.',
    keyBenefits: [
      'Accurate measurement of sperm count, motility and morphology by expert technicians',
      'Advanced imaging (CASA) provides in-depth motility and morphology analysis',
      'Confidential results with clinical interpretation support fertility planning'
    ],
    commonTests: [
      'Standard semen analysis',
      'Seminal fluid culture (for infection)',
      'Post-vasectomy sperm check'
    ],
    sampleType: 'Semen sample',
    turnaroundTime: '24 hrs',
    price: '₦14,000',
    ctaText: 'Book Fertility Test',
    image: 'https://cdn.prod.website-files.com/60937db4959b5603e9cce95d/60f678ba0cd3f54a49130427_Semen%20Analysis%20Report%20Cloudnine.jpg'
  },
  {
    id: 'serology',
    name: 'Serology',
    tagline: 'reveal invisible infections',
    description: 'Antibody and antigen tests for infectious diseases, determining current infection status and immunity levels.',
    keyBenefits: [
      'High-sensitivity tests detect infections early (e.g., HIV, hepatitis)',
      'Covers diseases from HIV to typhoid, checking both active infection and immunity status',
      'Confirmatory testing available to ensure reliable, peace-of-mind results'
    ],
    commonTests: [
      'HIV 1/2 antibody test',
      'Hepatitis B surface antigen (HBsAg)',
      'Widal test (Typhoid)',
      'VDRL (Syphilis) test'
    ],
    sampleType: 'Blood (serum)',
    turnaroundTime: '24 hrs',
    price: '₦5,000',
    ctaText: 'Check Infection Status',
    image: 'https://www.thomsonmedical.com/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblt5f400315f9e4f0b3%2Fblt3500a68e762d37ac%2F68104a0077bfb629074b6979%2Fscreening_serology-test_hero-image.png%3Fbranch%3Dprod&w=3840&q=75'
  },
  {
    id: 'sti-uti',
    name: 'STI & UTI Testing',
    tagline: 'discreet, accurate, same-day',
    description: 'NAAT & culture diagnostics so you can start the right treatment tonight.',
    keyBenefits: [
      'Combined panel screens for 12 STIs in one swab',
      'Urine UTI culture with sensitivity in 24 hrs',
      'No-wait express pharmacist referral option'
    ],
    commonTests: [
      'Chlamydia/Gonorrhoea NAAT',
      'Trichomonas PCR',
      'Urine M/C/S',
      'HSV I/II'
    ],
    sampleType: 'Urine, swab, blood',
    turnaroundTime: '4 hrs (NAAT) • 24 hrs (culture)',
    price: '₦14,000',
    ctaText: 'Get Tested Today',
    image: 'https://docsmedicalgroup.com/docsurgentcare/wp-content/uploads/sites/2/2023/09/lab-doctor-performing-medical-exam-urine-1.jpg'
  }
];

export default function DiagnosticServices() {
 const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsCardOpen(true);
  };

  const closeCard = () => {
    setIsCardOpen(false);
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, diagnosticServices.length));
  };

  const canLoadMore = visibleCount < diagnosticServices.length;

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
      type: 'spring' as const,
        stiffness: 300,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
       type: 'spring' as const,
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="text-center mb-16">
        <h2 className="text-teal-600 text-lg font-medium mb-2">Our Services</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Diagnostics from A to Z</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our full range of medical tests and screenings. Click on any service to learn more and book.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {diagnosticServices.slice(0, visibleCount).map((service) => (
          <motion.div
            key={service.id}
            className="bg-white rounded-xl border border-gray-100 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={itemVariants}
            whileHover="hover"
            onClick={() => handleServiceClick(service)}
          >
            <div className="h-full flex flex-col">
              {/* Image Section */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="inline-block bg-teal-50 text-teal-600 rounded-full px-3 py-1 text-sm font-medium">
                    {service.tagline}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 mb-4 flex-grow line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-teal-600 font-bold text-lg">{service.price}</span>
                  <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {service.turnaroundTime.split('•')[0].trim()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {canLoadMore && (
        <div className="text-center">
          <motion.button
            onClick={loadMore}
            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show More Services ({diagnosticServices.length - visibleCount} remaining)
          </motion.button>
        </div>
      )}

      {/* Modal Card */}
      <AnimatePresence>
        {isCardOpen && selectedService && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCard}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedService.name}</h2>
                    <p className="text-teal-600 font-medium italic">"{selectedService.tagline}"</p>
                    <p className="text-gray-600 mt-2">{selectedService.description}</p>
                  </div>
                  <button 
                    onClick={closeCard}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {selectedService.keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Tests:</h3>
                    <ul className="space-y-2">
                      {selectedService.commonTests.map((test, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span className="text-gray-700">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Sample Type:</h3>
                    <p className="text-gray-900">{selectedService.sampleType}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Turnaround Time:</h3>
                    <p className="text-gray-900">{selectedService.turnaroundTime}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Starting Price:</h3>
                  <p className="text-2xl font-bold text-teal-600">{selectedService.price}</p>
                </div>

                <motion.button
                  className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const message = `Hello! I'm interested in booking the ${selectedService.name} service.`;
                    const whatsappUrl = `https://wa.me/2348166634066?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  {selectedService.ctaText}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}