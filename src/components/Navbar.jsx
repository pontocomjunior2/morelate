import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed left-0 right-0 mx-auto z-50 transition-all duration-500 ease-in-out
        ${isScrolled ? 'top-2 w-[95%] glass-menu scrolled rounded-2xl' : 'top-6 w-[92%] glass-menu rounded-2xl'}
        ${isMobileMenuOpen ? 'rounded-t-2xl rounded-b-none' : ''}`}
        >
            <div className="px-6 sm:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center gap-3">
                        <img src="/Logo-Morelate-.webp" alt="Morelate" className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/catalog">Catálogo</NavLink>
                            <NavLink to="/about">Sobre</NavLink>
                            <NavLink to="/admin" className="text-brand-400 hover:text-brand-300">Admin</NavLink>
                        </div>
                    </div>

                    {/* Icons Right */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/catalog" className="relative group cursor-pointer">
                            <i className="fa-solid fa-magnifying-glass text-gray-300 group-hover:text-white transition-colors text-lg"></i>
                        </Link>
                        <button className="px-5 py-2 glass-panel rounded-full text-sm font-semibold text-white hover:bg-white hover:text-slate-900 transition-all duration-300 border border-white/20 shadow-lg">
                            Área do Cliente
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/5 bg-slate-900/90 backdrop-blur-xl rounded-b-2xl absolute w-full left-0 top-full overflow-hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/">Home</MobileNavLink>
                        <MobileNavLink to="/catalog">Catálogo</MobileNavLink>
                        <MobileNavLink to="/about">Sobre</MobileNavLink>
                        <MobileNavLink to="/admin">Área Admin</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ to, children, className }) {
    return (
        <Link
            to={to}
            className={`text-gray-300 hover:text-[#08e689] relative group px-3 py-2 text-sm font-medium transition-colors ${className}`}
        >
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#08e689] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
    );
}

function MobileNavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5 hover:text-white"
        >
            {children}
        </Link>
    );
}
