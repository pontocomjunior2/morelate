export default function Footer() {
    return (
        <footer className="bg-[#022c22] border-t border-white/5 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/Logo-Morelate-.webp" alt="Morelate" className="h-8 w-auto object-contain" />
                        </div>
                        <p className="text-slate-100 text-sm leading-relaxed mb-6">
                            Fundada em 1988, a MORELATE atua no mercado com integridade e compromisso, oferecendo as melhores soluções em peças para linha pesada.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon="fa-facebook-f" />
                            <SocialIcon icon="fa-instagram" />
                            <SocialIcon icon="fa-linkedin-in" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Navegação</h4>
                        <ul className="space-y-3 text-sm text-slate-100">
                            <li><a href="#" className="hover:text-[#08e689] transition-colors">Quem Somos</a></li>
                            <li><a href="#" className="hover:text-[#08e689] transition-colors">Produtos</a></li>
                            <li><a href="#" className="hover:text-[#08e689] transition-colors">Unidades</a></li>
                            <li><a href="#" className="hover:text-[#08e689] transition-colors">Politica de Privacidade</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contato</h4>
                        <li className="flex items-start gap-3">
                            <i className="fa-solid fa-location-dot mt-1 text-[#08e689]"></i>
                            <span>Rua Pierre Lafage, 54 - Bloco A<br />São Paulo - SP, 05163-060</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-phone text-[#08e689]"></i>
                            <span>(11) 3908-0060</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-envelope text-[#08e689]"></i>
                            <span>ecommerce@morelate.com.br</span>
                        </li>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Newsletter</h4>
                        <p className="text-slate-100 text-sm mb-4">Receba novidades e ofertas exclusivas.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Seu e-mail" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-[#08e689] transition-colors" />
                            <button className="w-full bg-[#08e689] text-slate-900 font-bold py-3 rounded text-sm hover:bg-[#06bf72] transition-colors">Inscrever-se</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-100 text-xs text-center md:text-left">© 2025 Morelate Distribuidora. Todos os direitos reservados.</p>
                    <div className="flex gap-4 grayscale opacity-50">
                        <i className="fa-brands fa-cc-visa text-2xl text-white"></i>
                        <i className="fa-brands fa-cc-mastercard text-2xl text-white"></i>
                        <i className="fa-solid fa-barcode text-2xl text-white"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }) {
    return (
        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#08e689] hover:text-slate-900 transition-all">
            <i className={`fa-brands ${icon}`}></i>
        </a>
    );
}
