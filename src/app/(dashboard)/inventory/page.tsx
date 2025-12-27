'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Card, Badge, Button } from '@/components/ui';
import { Plus, Search, Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { mockInventory } from '@/lib/mock-data';

const categoryFilters = ['All', 'Seafood', 'Meat', 'Vegetables', 'Grains', 'Oils'];

export default function InventoryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = mockInventory.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'in-stock': return <CheckCircle size={16} className="text-success" />;
            case 'low-stock': return <AlertTriangle size={16} className="text-warning" />;
            case 'out-of-stock': return <XCircle size={16} className="text-danger" />;
            default: return null;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'in-stock': return 'success';
            case 'low-stock': return 'warning';
            case 'out-of-stock': return 'danger';
            default: return 'default';
        }
    };

    // Stats
    const totalItems = mockInventory.length;
    const inStock = mockInventory.filter(i => i.status === 'in-stock').length;
    const lowStock = mockInventory.filter(i => i.status === 'low-stock').length;
    const outOfStock = mockInventory.filter(i => i.status === 'out-of-stock').length;

    return (
        <div className="min-h-screen relative">
            <Header
                title="Inventory Management"
                subtitle="Track and manage your stock levels"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                        <Package size={20} className="text-info" />
                    </div>
                    <div>
                        <p className="text-text-muted text-xs">Total Items</p>
                        <p className="text-xl font-bold text-white">{totalItems}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                        <CheckCircle size={20} className="text-success" />
                    </div>
                    <div>
                        <p className="text-text-muted text-xs">In Stock</p>
                        <p className="text-xl font-bold text-white">{inStock}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                        <AlertTriangle size={20} className="text-warning" />
                    </div>
                    <div>
                        <p className="text-text-muted text-xs">Low Stock</p>
                        <p className="text-xl font-bold text-white">{lowStock}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                        <XCircle size={20} className="text-danger" />
                    </div>
                    <div>
                        <p className="text-text-muted text-xs">Out of Stock</p>
                        <p className="text-xl font-bold text-white">{outOfStock}</p>
                    </div>
                </Card>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex gap-2 flex-wrap flex-1">
                    {categoryFilters.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === category
                                    ? 'bg-primary text-white'
                                    : 'bg-surface border border-border text-text-secondary hover:text-white hover:border-primary'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-48 h-10 pl-10 pr-4 rounded-xl bg-surface border border-border text-white placeholder-text-muted focus:outline-none focus:border-primary text-sm"
                        />
                    </div>
                    <Button icon={<Plus size={18} />}>
                        Add Item
                    </Button>
                </div>
            </div>

            {/* Inventory Table */}
            <Card padding="none">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-4 px-6 text-text-secondary text-sm font-medium">Item</th>
                            <th className="text-left py-4 px-6 text-text-secondary text-sm font-medium">Category</th>
                            <th className="text-left py-4 px-6 text-text-secondary text-sm font-medium">Quantity</th>
                            <th className="text-left py-4 px-6 text-text-secondary text-sm font-medium">Status</th>
                            <th className="text-left py-4 px-6 text-text-secondary text-sm font-medium">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(item.status)}
                                        <span className="text-white font-medium">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-text-secondary">{item.category}</td>
                                <td className="py-4 px-6 text-white">{item.quantity} {item.unit}</td>
                                <td className="py-4 px-6">
                                    <Badge variant={getStatusVariant(item.status)}>
                                        {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </Badge>
                                </td>
                                <td className="py-4 px-6 text-text-secondary text-sm">{item.lastUpdated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
