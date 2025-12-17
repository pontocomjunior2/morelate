import { useState, useEffect } from 'react';
import { jacsys } from '../services/jacsys';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [metrics, setMetrics] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: '', code: '', category: '', price: '', stock: '', location: 'Filial São Paulo - SP', description: '', image: ''
    });

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setProducts(jacsys.getProducts());
        setMetrics(jacsys.getMetrics());
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja remover este produto?')) {
            jacsys.removeProduct(id);
            refreshData();
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        jacsys.addProduct(newProduct);
        setShowAddModal(false);
        setNewProduct({ name: '', code: '', category: '', price: '', stock: '', location: 'Filial São Paulo - SP', description: '', image: '' });
        refreshData();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
                    <p className="text-gray-400">Gerenciamento de estoque e produtos.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-brand-600 hover:bg-brand-700 text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> Novo Produto
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <MetricCard title="Total Produtos" value={metrics.totalProducts} icon="fa-box" color="bg-blue-500" />
                <MetricCard title="Estoque Total" value={metrics.totalStock} icon="fa-cubes" color="bg-brand-500" />
                <MetricCard title="Valor em Estoque" value={`R$ ${metrics.totalValue?.toLocaleString('pt-BR')}`} icon="fa-brazilian-real-sign" color="bg-purple-500" />
                <MetricCard title="Estoque Baixo" value={metrics.lowStockAlerts} icon="fa-triangle-exclamation" color="bg-red-500" />
            </div>

            {/* Inventory Table */}
            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-white font-bold text-lg">Inventário Atual</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-white/5 text-xs uppercase text-gray-300">
                            <tr>
                                <th className="px-6 py-4">Produto</th>
                                <th className="px-6 py-4">Código</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4">Preço</th>
                                <th className="px-6 py-4">Estoque</th>
                                <th className="px-6 py-4">Localização</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                                    <td className="px-6 py-4">{product.code}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 5 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {product.stock} un
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{product.location}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400 p-2">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 relative">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">Adicionar Novo Produto</h2>

                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Nome do Produto</label>
                                    <input required type="text" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Código</label>
                                    <input required type="text" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.code} onChange={e => setNewProduct({ ...newProduct, code: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Categoria</label>
                                    <select className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                                        <option value="">Selecione...</option>
                                        <option value="Motor">Motor</option>
                                        <option value="Câmbio">Câmbio</option>
                                        <option value="Suspensão">Suspensão</option>
                                        <option value="Filtragem">Filtragem</option>
                                        <option value="Elétrica">Elétrica</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Localização</label>
                                    <select className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.location} onChange={e => setNewProduct({ ...newProduct, location: e.target.value })}>
                                        <option value="Filial São Paulo - SP">Filial São Paulo - SP</option>
                                        <option value="Filial Curitiba - PR">Filial Curitiba - PR</option>
                                        <option value="Filial Betim - MG">Filial Betim - MG</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Preço (R$)</label>
                                    <input type="number" step="0.01" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Estoque Inicial</label>
                                    <input required type="number" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                        value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">URL da Imagem</label>
                                <input type="url" className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                                    placeholder="https://..."
                                    value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Descrição</label>
                                <textarea className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-500 outline-none h-24"
                                    value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                            </div>

                            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                                Salvar Produto
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function MetricCard({ title, value, icon, color }) {
    // Map background colors to their text counterparts explicitly to ensure Tailwind picks them up
    const textColorMap = {
        'bg-blue-500': 'text-blue-500',
        'bg-brand-500': 'text-brand-500',
        'bg-purple-500': 'text-purple-500',
        'bg-red-500': 'text-red-500'
    };

    return (
        <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-20 flex items-center justify-center ${textColorMap[color] || 'text-white'}`}>
                <i className={`fa-solid ${icon} text-xl`}></i>
            </div>
        </div>
    );
}
