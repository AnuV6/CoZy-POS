'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    LayoutGrid,
    Pizza,
    Sandwich,
    Drumstick,
    Cookie,
    Coffee,
    Fish,
    ChevronDown
} from 'lucide-react';
import { mockMenuItems, mockCategories } from '@/lib/mock-data';

// Icon mapping
const iconMap: any = {
    LayoutGrid,
    Pizza,
    Sandwich,
    Drumstick,
    Cookie,
    Coffee,
    Fish
};

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('Normal Menu');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = mockMenuItems.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        // For now, filter tabs don't filter data as we don't have that metadata in mock, 
        // but the UI is there. In real app, this would filter by 'menuType' or similar.
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pt-4">
                <h1 className="text-[var(--color-foreground)] font-medium text-[25px]">Menu</h1>
                <div className="flex gap-4 items-center">
                    <button className="w-10 h-10 rounded-xl bg-[var(--color-card)] flex items-center justify-center text-[var(--color-foreground)] relative">
                        <span className="sr-only">Notifications</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3 bg-[var(--color-card)] pl-1 pr-3 py-1 rounded-xl">
                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                            <img src="/admin-avatar.png" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[var(--color-foreground)] text-sm font-medium">Admin</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[var(--color-foreground)] font-medium text-[25px]">Categories</h2>
                    <button className="bg-[var(--color-primary)] text-[var(--color-text-dark)] px-6 py-2 rounded-lg font-medium text-sm">
                        Add New Category
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {mockCategories.map((cat: any) => {
                        const Icon = iconMap[cat.icon];
                        const isActive = activeCategory === cat.name;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`
                                    relative h-[146px] rounded-[10px] p-4 flex flex-col justify-between text-left transition-all
                                    ${isActive ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-card)] hover:bg-[var(--color-card-hover)]'}
                                `}
                            >
                                <div className="self-end">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center
                                        ${isActive ? 'bg-white text-[#333333]' : 'bg-[#3D4142] text-white'}
                                    `}>
                                        {Icon && <Icon size={20} />}
                                    </div>
                                </div>

                                <div>
                                    <h3 className={`font-medium text-base mb-1 ${isActive ? 'text-[#333333]' : 'text-[var(--color-foreground)]'}`}>
                                        {cat.name}
                                    </h3>
                                    <p className={`text-xs ${isActive ? 'text-[#333333]' : 'text-[var(--color-text-muted)]'}`}>
                                        {cat.count} items
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Special Menu / Filter Section */}
            <div className="mb-6">
                <h2 className="text-[var(--color-foreground)] font-medium text-[25px] mb-6">Special menu all items</h2>

                <div className="flex justify-between items-center">
                    <div className="flex gap-8">
                        {['Normal Menu', 'Special Deals', 'New Year Special', 'Deserts and Drinks'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    pb-2 text-base font-medium transition-colors relative
                                    ${activeTab === tab ? 'text-[var(--color-primary)]' : 'text-[var(--color-foreground)] hover:text-[var(--color-primary)]'}
                                `}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <button className="bg-[var(--color-primary)] text-[var(--color-text-dark)] px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                        <Plus size={16} />
                        Add Menu Item
                    </button>
                </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-[var(--color-card)] rounded-[10px] overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#3D4142]">
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm w-[60px]">
                                <div className="w-3 h-3 border border-white rounded-[2px]" />
                            </th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Product</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Item ID</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Stock</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Category</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Price</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Availability</th>
                            <th className="py-4 px-6 text-left text-[var(--color-foreground)] font-medium text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={item.id} className="border-b border-[#3D4142]/50 hover:bg-[var(--color-card-hover)] transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="w-3 h-3 border border-white rounded-[2px]" />
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-[5px] overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[var(--color-foreground)] text-sm">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-[var(--color-foreground)] text-sm opacity-80">{item.itemId}</td>
                                <td className="py-4 px-6 text-[var(--color-foreground)] text-sm opacity-80">{item.stock} items</td>
                                <td className="py-4 px-6 text-[var(--color-foreground)] text-sm opacity-80">{item.category}</td>
                                <td className="py-4 px-6 text-[var(--color-foreground)] text-sm font-medium">${item.price.toFixed(2)}</td>
                                <td className="py-4 px-6">
                                    <span className={`text-sm ${item.availability === 'In Stock' ? 'text-[var(--color-primary)]' : 'text-[var(--color-danger)]'}`}>
                                        {item.availability}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-8 h-8 flex items-center justify-center text-[var(--color-foreground)] hover:text-[var(--color-primary)]">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center text-[var(--color-danger)] hover:text-[#ff4d4d]">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
