const initialProducts = [
    {
        id: 1,
        name: "Conjunto Sincronizado 3ª e 4ª",
        code: "FS4305",
        category: "Câmbio",
        description: "Conjunto de sincronização para caixas de câmbio Eaton FS4305 e FS4405. Alta precisão e durabilidade.",
        price: 1250.00,
        stock: 4,
        location: "Filial São Paulo - SP",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop",
        featured: true
    },
    {
        id: 2,
        name: "Kit Fixação Eixo S",
        code: "KFE-900",
        category: "Suspensão",
        description: "Kit completo de fixação para Eixo S, compatível com sistema de freio Master.",
        price: 450.00,
        stock: 12,
        location: "Filial Curitiba - PR",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop",
        featured: true
    },
    {
        id: 3,
        name: "Coxim Traseiro Motor",
        code: "CTM-2024",
        category: "Motor",
        description: "Coxim traseiro de alta performance para absorção de vibrações.",
        price: 320.90,
        stock: 8,
        location: "Filial São Paulo - SP",
        image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: 4,
        name: "Filtro Combustível Motor",
        code: "FCM-Sprint",
        category: "Filtragem",
        description: "Filtro separador de água para motores MWM Sprint 4 Cilindros.",
        price: 89.90,
        stock: 45,
        location: "Filial Betim - MG",
        image: "/filtro_combustivel.png",
        featured: true
    },
    {
        id: 5,
        name: "Embreagem Viscosa",
        code: "EV-880",
        category: "Arrefecimento",
        description: "Acoplamento viscoso para ventoinha, garantindo refrigeração ideal.",
        price: 780.00,
        stock: 2,
        location: "Filial São Paulo - SP",
        image: "https://images.unsplash.com/photo-1600191942004-98ae0327f315?q=80&w=1943&auto=format&fit=crop",
        featured: false
    },
    {
        id: 6,
        name: "Alternador 24V 90A",
        code: "ALT-2490",
        category: "Elétrica",
        description: "Alternador reforçado para linha pesada, 24V 90A.",
        price: 1450.00,
        stock: 5,
        location: "Filial Curitiba - PR",
        image: "https://images.unsplash.com/photo-1618395568112-9c3db6f35b44?q=80&w=1974&auto=format&fit=crop",
        featured: false
    }
];

// Initialize implementation of Jacsys API
class JacsysService {
    constructor() {
        this.storageKey = 'morelate_inventory_v2';
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(initialProducts));
        }
    }

    getProducts() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(p => p.id === parseInt(id));
    }

    addProduct(product) {
        const products = this.getProducts();
        const newProduct = {
            ...product,
            id: Date.now(), // simple ID generation
            stock: parseInt(product.stock) || 0,
            price: parseFloat(product.price) || 0
        };
        products.push(newProduct);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
        return newProduct;
    }

    removeProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem(this.storageKey, JSON.stringify(products));
    }

    updateStock(id, quantity) {
        const products = this.getProducts();
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            product.stock = parseInt(quantity);
            localStorage.setItem(this.storageKey, JSON.stringify(products));
        }
    }

    // Dashboard Metrics
    getMetrics() {
        const products = this.getProducts();
        const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
        const lowStockParams = products.filter(p => p.stock < 5).length;

        return {
            totalProducts: products.length,
            totalStock,
            totalValue,
            lowStockAlerts: lowStockParams
        };
    }
}

export const jacsys = new JacsysService();
