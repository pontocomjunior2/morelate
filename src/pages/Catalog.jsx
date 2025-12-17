import { useState, useEffect } from 'react';
import { jacsys } from '../services/jacsys';
import { Link } from 'react-router-dom';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const allProducts = jacsys.getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-4">Catálogo de Peças</h1>
                <p className="text-gray-400 mb-8">Encontre a peça ideal para o seu veículo pesado.</p>

                <div className="relative max-w-xl">
                    <input
                        type="text"
                        placeholder="Busque por nome, código ou categoria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-colors pl-12"
                    />
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <Link key={product.id} to={`/product/${product.id}`} className="glass-card rounded-2xl p-4 group block">
                            <div className="h-40 w-full bg-slate-800/50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-gray-300">{product.category}</span>
                                <h4 className="text-white font-bold text-lg leading-tight mt-2 mb-1 truncate">{product.name}</h4>
                                <p className="text-xs text-gray-500 mb-3">{product.code}</p>
                                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <span className="text-brand-400 font-bold text-sm">Ver Detalhes</span>
                                    {product.stock > 0 ? (
                                        <span className="text-xs text-green-500 flex items-center gap-1"><i className="fa-solid fa-circle text-[6px]"></i> Em estoque</span>
                                    ) : (
                                        <span className="text-xs text-red-500">Indisponível</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <i className="fa-solid fa-box-open text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">Nenhum produto encontrado para "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
}
