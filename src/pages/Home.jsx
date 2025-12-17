import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jacsys } from '../services/jacsys';

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Get fake featured products
        const products = jacsys.getProducts().filter(p => p.featured).slice(0, 4);
        setFeaturedProducts(products);
    }, []);

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden -mt-24">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
                        alt="Caminhão moderno"
                        className="w-full h-full object-cover opacity-90 scale-105 animate-pulse-slow" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 hero-overlay"></div>

                {/* Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-1 mb-6 rounded-full glass-panel text-brand-400 text-xs font-bold tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Desde 1988 no mercado
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in drop-shadow-2xl" style={{ animationDelay: '0.2s' }}>
                            Excelência em peças para <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Linha Pesada</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            Mais de 30 anos de tradição fornecendo peças para caminhões, utilitários e implementos. A distribuidora que move o seu negócio com integridade e qualidade.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <Link to="/catalog" className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded text-center transition-all shadow-[0_0_20px_rgba(0,114,59,0.4)] hover:shadow-[0_0_30px_rgba(0,114,59,0.6)]">
                                Ver Catálogo Digital
                            </Link>
                            <Link to="/contact" className="px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded text-center transition-all flex items-center justify-center gap-2">
                                <span>Falar com Vendedor</span>
                                <i className="fa-brands fa-whatsapp"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-10 right-4 hidden lg:block animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <div className="glass-panel p-6 rounded-xl flex gap-8">
                            <StatItem value="36+" label="Anos de História" />
                            <div className="w-px bg-white/10"></div>
                            <StatItem value="70k+" label="Itens no Estoque" />
                            <div className="w-px bg-white/10"></div>
                            <StatItem value="6" label="Unidades no Brasil" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES STRIP */}
            <div className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm relative z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-8 overflow-x-auto gap-8 no-scrollbar">
                        <CategoryIcon icon="fa-truck-moving" label="Caminhões" />
                        <CategoryIcon icon="fa-bus" label="Ônibus" />
                        <CategoryIcon icon="fa-trailer" label="Carretas" />
                        <CategoryIcon icon="fa-van-shuttle" label="Utilitários" />
                        <CategoryIcon icon="fa-gears" label="Motor" />
                        <CategoryIcon icon="fa-wrench" label="Ferramentas" />
                    </div>
                </div>
            </div>

            {/* FEATURED PRODUCTS */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-900/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-900/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-brand-500 font-bold tracking-wider uppercase text-sm mb-2">Destaques da Loja</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Produtos em Alta</h3>
                        </div>
                        <Link to="/catalog" className="text-brand-400 hover:text-white transition-colors flex items-center gap-2">
                            Ver todo catálogo <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="glass-card rounded-2xl p-4 group relative">
                                {product.featured && (
                                    <div className="absolute top-4 left-4 bg-brand-600 text-[10px] font-bold px-2 py-1 rounded text-white z-20">LANÇAMENTO</div>
                                )}
                                <div className="h-48 w-full bg-slate-800/50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                                    {/* Use image if available, else icon */}
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <i className="fa-solid fa-gear text-6xl text-slate-600 group-hover:text-slate-400 transition-colors"></i>
                                    )}

                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link to={`/product/${product.id}`} className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">Ver Detalhes</Link>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1">{product.category}</p>
                                    <h4 className="text-white font-bold text-lg leading-tight mb-2 truncate" title={product.name}>{product.name}</h4>
                                    <p className="text-xs text-gray-500 mb-4">{product.code}</p>
                                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                        <span className="text-brand-400 font-bold text-sm">Consulte Preço</span>
                                        <button className="text-gray-300 hover:text-white"><i className="fa-regular fa-heart"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="text-center">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
    );
}

function CategoryIcon({ icon, label }) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-pointer min-w-[100px] opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center group-hover:bg-brand-600/20 transition-colors border border-white/10">
                <i className={`fa-solid ${icon} text-2xl text-white`}></i>
            </div>
            <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
    );
}
