"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { MapPinIcon, ArrowRightIcon, ChevronDownIcon, UsersIcon, TruckIcon } from "@heroicons/react/24/outline";
import { PhoneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from 'next/dynamic';
import InfiniteImageSlider from "./InfiniteImageSlider";
import HealthPackages from "./HealthPackages";
import DiagnosticServices from "./diagnosticServices";

// Dynamically import the map component with ssr: false to prevent window is not defined error
const MapWithNoSSR = dynamic(
  () => import('./MapComponent'),
  { ssr: false }
);

export default function VertexLanding() {
  // Toggle open panel
  const [openId, setOpenId] = useState<string | null>(null);

  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState<"success" | "error" | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* 1. Service data */
  const services = [
    {
      id: "basic",
      title: "Basic Screening",
      blurb: "Quick insights, lasting peace of mind.",
      body: `Our Basic Screening package delivers the essential health metrics everyone should track--vital signs, complete blood count, blood‑sugar and lipid panels, plus a urinalysis--all performed with hospital‑grade equipment and a focus on speed and comfort. Results are turned around within 24 hours and published to your secure online portal, letting you catch early warning signs and make lifestyle tweaks before small issues become serious.`,
      image: "/images/basic-screening.png",
      alt: "Nurse chatting with patient while holding clipboard"
    },
    {
      id: "preemployment",
      title: "Pre‑Employment Check",
      blurb: "Hire with confidence, comply without compromise.",
      body: `This screening is designed for HR teams that need fast, credible fitness‑for‑work decisions. Beyond a thorough physical exam, we offer drug & alcohol testing, vision and auditory checks, vaccination status verification, and bespoke add‑ons for safety‑critical roles. You receive a concise medical fitness certificate that satisfies local regulations and minimizes onboarding delays.`,
      image: "/images/pre-employment.png",
      alt: "Doctor shaking hands with young professional"
    },
    {
      id: "staffscreening",
      title: "Diagnostic Staff Screening",
      blurb: "Protect your team. Safeguard your patients.",
      body: `Healthcare professionals face unique occupational risks, so this package targets infectious‑disease exposure and procedural fitness. We screen for Hep B, Hep C, HIV, and TB; confirm immunization titers; and assess manual‑handling and sharps safety competence. Optional periodic mental‑health check‑ins help combat burnout. Reports are aggregated for compliance dashboards yet remain privacy‑centric.`,
      image: "/images/staff-screening.png",
      alt: "Healthcare workers queued for temperature check"
    },
    {
      id: "comprehensive",
      title: "Comprehensive Medical Check",
      blurb: "Your 360° health audit--one appointment, one actionable report.",
      body: `Ideal for executives and anyone seeking a full‑scope health picture, this half‑day program layers advanced diagnostics onto our Basic Screening: cardiac stress ECG, abdominal & thyroid ultrasound, cancer‑marker panels, full metabolic work‑up, and lifestyle counseling. You leave with a physician‑led debrief, a prioritized action plan, and a beautifully structured report.`,
      image: "/images/comprehensive-check.png",
      alt: "Doctor drawing blood from smiling patient"
    }
  ];
  const toggle = (id: string | null) => setOpenId(prev => (prev === id ? null : id));


  // Use OpenStreetMap coordinates for Lekki Phase 1, Lagos
  const mapCoords = {
    lat: 6.433,
    lng: 3.452
  };
  
  // OpenStreetMap URL (no API key needed)
  const mapUrl = `https://www.openstreetmap.org/?mlat=${mapCoords.lat}&mlon=${mapCoords.lng}&zoom=15&layers=M`;
  
  // Static map image
  const mapSrc = "/images/map-preview.png";

  /* --------------------------------------------------------------------
     2.  Mark-up
  -------------------------------------------------------------------- */
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <Image
            src="/WhatsApp Image 2025-09-17 at 11.30.12.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-fill opacity-35"
          />
        </div>

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[420px] mt-20 flex-col items-center justify-center py-20 sm:min-h-[480px] lg:min-h-[580px]">

            {/* Animated location badge */}
            <div className={`mb-4 flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <MapPinIcon className="mr-1.5 h-4 w-4 text-teal-400 animate-pulse" />
              <span className="font-medium">Lekki Phase 1, Lagos</span>
            </div>

            {/* Animated heading */}
            <h1 className={`mb-8 text-center text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Medical screenings for<br className="hidden lg:inline" /> individuals, employees & families.
            </h1>

            {/* Animated buttons with icons */}
            <div className={`flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a 
                href="https://wa.me/2348148390839?text=Hello%20Vertex%20Diagnostic%20Center,%20I'd%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md hover:scale-105 flex items-center justify-center gap-2 sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
                WhatsApp Us
              </a>
              <button
                type="button"
                onClick={() => setShowScheduler(true)}
                className="group w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md hover:scale-105 flex items-center justify-center gap-2 sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Online
              </button>
             
            </div>
          </div>
        </div>
        
        {/* Subtle animated elements */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <section>
        <HealthPackages />
      </section>

      <section>
       <InfiniteImageSlider />
      </section>

{/* Services Accordion - Improved Design */}
<section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20">
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Screening Services</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Professional diagnostic services designed for individuals, healthcare teams, and organizations
      </p>
    </div>

    <div className="space-y-6">
      {services.map(s => (
        <div 
          key={s.id} 
          className={`overflow-hidden rounded-xl border transition-all duration-300 ${
            openId === s.id 
              ? 'border-teal-200 bg-gradient-to-r from-teal-50 to-white shadow-lg transform scale-[1.02]' 
              : 'border-gray-200 bg-white shadow-sm hover:border-teal-100 hover:shadow-md'
          }`}
        >
          <button
            onClick={() => toggle(s.id)}
            className="flex w-full items-center justify-between p-6 text-left transition"
          >
            <div className="flex items-center">
              <div className={`hidden sm:flex mr-5 ${
                openId === s.id 
                  ? 'text-teal-600' 
                  : 'text-gray-400'
              }`}>
                {s.id === "basic" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )}
                {s.id === "preemployment" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {s.id === "staffscreening" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
                {s.id === "comprehensive" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
              
              <div>
                <h3 className={`text-lg font-semibold sm:text-xl lg:text-2xl ${
                  openId === s.id ? 'text-teal-700' : 'text-gray-900'
                }`}>{s.title}</h3>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">{s.blurb}</p>
              </div>
            </div>
            
            <div className={`ml-4 flex-shrink-0 rounded-full p-2 transition-colors duration-300 ${
              openId === s.id 
                ? 'bg-teal-100' 
                : 'bg-gray-100'
            }`}>
              <ChevronDownIcon 
                className={`h-5 w-5 flex-none transition-transform duration-300 sm:h-6 sm:w-6 ${
                  openId === s.id 
                    ? 'rotate-180 text-teal-600' 
                    : 'text-gray-400'
                }`}
              />
            </div>
          </button>
          
          {openId === s.id && (
            <div className="animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-6 p-6 border-t border-teal-100">
                <div className="sm:w-2/5">
                  <div className="relative overflow-hidden rounded-lg shadow-md aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3">
                    <Image 
                      src={s.image} 
                      alt={s.alt} 
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(min-width: 640px) 40vw, 100vw"
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => {
                        setShowScheduler(true);
                      }}
                      className="inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book This Service
                    </button>
                  </div>
                </div>
                
                <div className="sm:w-3/5">
                  <div className="prose prose-sm prose-teal max-w-none sm:prose-base">
                    <p className="text-gray-700 leading-relaxed">{s.body}</p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                      Professional Staff
                    </span>
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                      Quick Results
                    </span>
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                      Modern Equipment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    
    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `}</style>
  </div>
</section>

<section>
  <DiagnosticServices />
</section>

{/* Getting Here - Enhanced with Interactive Map */}
<section id="directions" className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
        <MapPinIcon className="mr-3 h-8 w-8 text-teal-600" />
        Find Us Easily
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        We're conveniently located at 40 Providence Street in Lekki Phase 1, Lagos. 
        Multiple transportation options make reaching us simple.
      </p>
    </div>
    
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Map section - takes up 3/5 of space on large screens */}
      <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="relative h-[400px] w-full bg-gray-100">
          {/* Dynamic import of MapContainer */}
          <MapWithNoSSR mapCoords={mapCoords} />
        </div>
        
        <div className="bg-white p-4 sm:p-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 mb-4 sm:mb-0">
              <MapPinIcon className="h-6 w-6 shrink-0 text-teal-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Vertex Diagnostic Center</h3>
                <p className="text-gray-700">40 Providence Street, Lekki Phase 1, Lagos</p>
              </div>
            </div>
            
            <a
              href="https://maps.app.goo.gl/yourMapUrl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md"
            >
              <span>Open in Maps</span>
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Directions section - takes up 2/5 of space on large screens */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 py-4 px-5">
            <h3 className="text-lg font-semibold text-white">Transportation Options</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* By Car Panel */}
            <details className="group" open>
              <summary className="flex cursor-pointer items-center justify-between p-5 text-gray-900 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <TruckIcon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">By Car</span>
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-500 transition duration-200 group-open:rotate-180" />
              </summary>
              
              <div className="px-5 pb-5">
                <ol className="relative space-y-4 border-l border-dashed border-teal-300 pl-6 pt-2">
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">1</span>
                    </div>
                    <p className="text-gray-800">Stay in service lane past Lekki toll gate</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">2</span>
                    </div>
                    <p className="text-gray-800">At Marwa/2nd Roundabout, keep left and loop back</p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">3</span>
                    </div>
                    <p className="text-gray-800">Take first U-turn, right into Providence St. We're 2nd building on right</p>
                  </li>
                </ol>
                
                <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                  <div className="flex">
                    <svg className="h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    <div className="ml-3">
                      <p>Convenient parking available in front of our building</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>
            
            {/* By Public Transport Panel */}
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between p-5 text-gray-900 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">By Public Transport</span>
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-500 transition duration-200 group-open:rotate-180" />
              </summary>
              
              <div className="px-5 pb-5">
                <ol className="relative space-y-4 border-l border-dashed border-teal-300 pl-6 pt-2">
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Board any Ajah-bound bus</p>
                      <p className="text-sm text-gray-600">From Oshodi, Yaba, or CMS. Ask for "Lekki Phase 1 gate -- Marwa"</p>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Alight at Marwa bus stop</p>
                      <p className="text-sm text-gray-600">After the 2nd roundabout in Lekki Phase 1</p>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                      <span className="text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Take a tricycle or walk</p>
                      <p className="text-sm text-gray-600">Ask for "Providence Street" -- we're at No. 40</p>
                    </div>
                  </li>
                </ol>
                <p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
                  Travel time from Marwa bus stop: approximately 3-5 minutes
                </p>
              </div>
            </details>
            
            
            {/* Ride-hailing Services Panel */}
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between p-5 text-gray-900 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">Ride-hailing Services</span>
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-500 transition duration-200 group-open:rotate-180" />
              </summary>
              
              <div className="px-5 pb-5">
                <p className="mb-3 text-gray-800">
                  Simply enter "Vertex Diagnostic Center" or "40 Providence Street, Lekki Phase 1" as your destination in:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                    <span>Uber</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                    <span>Bolt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                    <span>inDriver</span>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer className="bg-gray-900" itemScope itemType="https://schema.org/MedicalBusiness">
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Address */}
      <address itemProp="address" className="flex items-start gap-3 text-gray-300 not-italic">
        <MapPinIcon className="h-6 w-6 shrink-0 text-teal-400" />
        <div>
          <p className="font-medium text-white">Our Location</p>
          <p className="mt-1.5 leading-relaxed">
            40 Providence Street<br />
            Lekki Phase 1, Lagos
          </p>
        </div>
      </address>

      {/* Opening hours */}
      <div itemProp="openingHours" content="Mo-Fr 08:00-17:00, Sa 09:00-15:00" className="flex items-start gap-3 text-gray-300">
        <svg className="h-6 w-6 shrink-0 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
        </svg>
        <div>
          <p className="font-medium text-white">Opening Hours</p>
          <p className="mt-1.5 leading-relaxed">
            Mon -- Fri: 8 am -- 5 pm<br />
            Saturday: 9 am -- 3 pm
          </p>
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex items-start gap-3 text-gray-300">
        <PhoneIcon className="h-6 w-6 shrink-0 text-teal-400" />
        <div>
          <p className="font-medium text-white">Contact Us</p>
          <p className="mt-1.5 leading-relaxed">
            <a href="tel:08166634066" className="hover:text-teal-300 transition-colors">
              08166634066
            </a>
          </p>
        </div>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="mt-8 border-t border-gray-800 pt-8">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p className="text-center text-sm text-gray-400 sm:text-left">
            © 2025 Vertex Diagnostic Center · 
            <a href="/privacy" className="mx-2 text-gray-300 hover:text-white transition-colors">Privacy</a> · 
            <a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms</a>
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/onevertexx/?mibextid=wwXIfr&rdid=JB86LlO7m1SGUMBN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          
          {/* TikTok */}
          <a 
            href="https://tok.com/@lekkilab?_t=ZS-8zo1S1S8Nik&_r=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
            aria-label="TikTok"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          
          {/* Twitter/X */}
          <a 
            href="https://x.com/onevertexx?s=21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
            aria-label="Twitter/X"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          
          {/* WhatsApp */}
          <a 
            href="https://wa.me/2348166634066" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    {/* Directions */}
    <div className="mt-8 flex justify-center">
      <a
        href="https://maps.app.goo.gl/yourMapUrl"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:scale-105"
      >
        <MapPinIcon className="h-5 w-5" />
        <span>Get Directions</span>
        <ArrowRightIcon className="h-4 w-4" />
      </a>
    </div>
  </div>
</footer>

      {/* Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" onClick={() => { setShowScheduler(false); setBookingStatus(null); }} />
            <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">Choose Appointment</h3>
                {bookingStatus === "success" && (
                  <p className="mt-2 text-sm text-emerald-600">Appointment booked successfully!</p>
                )}
                {bookingStatus === "error" && (
                  <p className="mt-2 text-sm text-red-600">Please fill in all fields and try again.</p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-900">
                    Date & Time
                  </label>
                  <div className="mt-1">
                    <DatePicker
                      id="date"
                      selected={selectedDateTime}
                      onChange={(date: Date | null) => setSelectedDateTime(date)}
                      showTimeSelect
                      filterDate={(date) => date.getDay() !== 0}
                      filterTime={(time) => {
                        const day = time.getDay();
                        const hours = time.getHours();
                        const minutes = time.getMinutes();
                        if (day >= 1 && day <= 5) {
                          return (hours > 8 || (hours === 8 && minutes >= 0)) && (hours < 17 || (hours === 17 && minutes === 0));
                        }
                        if (day === 6) {
                          return (hours > 9 || (hours === 9 && minutes >= 0)) && (hours < 15 || (hours === 15 && minutes === 0));
                        }
                        return false;
                      }}
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      placeholderText="Select date & time"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Your Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      value={selectedEmail}
                      onChange={(e) => setSelectedEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="block w-full rounded-lg border-gray-300 py-2.5 pl-3 pr-10 text-sm shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowScheduler(false); setBookingStatus(null); }}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (!selectedDateTime || !selectedEmail) {
                      setBookingStatus("error");
                      return;
                    }
                    try {
                      const res = await fetch("/api/book-appointment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ datetime: selectedDateTime, email: selectedEmail }),
                      });
                      if (res.ok) setBookingStatus("success");
                      else setBookingStatus("error");
                    } catch {
                      setBookingStatus("error");
                    }
                  }}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}