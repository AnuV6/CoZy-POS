'use client';

import { useState } from 'react';
import {
    Search,
    ChevronDown,
    Edit2,
    Plus,
    Minus,
    Pizza,
    Sandwich, // For Burger
    Drumstick, // For Chicken
    Cookie, // For Bakery
    Coffee, // For Beverage
    Fish, // For Seafood
    QrCode,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { mockMenuItems, mockCategories } from '@/lib/mock-data';
import { useCart } from '@/lib/cart-context';

// Helper to map icon string to component
const iconMap: { [key: string]: any } = {
    Pizza: Pizza,
    Burger: Sandwich, // Using Sandwich as proxy for Burger
    Sandwich: Sandwich,
    Chicken: Drumstick, // Using Drumstick for Chicken
    Drumstick: Drumstick,
    Bakery: Cookie, // Using Cookie for Bakery
    Cookie: Cookie,
    Beverage: Coffee, // Using Coffee for Beverage
    Coffee: Coffee,
    Seafood: Fish, // Using Fish for Seafood
    Fish: Fish,
    LayoutGrid: Pizza // Fallback/Default
};

export default function OrdersPage() {
    const { items: cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedTableId, setSelectedTableId] = useState('01');

    const filteredItems = activeCategory === 'all'
        ? mockMenuItems
        : mockMenuItems.filter(item => item.category.toLowerCase() === activeCategory);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const handleAddItem = (item: typeof mockMenuItems[0]) => {
        addToCart({
            id: String(item.id),
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image,
        });
    };

    const handleSubmitOrder = async () => {
        if (cartItems.length === 0) {
            alert('Cart is empty. Please add items before submitting an order.');
            return;
        }

        const orderData = {
            tableId: selectedTableId,
            items: cartItems,
            subtotal,
            tax,
            total,
            timestamp: new Date().toISOString(),
        };

        console.log('Order submitted:', orderData);
        alert(`Order submitted to kitchen!\nTable ${selectedTableId}\nTotal: $${total.toFixed(2)}`);
        // In a real app, this would send to a backend API
    };

    return (
        <div className="h-full flex gap-6 relative">
            {/* Left Side - Menu Selection */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#292C2D] flex items-center justify-center transform rotate-90">
                            <ChevronDown className="text-white" size={20} />
                        </div>
                        <h1 className="text-white font-medium text-[25px]">Orders</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#FAC1D9] w-2.5 h-2.5 rounded-full"></div>
                        <span className="text-[#333333] text-[6px]">0{cartItems.length}</span>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-3 gap-5 mb-8">
                    {mockCategories.filter(c => c.id !== 'all').map((category) => {
                        const Icon = iconMap[category.icon] || Pizza;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`
                                    h-[146px] rounded-[10px] p-4 relative flex flex-col justify-end text-left transition-all
                                    ${activeCategory === category.id ? 'bg-[#FAC1D9] text-[#333333]' : 'bg-[#292C2D] text-white hover:bg-[#3D4142]'}
                                `}
                            >
                                <div className="absolute top-4 right-4">
                                    <Icon size={40} strokeWidth={1.5} />
                                </div>
                                <span className="font-medium text-base mb-1">{category.name}</span>
                                <span className="text-sm opacity-80 font-light">{category.count} items</span>
                            </button>
                        );
                    })}
                </div>

                {/* Separator */}
                <div className="border-b border-[#5E5E5E] mb-6"></div>

                {/* Items Grid */}
                <div className="overflow-y-auto flex-1 pr-2">
                    <div className="grid grid-cols-3 gap-5">
                        {filteredItems.map((item) => {
                            const cartItem = cartItems.find(ci => ci.id === String(item.id));
                            const isSelected = !!cartItem;
                            return (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleAddItem(item)}
                                    className="bg-[#292C2D] rounded-[10px] p-4 h-[146px] flex flex-col justify-between group cursor-pointer hover:bg-[#3D4142] transition-colors relative overflow-hidden"
                                >
                                    {!isSelected ? (
                                        <>
                                            <div>
                                                <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
                                                <p className="text-[#777979] text-sm">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="text-[#777979] text-sm font-light flex items-center gap-2">
                                                <span>Order</span>
                                                <span>&gt;</span>
                                                <span>Kitchen</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-[#292C2D]/95 flex flex-col justify-between p-4">
                                            <div>
                                                <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
                                                <p className="text-[#777979] text-sm">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-4 self-center">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cartItem && updateQuantity(cartItem.id, cartItem.quantity - 1);
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-[#3D4142] flex items-center justify-center text-white ring-1 ring-white hover:bg-[#4D5152]"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <div className="w-6 h-6 rounded-full bg-[#F8BFD7] flex items-center justify-center text-[#333333] text-xs font-medium">
                                                    {cartItem.quantity}
                                                </div>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cartItem && updateQuantity(cartItem.id, cartItem.quantity + 1);
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-[#3D4142] flex items-center justify-center text-white ring-1 ring-white hover:bg-[#4D5152]"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-[424px] bg-[#3D4142] rounded-t-[10px] flex flex-col h-full">
                {/* Order Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                    <div>
                        <h2 className="text-white text-[25px] font-medium leading-[38px]">Table {selectedTableId}</h2>
                        <p className="text-white text-base">Order Summary</p>
                    </div>
                    <button className="bg-white p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Edit2 size={16} className="text-[#333333]" />
                    </button>
                </div>

                {/* Order Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3 mt-4">
                    {cartItems.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-[#777979]">
                            <div className="text-center">
                                <p className="mb-2">Cart is empty</p>
                                <p className="text-sm">Click items to add them</p>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="bg-[#3D4142] rounded-[10px] overflow-hidden">
                                {/* Card Body */}
                                <div className="bg-[#3D4142] p-5 rounded-[10px] relative border-b border-[#3D4142] flex items-center gap-4">
                                    <div className="w-[26px] h-[26px] rounded-full bg-[#F6BED6] flex items-center justify-center shrink-0">
                                        <span className="text-[#333333] text-sm font-light">{cartItems.indexOf(item) + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-white text-sm">{item.name}</span>
                                            <span className="text-white text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="text-[#777979] text-sm flex gap-1">
                                            <span>x</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-2 p-1 hover:bg-[#4D5152] rounded transition-colors"
                                    >
                                        <X size={16} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    {/* Add More Space Filler */}
                    <div className="h-20"></div>
                </div>

                {/* Footer Section */}
                <div className="bg-[#3D4142] p-5 pt-0">
                    {/* Totals */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-white text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                            <span>Tax 5%</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-dashed border-[#5E5E5E]"></div>
                        <div className="flex justify-between text-white text-sm">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 border border-white rounded-[10px] p-4 flex flex-col items-center justify-center gap-2 bg-[#3D4142] h-[112px] relative group cursor-pointer hover:bg-[#4D5152]">
                            <QrCode size={40} className="text-white" />
                        </div>
                        <div className="w-[176px] flex flex-col justify-center">
                            <span className="text-white text-sm mb-1">Payment Method</span>
                            <span className="text-white text-sm font-medium">Scan QR Code</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={handleSubmitOrder}
                        disabled={cartItems.length === 0}
                        className="w-full bg-[#FAC1D9] text-[#333333] font-medium text-base py-3 rounded-[8px] hover:bg-[#ffb6d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send To Kitchen
                    </button>
                </div>
            </div>
        </div>
    );
}
