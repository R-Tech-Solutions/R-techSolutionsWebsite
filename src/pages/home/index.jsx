import React, { useEffect } from "react";
import Header from "../../components/ui/Header";
import SEO from "../../components/SEO";
import { generatePageSEO } from "../../utils/seoUtils";
import Hero from "./components/Hero";
import DownloadBundle from "./components/DownloadBundle";
import TrustedLogos from "./components/TrustedLogos";
import Testimonials from "./components/Testimonials";
import TechStack from "./components/TechStack";
import ClientsScroller from "./components/ClientsScroller";
import FloatingNavigation from '../services-revelation/components/FloatingNavigation';

const TABS = [
	{ id: 'home', label: 'Home' },
	{ id: 'download', label: 'Download' },
	{ id: 'trusted', label: 'Trusted' },
	{ id: 'testimonials', label: 'Testimonials' },
	{ id: 'tech', label: 'Technology' },
	{ id: 'clients', label: 'Clients' },
];

export default function Home() {
	const [floatingActive, setFloatingActive] = React.useState('home');

	const navSections = [
		{ id: 'home', title: 'Home', icon: 'Home' },
		{ id: 'trusted', title: 'Trusted', icon: 'Users' },
		{ id: 'clients', title: 'Clients', icon: 'Users' },
	];

	const handleFloatingChange = (id) => {
		setFloatingActive(id);
		if (id === 'home') return window.scrollTo({ top: 0, behavior: 'smooth' });
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	return (
		<main className="min-h-screen bg-background text-foreground">
			<SEO {...generatePageSEO('home')} />
			<Header />

			<div className="container mx-auto">
				<section id="home"><Hero /></section>
				<section id="download"><DownloadBundle /></section>
				<section id="trusted"><TrustedLogos /></section>
				<section id="testimonials"><Testimonials /></section>
				<section id="tech"><TechStack /></section>
				<section id="clients"><ClientsScroller /></section>
				<FloatingNavigation sections={navSections} activeSection={floatingActive} onSectionChange={handleFloatingChange} />
			</div>
		</main>
	);
}

