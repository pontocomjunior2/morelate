import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50 relative selection:bg-brand-600 selection:text-white">
            <Navbar />
            <main className="flex-grow pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
