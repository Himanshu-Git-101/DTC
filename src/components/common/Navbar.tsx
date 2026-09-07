import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Problem', href: '#problem' },
  { label: 'H-ASP Solution', href: '#solution' },
  { label: 'Cold Plate', href: '#coldplate' },
  { label: 'Exploded View', href: '#exploded' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Validation & Data', href: '#results' },
  { label: 'Virtual Lab', href: '#virtual-lab', badge: 'Interactive' },
  { label: 'Applications', href: '#applications' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Web Tech', href: '#tech-stack' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-dtc-bg/85 backdrop-blur-md border-b border-[#DCE4EE] dark:border-white/10 shadow-[0_4px_20px_rgba(11,18,32,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-white/50 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#overview"
          onClick={(e) => scrollToSection(e, '#overview')}
          className="flex items-center gap-3 group select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-blue-500/40 dark:border-dtc-cyan/40 flex items-center justify-center relative shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-blue-600 dark:group-hover:border-dtc-cyan group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] dark:group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-dtc-cyan group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-600 dark:bg-dtc-cyan animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#0B1220] dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-dtc-cyan transition-colors">
              DTC <span className="text-blue-600 dark:text-dtc-cyan">//</span> COOL
            </span>
            <span className="text-[10px] font-mono text-[#526174] dark:text-slate-400 -mt-0.5 tracking-wider hidden sm:block">
              H-ASP THERMAL ARCHITECTURE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/80 dark:bg-slate-900/60 p-1 rounded-full border border-[#DCE4EE] dark:border-white/5 backdrop-blur-md shadow-sm dark:shadow-none">
          {NAV_ITEMS.slice(0, 8).map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all relative ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold shadow-sm border border-blue-100 dark:text-dtc-cyan dark:bg-dtc-cyan/10 dark:border-transparent dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action / Telemetry + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <ThemeToggle />

          <a
            href="#virtual-lab"
            onClick={(e) => scrollToSection(e, '#virtual-lab')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs text-amber-700 bg-amber-50 border border-amber-200/80 hover:bg-amber-100 dark:text-dtc-warm dark:bg-dtc-warm/10 dark:border-dtc-warm/30 dark:hover:bg-dtc-warm/20 transition-all shadow-sm dark:shadow-none"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Lab</span>
          </a>

          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const el = document.getElementById('solution');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={ChevronRight}
          >
            Explore H-ASP
          </Button>
        </div>

        {/* Mobile Nav Header (Theme Toggle + Hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#DCE4EE] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-dtc-cyan transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm dark:shadow-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Tablet Menu Trigger (Hidden on Desktop) */}
        <div className="hidden sm:flex xl:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#DCE4EE] dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-dtc-cyan transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm dark:shadow-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-dtc-bg/95 backdrop-blur-xl border-b border-[#DCE4EE] dark:border-slate-800 p-6 shadow-2xl transition-all max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-[#DCE4EE] dark:border-slate-800 flex items-center justify-between">
              <span>Navigation Menu</span>
              <span className="text-blue-600 dark:text-dtc-cyan font-semibold">WOXSEN UNIVERSITY</span>
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-sm transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 dark:bg-dtc-cyan/15 dark:text-dtc-cyan dark:border-dtc-cyan/30'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 dark:bg-dtc-warm/20 dark:text-dtc-warm dark:border-dtc-warm/30">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#DCE4EE] dark:border-slate-800 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('virtual-lab')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Launch Virtual Engineering Lab
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
