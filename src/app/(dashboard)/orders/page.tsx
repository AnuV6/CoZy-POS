'use client';

import { useState } from 'react';
import {
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
    const [activeView, setActiveView] = useState<'menu' | 'cart'>('menu'); // Mobile view state

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
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 relative">
            {/* Mobile View Toggle (Floating) */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                {activeView === 'menu' ? (
                    <button
                        onClick={() => setActiveView('cart')}
                        className="bg-[var(--color-primary)] text-[var(--color-text-dark)] p-4 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="font-bold">{cartItems.length}</span>
                        <span>View Cart</span>
                    </button>
                ) : (
                    <button
                        onClick={() => setActiveView('menu')}
                        className="bg-[var(--color-card)] text-[var(--color-foreground)] p-4 rounded-full shadow-lg border border-[var(--color-primary)]"
                    >
                        Back to Menu
                    </button>
                )}
            </div>

            {/* Left Side - Menu Selection */}
            <div className={`flex-1 flex flex-col min-w-0 ${activeView === 'cart' ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-card)] flex items-center justify-center transform rotate-90">
                            <ChevronDown className="text-[var(--color-foreground)]" size={20} />
                        </div>
                        <h1 className="text-[var(--color-foreground)] font-medium text-[25px]">Orders</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden">
                            <img src="/admin-avatar.png" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[var(--color-foreground)] text-sm font-medium">Admin</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                    {mockCategories.filter(c => c.id !== 'all').map((category) => {
                        const Icon = iconMap[category.icon] || Pizza;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`
                                    h-[146px] rounded-[10px] p-4 relative flex flex-col justify-end text-left transition-all
                                    ${activeCategory === category.id
                                        ? 'bg-[var(--color-primary)] text-[var(--color-text-dark)]'
                                        : 'bg-[var(--color-card)] text-[var(--color-foreground)] hover:bg-[var(--color-card-hover)]'}
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
                <div className="border-b border-[#5E5E5E] mb-6 opacity-30"></div>

                {/* Items Grid */}
                <div className="overflow-y-auto flex-1 pr-2 pb-20 md:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredItems.map((item) => {
                            const cartItem = cartItems.find(ci => ci.id === String(item.id));
                            const isSelected = !!cartItem;
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleAddItem(item)}
                                    className="bg-[var(--color-card)] rounded-[10px] p-4 h-[180px] flex flex-col justify-between group cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors relative overflow-hidden"
                                >
                                    {!isSelected ? (
                                        <>
                                            <div className="flex flex-col gap-2 h-full">
                                                <div className="w-full h-[80px] mb-2 rounded-[5px] overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-[var(--color-foreground)] font-medium text-sm mb-1 truncate">{item.name}</h3>
                                                    <p className="text-[var(--color-text-muted)] text-sm">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-[var(--color-card)] flex flex-col justify-between p-4">
                                            <div className="w-full h-[80px] mb-2 rounded-[5px] overflow-hidden opacity-50">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-[var(--color-foreground)] font-medium text-sm mb-1 truncate">{item.name}</h3>
                                                <p className="text-[var(--color-text-muted)] text-sm">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-4 self-center z-10 absolute bottom-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cartItem && updateQuantity(cartItem.id, cartItem.quantity - 1);
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-[var(--color-card-hover)] flex items-center justify-center text-[var(--color-foreground)] ring-1 ring-[var(--color-foreground)] hover:bg-[#4D5152]"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-primary-dark)]/20 flex items-center justify-center text-[var(--color-primary)] text-xs font-medium">
                                                    {cartItem.quantity}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cartItem && updateQuantity(cartItem.id, cartItem.quantity + 1);
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-[var(--color-card-hover)] flex items-center justify-center text-[var(--color-foreground)] ring-1 ring-[var(--color-foreground)] hover:bg-[#4D5152]"
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
            <div className={`w-full md:w-[424px] bg-[var(--color-card-hover)] rounded-t-[10px] flex-col h-full ${activeView === 'menu' ? 'hidden md:flex' : 'flex'}`}>
                {/* Order Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                    <div>
                        <h2 className="text-[var(--color-foreground)] text-[25px] font-medium leading-[38px]">Table {selectedTableId}</h2>
                        <p className="text-[var(--color-foreground)] text-base">Order Summary</p>
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
                            <div key={item.id} className="bg-[var(--color-card)] rounded-[10px] overflow-hidden">
                                {/* Card Body */}
                                <div className="p-5 rounded-[10px] relative border-b border-[var(--color-card)] flex items-center gap-4">
                                    <div className="w-[26px] h-[26px] rounded-full bg-[var(--color-primary-dark)]/30 flex items-center justify-center shrink-0">
                                        <span className="text-[var(--color-foreground)] text-sm font-light">{cartItems.indexOf(item) + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[var(--color-foreground)] text-sm">{item.name}</span>
                                            <span className="text-[var(--color-foreground)] text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="text-[var(--color-text-muted)] text-sm flex gap-1">
                                            <span>x</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-2 p-1 hover:bg-[var(--color-card)] rounded transition-colors"
                                    >
                                        <X size={16} className="text-[var(--color-foreground)]" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                    {/* Add More Space Filler */}
                    <div className="h-20"></div>
                </div>

                {/* Footer Section */}
                <div className="bg-[var(--color-card-hover)] p-5 pt-0 pb-20 md:pb-5">
                    {/* Totals */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-[var(--color-foreground)] text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[var(--color-foreground)] text-sm">
                            <span>Tax 5%</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-dashed border-[#5E5E5E]"></div>
                        <div className="flex justify-between text-[var(--color-foreground)] text-sm">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 border border-[var(--color-foreground)] rounded-[10px] p-4 flex flex-col items-center justify-center gap-2 bg-[var(--color-card-hover)] h-[112px] relative group cursor-pointer hover:bg-[#4D5152]">
                            <QrCode size={40} className="text-[var(--color-foreground)]" />
                        </div>
                        <div className="w-[176px] flex flex-col justify-center">
                            <span className="text-[var(--color-foreground)] text-sm mb-1">Payment Method</span>
                            <span className="text-[var(--color-foreground)] text-sm font-medium">Scan QR Code</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleSubmitOrder}
                        disabled={cartItems.length === 0}
                        className="w-full bg-[var(--color-primary)] text-[var(--color-text-dark)] font-medium text-base py-3 rounded-[8px] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send To Kitchen
                    </button>
                </div>
            </div>
        </div>
    );
}
