import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import StatsOverview from './components/StatsOverview';

const PortfolioShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Portfolio projects data
  const portfolioProjects = [
    {
      id: 1,
      title: "Echo Tours Lanka Website Development",
      client: "Echo Tours Lanka",
      category: "Tourism Website",
      description: "Echo Tours Lanka has excelled in website development tailored for local tourism. Their platform is intuitive, showcasing Global's rich tapestry of cultural, natural, and historical attractions with stunning visuals and detailed itineraries.",
      fullDescription: `Echo Tours Lanka has excelled in website development tailored for local tourism. Their platform is intuitive, showcasing Global's rich tapestry of cultural, natural, and historical attractions with stunning visuals and detailed itineraries. The site's design emphasizes user engagement through interactive maps, local insights, and an easy booking system. It highlights unique experiences like eco-tours, wildlife safaris, and authentic village visits, ensuring tourists connect deeply with Global's heritage. Their commitment to sustainability and community support is evident, promoting local businesses and conservation efforts. Echo Tours Lanka's website is a gateway to experiencing the authentic charm of Global.`,
      image: "/assets/image1.jpg",
      gallery: [
        "/assets/image1.jpg",
        "/assets/image1-1.jpg",
        "/assets/image1-2.jpg"
      ],
      technologies: ["React", "Node.js", "MongoDB"],
      rating: 4.8,
      duration: "3 months",
      teamSize: "4 members",
      impact: "+250% bookings",
      link: "https://echotourslanka.com/",
      challenge: "Creating an intuitive tourism platform that showcases Sri Lanka's attractions while providing seamless booking experiences and promoting sustainable tourism practices.",
      solution: "We developed a comprehensive tourism website with interactive maps, detailed itineraries, easy booking system, and mobile-responsive design that highlights unique experiences and promotes local businesses.",
      features: [
        "Interactive maps with local attractions",
        "Detailed itinerary planning",
        "Easy booking and reservation system",
        "Mobile-responsive design",
        "Eco-tour and wildlife safari sections",
        "Local business promotion",
        "Sustainability information",
        "Multi-language support"
      ],
      processSteps: [
        {
          title: "Research & Discovery",
          description: "Analyzed tourism market needs and studied competitor websites to understand user expectations and booking patterns.",
          duration: "1 week"
        },
        {
          title: "Design & Planning",
          description: "Created user-friendly interface design with focus on showcasing attractions and simplifying booking process.",
          duration: "2 weeks"
        },
        {
          title: "Development",
          description: "Built responsive website with React frontend, Node.js backend, and MongoDB database for content management.",
          duration: "8 weeks"
        },
        {
          title: "Testing & Optimization",
          description: "Conducted user testing, performance optimization, and mobile responsiveness validation.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Booking Increase", value: "+250%" },
        { label: "User Engagement", value: "+180%" },
        { label: "Mobile Traffic", value: "75%" }
      ],
      testimonial: {
        quote: "The website has transformed our business. We've seen incredible growth in bookings and our customers love the easy-to-use interface.",
        name: "Rajesh Perera",
        position: "Managing Director, Echo Tours Lanka",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      architecture: "React frontend with Node.js backend, MongoDB database, and responsive design optimized for tourism industry needs.",
      performance: [
        { metric: "Page Load Speed", score: 92 },
        { metric: "Mobile Performance", score: 95 },
        { metric: "User Experience", score: 94 },
        { metric: "Booking Conversion", score: 88 }
      ]
    },
    {
      id: 2,
      title: "Adspire DIGITAL Website Development",
      client: "Adspire Digital",
      category: "Digital Marketing",
      description: "Adspire Digital is a platform that offers a diverse range of marketing services. From social media management to digital advertising, they provide a one-stop solution for businesses seeking to elevate their online presence.",
      fullDescription: `Adspire Digital is a platform that offers a diverse range of marketing services. From social media management to digital advertising, they provide a one-stop solution for businesses seeking to elevate their online presence. With a team of experienced professionals, Adspire Digital ensures top-notch strategies tailored to each client's unique needs. Their commitment to excellence and innovation makes them a go-to destination for businesses looking to thrive in the digital landscape.`,
      image: "/assets/image2.jpg",
      gallery: [
        "/assets/image2.jpg",
        "/assets/image2-1.jpg",
        "/assets/image2-2.jpg"
      ],
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      rating: 4.7,
      duration: "2 months",
      teamSize: "3 members",
      impact: "+200% leads",
      link: "https://adspiredigital.co/",
      challenge: "Building a comprehensive digital marketing platform that showcases services effectively while generating quality leads and demonstrating expertise in digital marketing.",
      solution: "We created a modern, professional website with service showcases, case studies, client testimonials, and lead generation forms optimized for digital marketing industry.",
      features: [
        "Service portfolio showcase",
        "Case studies and success stories",
        "Client testimonials section",
        "Lead generation forms",
        "Social media integration",
        "SEO optimized content",
        "Contact and inquiry system",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Strategy Planning",
          description: "Developed digital marketing strategy and identified key services to highlight on the website.",
          duration: "1 week"
        },
        {
          title: "Content Creation",
          description: "Created compelling content, case studies, and service descriptions that showcase expertise.",
          duration: "2 weeks"
        },
        {
          title: "Website Development",
          description: "Built Vue.js frontend with Express backend and PostgreSQL database for content management.",
          duration: "6 weeks"
        },
        {
          title: "SEO & Launch",
          description: "Implemented SEO best practices and launched the website with ongoing optimization.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Lead Generation", value: "+200%" },
        { label: "Website Traffic", value: "+150%" },
        { label: "Conversion Rate", value: "12%" }
      ],
      testimonial: {
        quote: "Our new website has been a game-changer for our business. We're getting more qualified leads than ever before.",
        name: "Sarah Johnson",
        position: "CEO, Adspire Digital",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      architecture: "Vue.js frontend with Express.js backend, PostgreSQL database, and SEO-optimized structure for digital marketing services.",
      performance: [
        { metric: "Page Load Speed", score: 94 },
        { metric: "SEO Score", score: 96 },
        { metric: "Lead Conversion", score: 89 },
        { metric: "User Engagement", score: 91 }
      ]
    },
    {
      id: 3,
      title: "SoapstoRis Website Development",
      client: "SoapstoRis",
      category: "E-commerce",
      description: "SoapstoRis offers a variety of handmade soaps that are crafted with care and attention to detail. The website provides a range of unique scents and ingredients that cater to different preferences and skin types.",
      fullDescription: `SoapstoRis offers a variety of handmade soaps that are crafted with care and attention to detail. The website provides a range of unique scents and ingredients that cater to different preferences and skin types. With their dedication to quality and craftsmanship, SoapstoRis ensures that customers receive a luxurious and pampering experience with each use of their products.`,
      image: "/assets/image3.jpg",
      gallery: [
        "/assets/image3.jpg",
        "/assets/image3-1.jpg",
        "/assets/image3-2.jpg"
      ],
      technologies: ["Python", "TensorFlow", "NLP"],
      rating: 4.6,
      duration: "2 months",
      teamSize: "3 members",
      impact: "+180% sales",
      link: "https://soapstoris.com/",
      challenge: "Creating an e-commerce platform for handmade soaps that showcases product quality, provides detailed ingredient information, and offers seamless shopping experience.",
      solution: "We developed a beautiful e-commerce website with product galleries, detailed descriptions, ingredient information, and secure payment processing optimized for handmade soap business.",
      features: [
        "Product catalog with high-quality images",
        "Detailed ingredient information",
        "Shopping cart and checkout system",
        "Customer reviews and ratings",
        "Product categories and filtering",
        "Secure payment processing",
        "Order tracking system",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Product Photography",
          description: "Organized professional product photography to showcase soap quality and ingredients effectively.",
          duration: "1 week"
        },
        {
          title: "E-commerce Setup",
          description: "Configured e-commerce platform with payment processing, inventory management, and order tracking.",
          duration: "2 weeks"
        },
        {
          title: "Website Development",
          description: "Built custom e-commerce website with Python backend and modern frontend for optimal user experience.",
          duration: "5 weeks"
        },
        {
          title: "Testing & Launch",
          description: "Conducted thorough testing of payment processing and launched with ongoing support.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Sales Increase", value: "+180%" },
        { label: "Average Order Value", value: "+45%" },
        { label: "Customer Satisfaction", value: "96%" }
      ],
      testimonial: {
        quote: "The website perfectly captures the essence of our handmade soaps. Our customers love the detailed ingredient information and easy shopping experience.",
        name: "Maria Rodriguez",
        position: "Founder, SoapstoRis",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      architecture: "Python-based e-commerce platform with TensorFlow for recommendation engine, NLP for search functionality, and secure payment processing.",
      performance: [
        { metric: "Page Load Speed", score: 91 },
        { metric: "Payment Security", score: 100 },
        { metric: "Mobile Usability", score: 93 },
        { metric: "Search Accuracy", score: 89 }
      ]
    },
    {
      id: 4,
      title: "ELINE Technologies Website Development",
      client: "ELINE Technologies",
      category: "Technology Services",
      description: "Elinetechnologies.com is a platform offering a range of tech solutions. The site provides services like web development, app design, and digital marketing.",
      fullDescription: `Elinetechnologies.com is a platform offering a range of tech solutions. The site provides services like web development, app design, and digital marketing. This one-stop-shop approach simplifies the process for businesses seeking to enhance their online presence. By offering diverse services under one roof, elinetechnologies.com makes it convenient for clients to address multiple digital needs efficiently.`,
      image: "/assets/image4.jpg",
      gallery: [
        "/assets/image4.jpg",
        "/assets/image4-1.jpg",
        "/assets/image4-2.jpg"
      ],
      technologies: ["React Native", "Firebase", "GraphQL"],
      rating: 4.5,
      duration: "3 months",
      teamSize: "5 members",
      impact: "+220% inquiries",
      link: "https://elinetechnologies.com/",
      challenge: "Creating a comprehensive technology services website that showcases diverse capabilities while maintaining professional credibility and generating quality leads.",
      solution: "We developed a modern, professional website that effectively communicates technical expertise across multiple service areas with clear value propositions and easy contact methods.",
      features: [
        "Service portfolio showcase",
        "Technology expertise display",
        "Client case studies",
        "Contact and inquiry forms",
        "Blog and resources section",
        "Team and company information",
        "Project gallery",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Service Analysis",
          description: "Analyzed all technology services to create comprehensive service descriptions and value propositions.",
          duration: "1 week"
        },
        {
          title: "Content Strategy",
          description: "Developed content strategy to showcase technical expertise and build credibility in the market.",
          duration: "2 weeks"
        },
        {
          title: "Website Development",
          description: "Built React Native-based website with Firebase backend and GraphQL for efficient data management.",
          duration: "8 weeks"
        },
        {
          title: "Content & Launch",
          description: "Added all content, conducted testing, and launched with ongoing optimization.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Inquiry Increase", value: "+220%" },
        { label: "Service Page Views", value: "+190%" },
        { label: "Contact Form Submissions", value: "+160%" }
      ],
      testimonial: {
        quote: "The website perfectly represents our technical capabilities. We've seen a significant increase in quality inquiries from potential clients.",
        name: "David Chen",
        position: "CTO, ELINE Technologies",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      architecture: "React Native frontend with Firebase backend, GraphQL for data management, and responsive design optimized for technology services.",
      performance: [
        { metric: "Page Load Speed", score: 93 },
        { metric: "Mobile Performance", score: 92 },
        { metric: "Service Discovery", score: 88 },
        { metric: "Lead Quality", score: 85 }
      ]
    },
    {
      id: 5,
      title: "Heartland Trading Website Development",
      client: "Heartland Trading",
      category: "E-commerce",
      description: "User-Friendly Interface: The website's easy-to-navigate interface ensures a smooth shopping experience. This makes finding and purchasing items hassle-free.",
      fullDescription: `User-Friendly Interface: The website's easy-to-navigate interface ensures a smooth shopping experience. This makes finding and purchasing items hassle-free. Secure Transactions: Heartland-Trading.com prioritizes the security of online transactions. Customers can shop with confidence knowing their information is protected. Heartland-Trading.com stands out for its quality products, user-friendly interface, and commitment to customer security, making it a reliable choice for online shopping.`,
      image: "/assets/image5.jpg",
      gallery: [
        "/assets/image5.jpg",
        "/assets/image5-1.jpg",
        "/assets/image5-2.jpg"
      ],
      technologies: ["Next.js", "WebRTC", "Socket.io"],
      rating: 4.4,
      duration: "4 months",
      teamSize: "6 members",
      impact: "+300% transactions",
      link: "https://heartland-trading.com/",
      challenge: "Building a secure, user-friendly e-commerce platform that prioritizes customer security while providing smooth shopping experiences and reliable transaction processing.",
      solution: "We developed a secure e-commerce platform with advanced security measures, intuitive navigation, and real-time features for enhanced customer experience.",
      features: [
        "Secure payment processing",
        "User-friendly navigation",
        "Product search and filtering",
        "Shopping cart functionality",
        "Order tracking system",
        "Customer account management",
        "Real-time notifications",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Security Analysis",
          description: "Conducted comprehensive security analysis and implemented advanced security measures for e-commerce transactions.",
          duration: "2 weeks"
        },
        {
          title: "UX Design",
          description: "Designed intuitive user interface focusing on ease of navigation and smooth shopping experience.",
          duration: "3 weeks"
        },
        {
          title: "Platform Development",
          description: "Built Next.js-based e-commerce platform with WebRTC for real-time features and Socket.io for notifications.",
          duration: "10 weeks"
        },
        {
          title: "Security Testing",
          description: "Conducted extensive security testing and performance optimization before launch.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Transaction Volume", value: "+300%" },
        { label: "Security Score", value: "98%" },
        { label: "User Satisfaction", value: "94%" }
      ],
      testimonial: {
        quote: "The security and user experience of our new website has given our customers complete confidence in shopping with us.",
        name: "James Wilson",
        position: "Operations Manager, Heartland Trading",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      },
      architecture: "Next.js e-commerce platform with WebRTC for real-time features, Socket.io for notifications, and advanced security measures for secure transactions.",
      performance: [
        { metric: "Security Score", score: 98 },
        { metric: "Transaction Speed", score: 95 },
        { metric: "User Experience", score: 94 },
        { metric: "Mobile Performance", score: 92 }
      ]
    },
    {
      id: 6,
      title: "Champika Export Marketing Website Development",
      client: "Champika Export Marketing",
      category: "Export Business",
      description: "Champika Export Marketing's website showcases a variety of products and services. This online platform provides a convenient way for customers to explore the offerings and contact the company for further information.",
      fullDescription: `Champika Export Marketing's website showcases a variety of products and services. This online platform provides a convenient way for customers to explore the offerings and contact the company for further information. The website's design and user interface play a crucial role in attracting potential clients and creating a positive impression of the business. This digital presence is essential for modern businesses to stay competitive in the global market.`,
      image: "/assets/image6.jpg",
      gallery: [
        "/assets/image6.jpg",
        "/assets/image6-1.jpg",
        "/assets/image6-2.jpg"
      ],
      technologies: ["IoT", "React", "MQTT"],
      rating: 4.3,
      duration: "2 months",
      teamSize: "4 members",
      impact: "+150% exports",
      link: "https://champikaexportmarketing.com/",
      challenge: "Creating a professional export business website that effectively showcases products and services while building international credibility and facilitating global business connections.",
      solution: "We developed a professional export business website with product showcases, company credentials, and easy contact methods optimized for international business development.",
      features: [
        "Product catalog with specifications",
        "Company credentials and certifications",
        "Export capabilities showcase",
        "Contact and inquiry forms",
        "Multi-language support",
        "International shipping information",
        "Quality assurance details",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Business Analysis",
          description: "Analyzed export business requirements and identified key products and services to highlight.",
          duration: "1 week"
        },
        {
          title: "Content Development",
          description: "Created professional content showcasing export capabilities and company credentials.",
          duration: "2 weeks"
        },
        {
          title: "Website Development",
          description: "Built React-based website with IoT integration and MQTT for real-time updates and monitoring.",
          duration: "5 weeks"
        },
        {
          title: "International Optimization",
          description: "Optimized website for international audiences and launched with ongoing support.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Export Inquiries", value: "+150%" },
        { label: "International Reach", value: "+200%" },
        { label: "Business Credibility", value: "95%" }
      ],
      testimonial: {
        quote: "Our website has opened doors to international markets we never thought possible. The professional presentation has built trust with global clients.",
        name: "Champika Silva",
        position: "Director, Champika Export Marketing",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      architecture: "React frontend with IoT integration, MQTT for real-time monitoring, and responsive design optimized for international export business.",
      performance: [
        { metric: "International Load Speed", score: 90 },
        { metric: "Multi-language Support", score: 95 },
        { metric: "Business Credibility", score: 94 },
        { metric: "Lead Generation", score: 87 }
      ]
    },
    {
      id: 7,
      title: "Ride With Me Website Development",
      client: "Ride With Me",
      category: "Transportation",
      description: "RideWithMee.lk is a platform that connects riders with drivers for convenient and safe transportation. Riders can easily book rides through the website, ensuring a hassle-free experience.",
      fullDescription: `RideWithMee.lk is a platform that connects riders with drivers for convenient and safe transportation. Riders can easily book rides through the website, ensuring a hassle-free experience. The platform offers a reliable and efficient way for users to travel to their destinations, making it a popular choice for those looking for transportation solutions.`,
      image: "/assets/image7.jpg",
      gallery: [
        "/assets/image7.jpg",
        "/assets/image7-1.jpg",
        "/assets/image7-2.jpg"
      ],
      technologies: ["Solidity", "Ethereum", "Web3.js"],
      rating: 4.2,
      duration: "5 months",
      teamSize: "8 members",
      impact: "+400% bookings",
      link: "https://ridewithmee.lk/",
      challenge: "Creating a reliable transportation platform that connects riders with drivers while ensuring safety, convenience, and seamless booking experiences.",
      solution: "We developed a comprehensive ride-sharing platform with blockchain integration for secure transactions, real-time tracking, and user safety features.",
      features: [
        "Easy ride booking system",
        "Real-time driver tracking",
        "Secure payment processing",
        "User rating and review system",
        "Safety features and emergency contacts",
        "Driver verification system",
        "Fare calculation and estimation",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Platform Architecture",
          description: "Designed comprehensive ride-sharing platform architecture with focus on safety and user experience.",
          duration: "2 weeks"
        },
        {
          title: "Blockchain Integration",
          description: "Integrated Solidity smart contracts with Ethereum blockchain for secure transactions and user verification.",
          duration: "4 weeks"
        },
        {
          title: "Core Development",
          description: "Built ride booking system, driver matching, and real-time tracking features with Web3.js integration.",
          duration: "12 weeks"
        },
        {
          title: "Safety & Testing",
          description: "Implemented safety features, conducted comprehensive testing, and launched with ongoing monitoring.",
          duration: "2 weeks"
        }
      ],
      metrics: [
        { label: "Booking Volume", value: "+400%" },
        { label: "User Safety Score", value: "97%" },
        { label: "Driver Satisfaction", value: "92%" }
      ],
      testimonial: {
        quote: "The platform has revolutionized transportation in our area. Users love the safety features and drivers appreciate the fair payment system.",
        name: "Nimal Perera",
        position: "Founder, Ride With Me",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      architecture: "Blockchain-based ride-sharing platform using Solidity smart contracts, Ethereum blockchain, and Web3.js for secure transactions and user verification.",
      performance: [
        { metric: "Transaction Security", score: 99 },
        { metric: "Real-time Tracking", score: 96 },
        { metric: "User Safety", score: 97 },
        { metric: "Platform Reliability", score: 94 }
      ]
    },
    {
      id: 8,
      title: "Twilight Blue Security Systems Website Development",
      client: "Twilight Blue Security Systems",
      category: "Security Services",
      description: "Our mission is to help enterprises accelerate adoption of new technologies, untangle complex issues that always emerge during digital evolution, and orchestrate ongoing innovation.",
      fullDescription: `Our mission is to help enterprises accelerate adoption of new technologies, untangle complex issues that always emerge during digital evolution, and orchestrate ongoing innovation. If you are looking for a trustworthy and reputable company to build your operational Security Systems or transform your systems. Thank you for reaching out to Twilight Blue! Please fill the form right.`,
      image: "/assets/image8.jpg",
      gallery: [
        "/assets/image8.jpg",
        "/assets/image8-1.jpg",
        "/assets/image8-2.jpg"
      ],
      technologies: ["Unity", "ARKit", "C#"],
      rating: 4.1,
      duration: "3 months",
      teamSize: "5 members",
      impact: "+120% security contracts",
      link: "https://tbsst.ae/",
      challenge: "Creating a professional security systems website that builds trust and credibility while showcasing technical expertise in security solutions and digital transformation.",
      solution: "We developed a comprehensive security services website with AR demonstrations, interactive features, and professional presentation of security solutions.",
      features: [
        "Security solutions showcase",
        "AR-powered demonstrations",
        "Interactive service presentations",
        "Client testimonials and case studies",
        "Contact and inquiry forms",
        "Technology expertise display",
        "Security certifications",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Security Analysis",
          description: "Analyzed security industry requirements and identified key services and technologies to highlight.",
          duration: "1 week"
        },
        {
          title: "AR Development",
          description: "Developed AR demonstrations using Unity and ARKit to showcase security solutions interactively.",
          duration: "4 weeks"
        },
        {
          title: "Website Development",
          description: "Built comprehensive website with C# backend and interactive features for security services presentation.",
          duration: "6 weeks"
        },
        {
          title: "Integration & Launch",
          description: "Integrated AR features, conducted testing, and launched with ongoing support and updates.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Security Contracts", value: "+120%" },
        { label: "AR Engagement", value: "+180%" },
        { label: "Client Trust Score", value: "96%" }
      ],
      testimonial: {
        quote: "The AR demonstrations on our website have been a game-changer. Clients can now see our security solutions in action before committing.",
        name: "Ahmed Hassan",
        position: "CEO, Twilight Blue Security Systems",
        avatar: "https://randomuser.me/api/portraits/men/47.jpg"
      },
      architecture: "Unity-based AR demonstrations with ARKit integration, C# backend for security services, and interactive website for professional presentation.",
      performance: [
        { metric: "AR Performance", score: 92 },
        { metric: "Security Credibility", score: 96 },
        { metric: "Client Engagement", score: 89 },
        { metric: "Mobile AR Support", score: 88 }
      ]
    },
    {
      id: 9,
      title: "X-guard Website Development",
      client: "X-guard",
      category: "Security Services",
      description: "AD CAUSAM SUPERIOREM We can tailor-fit services to meet your requirements and exceed expectations. Our highly skilled managers can sit with you to discuss the best-fit solution for you, and they will advise you on your needs.",
      fullDescription: `AD CAUSAM SUPERIOREM We can tailor-fit services to meet your requirements and exceed expectations. Our highly skilled managers can sit with you to discuss the best-fit solution for you, and they will advise you on your needs.`,
      image: "/assets/image9.jpg",
      gallery: [
        "/assets/image9.jpg",
        "/assets/image9-1.jpg",
        "/assets/image9-2.jpg"
      ],
      technologies: ["Python", "scikit-learn", "Flask"],
      rating: 4.0,
      duration: "2 months",
      teamSize: "4 members",
      impact: "+100% consultations",
      link: "https://x-guard.lk/",
      challenge: "Creating a professional security services website that emphasizes personalized solutions and expert consultation while building client trust and credibility.",
      solution: "We developed a professional security services website with consultation booking, service customization features, and expert advisor profiles to showcase expertise.",
      features: [
        "Personalized service consultation",
        "Expert advisor profiles",
        "Service customization tools",
        "Client consultation booking",
        "Security assessment forms",
        "Case studies and testimonials",
        "Contact and inquiry system",
        "Mobile-responsive design"
      ],
      processSteps: [
        {
          title: "Service Analysis",
          description: "Analyzed security services and consultation processes to create effective service presentation and booking system.",
          duration: "1 week"
        },
        {
          title: "Consultation System",
          description: "Developed consultation booking system and expert advisor matching using Python and scikit-learn.",
          duration: "3 weeks"
        },
        {
          title: "Website Development",
          description: "Built Flask-based website with consultation features and professional service presentation.",
          duration: "4 weeks"
        },
        {
          title: "Testing & Launch",
          description: "Conducted testing of consultation system and launched with ongoing optimization.",
          duration: "1 week"
        }
      ],
      metrics: [
        { label: "Consultation Bookings", value: "+100%" },
        { label: "Service Customization", value: "+150%" },
        { label: "Client Satisfaction", value: "94%" }
      ],
      testimonial: {
        quote: "The consultation system has streamlined our client onboarding process. Clients appreciate the personalized approach and expert guidance.",
        name: "Lisa Thompson",
        position: "Security Consultant, X-guard",
        avatar: "https://randomuser.me/api/portraits/women/39.jpg"
      },
      architecture: "Flask-based website with Python backend, scikit-learn for consultation matching, and responsive design optimized for security services consultation.",
      performance: [
        { metric: "Consultation Matching", score: 91 },
        { metric: "Service Personalization", score: 89 },
        { metric: "Client Onboarding", score: 93 },
        { metric: "Expert Availability", score: 87 }
      ]
    }
  ];

  // Portfolio statistics
  const portfolioStats = [
    {
      label: "Projects Completed",
      value: "150+",
      icon: "Briefcase",
      trend: 12
    },
    {
      label: "Happy Clients",
      value: "98%",
      icon: "Heart",
      trend: 5
    },
    {
      label: "Technologies Mastered",
      value: "50+",
      icon: "Code",
      trend: 8
    },
    {
      label: "Awards Won",
      value: "25",
      icon: "Award",
      trend: 15
    }
  ];



  // Extract unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    portfolioProjects?.forEach(project => {
      project?.technologies?.forEach(tech => techSet?.add(tech));
    });
    return Array.from(techSet)?.sort();
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = portfolioProjects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(project => project?.category === selectedCategory);
    }

    // Filter by technology
    if (selectedTechnology) {
      filtered = filtered?.filter(project =>
        project?.technologies?.includes(selectedTechnology)
      );
    }

    // Sort projects
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'impact':
          return parseInt(b?.impact?.replace(/[^\d]/g, '')) - parseInt(a?.impact?.replace(/[^\d]/g, ''));
        case 'duration':
          return parseInt(b?.duration?.split(' ')?.[0]) - parseInt(a?.duration?.split(' ')?.[0]);
        case 'recent':
        default:
          return b?.id - a?.id;
      }
    });

    return filtered;
  }, [selectedCategory, selectedTechnology, sortBy]);

  const handleExploreProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4 sm:gap-6';
      case 'masonry':
        return 'columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-base via-white to-glass-surface">
      <SEO {...generatePageSEO('portfolio')} />
      <Helmet>
        <title>Portfolio Showcase - GlassForge Studio | Interactive 3D Project Gallery</title>
        <meta name="description" content="Explore our portfolio of cutting-edge digital experiences through interactive 3D glass containers. Discover web applications, mobile apps, and enterprise solutions crafted with precision." />
        <meta name="keywords" content="portfolio, 3D showcase, web development, mobile apps, enterprise software, glass morphism, interactive design" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
      </div>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-glass-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 glass-morphism px-4 py-2 rounded-full mb-6">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span className="text-sm font-medium text-glass-text-secondary">Portfolio Dimension Zones</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-glass-text-primary mb-4 sm:mb-6">
                Crafted Digital
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-glass-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                Explore our portfolio through interactive 3D glass containers, where each project exists in its own dimensional space with unique refractions and immersive storytelling.
              </p>
            </motion.div>

            {/* Portfolio Stats */}
            <StatsOverview stats={portfolioStats} />
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            {/* Results Count */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-glass-text-secondary" />
                <span className="text-sm sm:text-base text-glass-text-secondary">
                  Showing {filteredProjects?.length} of {portfolioProjects?.length} projects
                </span>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className={getGridClasses()}>
              {filteredProjects?.map((project, index) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  index={index}
                  onExplore={handleExploreProject}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects?.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-glass-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-glass-text-primary mb-2">No Projects Found</h3>
                <p className="text-glass-text-secondary mb-6">
                  Try adjusting your filters to discover more amazing projects.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTechnology('');
                  }}
                  className="glass-interactive border-primary/20 text-primary hover:bg-primary/10"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="glass-morphism rounded-3xl p-12 backdrop-blur-glass-heavy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl font-bold text-glass-text-primary mb-4">
                Ready to Create Something Amazing?
              </h2>

              <p className="text-xl text-glass-text-secondary mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with cutting-edge technology and innovative design approaches.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glass-subtle"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-interactive border-white/20 text-glass-text-primary hover:bg-white/10"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioShowcase;