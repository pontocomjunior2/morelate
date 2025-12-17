import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jacsys } from '../services/jacsys';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const found = jacsys.getProductById(id);
        setProduct(found);
    }, [id]);

    if (!product) return <div className="text-center py-20 text-white">Carregando...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/catalog" className="text-gray-400 hover:text-white mb-6 inline-block"><i className="fa-solid fa-arrow-left mr-2"></i> Voltar para o Catálogo</Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="glass-panel rounded-2xl p-2 h-[400px] flex items-center justify-center overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-xl" />
                </div>

                {/* Info */}
                <div>
                    <span className="text-brand-400 font-bold tracking-wider uppercase text-sm">{product.category}</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-400 font-mono mb-6">Cód: {product.code}</p>

                    <div className="glass-panel p-6 rounded-xl mb-8">
                        <p className="text-gray-300 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Stock Info */}
                    <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-boxes-stacked text-brand-500"></i> Disponibilidade
                        </h3>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Status no Estoque:</span>
                            {product.stock > 0 ? (
                                <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full text-sm">Disponível ({product.stock} un)</span>
                            ) : (
                                <span className="text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full text-sm">Esgotado</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Localização física:</span>
                            <span className="text-white font-medium flex items-center gap-2">
                                <i className="fa-solid fa-map-pin text-red-500"></i> {product.location}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-900/50">
                            Solicitar Orçamento
                        </button>
                        <button className="px-6 glass-panel hover:bg-white/10 text-white rounded-xl transition-colors">
                            <i className="fa-regular fa-heart text-xl"></i>
                        </button>
                    </div>

                    <p className="mt-4 text-xs text-gray-500 text-center">Para visualizar preços, entre em contato com um vendedor.</p>
                </div>
            </div>
        </div>
    );
}
