"use client"
import { useState, useEffect, useRef } from "react"
import { Cpu, ShieldCheck, Network, Workflow, ArrowRight, Menu, X, ChevronDown } from "lucide-react"

export default function Hero() {
    const [typedText, setTypedText] = useState("")
    const [loopText, setLoopText] = useState("")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [parallaxFragments, setParallaxFragments] = useState([])
    const [isHovered, setIsHovered] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalClosing, setModalClosing] = useState(false)
    const containerRef = useRef(null)

    const fullText = "Cutting-Edge Solutions"
    const phrases = ["Web Development", "App Development", "Custom Software", "POS Solutions", "CCTV & Networking"]

    useEffect(() => {
        let index = 0
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index))
                index++
            } else {
                clearInterval(timer)
            }
        }, 50)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        let phraseIndex = 0
        let charIndex = 0
        let deleting = false
        let timeout

        const tick = () => {
            const current = phrases[phraseIndex] || ""
            if (!deleting) {
                if (charIndex <= current.length) {
                    setLoopText(current.slice(0, charIndex))
                    charIndex++
                    timeout = setTimeout(tick, 100)
                } else {
                    deleting = true
                    timeout = setTimeout(tick, 1000)
                }
            } else {
                if (charIndex > 0) {
                    charIndex--
                    setLoopText(current.slice(0, charIndex))
                    timeout = setTimeout(tick, 50)
                } else {
                    deleting = false
                    phraseIndex = (phraseIndex + 1) % phrases.length
                    timeout = setTimeout(tick, 300)
                }
            }
        }

        tick()
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const fragments = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            scale: 0.6 + Math.random() * 0.4,
            delay: i * 0.05,
        }))
        setParallaxFragments(fragments)
    }, [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                // prefer the animated close
                startClosePreview()
            }
        }
        if (previewOpen) window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [previewOpen])

    // keep modalVisible in sync so we can animate out before unmount
    useEffect(() => {
        if (previewOpen) setModalVisible(true)
    }, [previewOpen])

    const startClosePreview = () => {
        // trigger close animation, then fully hide
        setModalClosing(true)
        setTimeout(() => {
            setModalClosing(false)
            setModalVisible(false)
            setPreviewOpen(false)
        }, 260)
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x, y })
    }

    const features = [
        {
            icon: Cpu,
            label: "Next-Gen Digital Solutions",
            desc: "Future-ready tech for modern business",
            color: "from-sky-500 to-blue-600",
        },
        {
            icon: ShieldCheck,
            label: "Advanced Security & Surveillance",
            desc: "Smart systems to keep you protected",
            color: "from-purple-500 to-indigo-600",
        },
        {
            icon: Network,
            label: "Smart Infrastructure Design",
            desc: "Efficient, scalable IT frameworks",
            color: "from-emerald-500 to-green-600",
        },
        {
            icon: Workflow,
            label: "Reliable System Integration",
            desc: "Seamless tech connectivity made easy",
            color: "from-amber-500 to-orange-600",
        },
    ]

    const navItems = ["Solutions", "Services", "About", "Contact"]

    return (
        <>
            <section
                ref={containerRef}
                className={`relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 ${modalVisible ? "filter blur-sm" : ""
                    }`}
                onMouseMove={handleMouseMove}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
                    <div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-6 md:space-y-8">
                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-balance">
                                    <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 bg-clip-text text-transparent">
                                        {typedText}
                                    </span>
                                    <span className="animate-pulse text-blue-500">|</span>
                                </h1>

                                {/* Looping Text */}
                                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-700 min-h-12">
                                    <span className="text-blue-600">{loopText}</span>
                                    <span className="animate-pulse text-blue-500 ml-1">|</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                                We design and build digital products that are fast, accessible, and delightful. Our team blends design,
                                animation, and engineering to ship production-ready web experiences.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                                {features.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
                                        style={{
                                            animation: `slideInUp 0.6s ease-out ${i * 0.1}s both`,
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 flex-shrink-0`}
                                            >
                                                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">{feature.label}</div>
                                                <div className="text-xs text-slate-500 line-clamp-2">{feature.desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-96 md:h-[500px] lg:h-[600px] hidden lg:block">
                            {/* Desktop Parallax with 3D transforms */}
                            <div className="relative w-full h-full perspective">
                                {parallaxFragments.map((fragment) => (
                                    <div
                                        key={fragment.id}
                                        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl"
                                        style={{
                                            left: `${50 + fragment.x}%`,
                                            top: `${50 + fragment.y}%`,
                                            transform: `
                        translate(-50%, -50%)
                        rotateX(${mousePosition.y * 20}deg)
                        rotateY(${mousePosition.x * 20}deg)
                        rotateZ(${fragment.rotation}deg)
                        scale(${fragment.scale})
                        translateY(${scrollY * 0.5}px)
                      `,
                                            transition: "transform 0.1s ease-out",
                                            transitionDelay: `${fragment.delay}s`,
                                            backgroundImage: `url('/brand1.png')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20" />
                                    </div>
                                ))}

                                {/* Center focal point */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className={`w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm cursor-pointer relative transition-all duration-700 ease-out ${isHovered ? "p-3" : "p-0"
                                            }`}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={() => setPreviewOpen(true)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") setPreviewOpen(true)
                                        }}
                                    >
                                        <img
                                            src={isHovered ? "/new01brand.jpg" : "/brand2.png"}
                                            alt="Central showcase"
                                            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-95" : "scale-100"
                                                }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:hidden relative h-80 sm:h-96">
                            <div className="relative w-full h-full">
                                {/* Stacked cards effect for mobile */}
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="absolute w-full h-64 rounded-3xl overflow-hidden shadow-xl"
                                        style={{
                                            top: `${i * 20}px`,
                                            left: `${i * 10}px`,
                                            transform: `translateY(${scrollY * 0.3}px) scale(${1 - i * 0.05})`,
                                            zIndex: 10 - i,
                                            backgroundImage: `url('/brand1.png')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-sm text-slate-600 font-medium">Scroll to explore</span>
                    <ChevronDown size={20} className="text-blue-600" />
                </div>

                <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .perspective {
            perspective: 1000px;
          }

          /* Modal animations */
          @keyframes modalIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes modalOut {
            from { opacity: 1 }
            to { opacity: 0 }
          }

          @keyframes imageIn {
            from { transform: scale(0.96); opacity: 0 }
            to { transform: scale(1); opacity: 1 }
          }

          @keyframes imageOut {
            from { transform: scale(1); opacity: 1 }
            to { transform: scale(0.96); opacity: 0 }
          }

          .animate-modal-in { animation: modalIn 220ms ease-out both }
          .animate-modal-out { animation: modalOut 220ms ease-in both }
          .animate-image-in { animation: imageIn 260ms cubic-bezier(.2,.9,.2,1) both }
          .animate-image-out { animation: imageOut 240ms cubic-bezier(.4,.85,.2,1) both }
        `}</style>
            </section>
            {modalVisible && (
                <div
                    className={`fixed inset-0 z-60 flex items-center justify-center bg-black/60 ${modalClosing ? "animate-modal-out" : "animate-modal-in"
                        }`}
                    onClick={() => startClosePreview()}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={`relative max-w-3xl w-[90%] bg-transparent rounded-xl overflow-hidden transform transition-all ${modalClosing ? "animate-image-out" : "animate-image-in"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white"
                            onClick={() => startClosePreview()}
                            aria-label="Close preview"
                        >
                            <X size={18} />
                        </button>
                        <img src="/new01brand.jpg" alt="Preview" className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                </div>
            )}
        </>
    )
}
