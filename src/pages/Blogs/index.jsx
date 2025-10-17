import React, { useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import SEO from '../../components/SEO';
import { generatePageSEO } from '../../utils/seoUtils';
import BlogHero from './components/BlogHero';
import BlogCard from './components/BlogCard';
import Sidebar from './components/Sidebar';
import POSTS from './data';
import Footer from '../../components/ui/Footer';
import FloatingNavigation from '../services-revelation/components/FloatingNavigation';

export default function BlogsPage() {
  const [query, setQuery] = useState('');
  const [floatingActive, setFloatingActive] = useState('list');

  const navSections = [
    { id: 'list', title: 'Articles', icon: 'FileText' },
    { id: 'sidebar', title: 'Sidebar', icon: 'Sidebar' },
  ];

  const handleFloatingChange = (id) => {
    setFloatingActive(id);
    if (id === 'list') return window.scrollTo({ top: 0, behavior: 'smooth' });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const posts = useMemo(() => {
    if (!query) return POSTS;
    return POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <>
      <SEO {...generatePageSEO('blogs')} />
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>

        <main className="container pt-20 md:pt-28 pb-16">
          <BlogHero total={POSTS.length} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side: blog list */}
            <div id="list" className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {posts.length} articles
                </div>
                <div className="w-full sm:w-72">
                  <input
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    placeholder="Search articles"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>

            {/* Right side: sidebar */}
            <div>
              <Sidebar onSearch={(q) => setQuery(q)} />
            </div>
          </div>
			<FloatingNavigation sections={navSections} activeSection={floatingActive} onSectionChange={handleFloatingChange} />
			</main>

			<Footer />
      </div>
    </>
  );
}
