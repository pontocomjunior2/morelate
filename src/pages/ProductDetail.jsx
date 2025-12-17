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

    if (!product) return <div className="text-center py-20 text-slate-500 pt-32">Carregando...</div>;

    return (
        <section className="bg-white min-h-screen pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/catalog" className="group text-slate-500 hover:text-[#022c22] mb-8 inline-flex items-center gap-2 font-medium transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#022c22] group-hover:text-[#08e689] transition-all">
                        <i className="fa-solid fa-arrow-left text-sm"></i>
                    </div>
                    Voltar para o Catálogo
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 h-[500px] flex items-center justify-center relative shadow-inner">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain relative z-10 mix-blend-multiply hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Info Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#022c22] text-[#08e689] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{product.category}</span>
                            {product.featured && <span className="bg-[#08e689] text-[#022c22] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Destaque</span>}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-[#022c22] mb-4 leading-tight">{product.name}</h1>
                        <p className="text-lg text-slate-500 font-mono mb-8 flex items-center gap-2 border-b border-slate-100 pb-8">
                            <span className="text-slate-400">Cód:</span> {product.code}
                        </p>

                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Descrição</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
                        </div>

                        {/* Stock & Location Card */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <i className="fa-solid fa-boxes-stacked text-[#08e689]"></i> Estoque
                                    </span>
                                    {product.stock > 0 ? (
                                        <span className="text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full text-sm border border-green-100">
                                            Disponível ({product.stock} un)
                                        </span>
                                    ) : (
                                        <span className="text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full text-sm border border-red-100">Esgotado</span>
                                    )}
                                </div>
                                <div className="h-px bg-slate-100 w-full"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <i className="fa-solid fa-location-dot text-[#08e689]"></i> Localização
                                    </span>
                                    <span className="text-slate-700 font-medium text-sm text-right">
                                        {product.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="flex-1 bg-[#022c22] hover:bg-[#034435] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">
                                <span>Solicitar Orçamento</span>
                                <i className="fa-brands fa-whatsapp text-xl text-[#08e689] group-hover:scale-110 transition-transform"></i>
                            </button>
                            <button className="px-6 border-2 border-slate-200 hover:border-red-400 text-slate-400 hover:text-red-500 rounded-xl transition-all bg-white group">
                                <i className="fa-regular fa-heart text-xl group-hover:scale-110 transition-transform"></i>
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-6 text-slate-400 grayscale opacity-70">
                            <i className="fa-brands fa-cc-visa text-2xl"></i>
                            <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                            <i className="fa-solid fa-barcode text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
