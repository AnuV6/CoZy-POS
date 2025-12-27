'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { User, Store, Bell, Shield, Palette, Globe, Save, Camera } from 'lucide-react';

const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'restaurant', label: 'Restaurant', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen relative">
            <Header
                title="Settings"
                subtitle="Manage your account and preferences"
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <Card className="lg:col-span-1 h-fit">
                    <nav className="space-y-1">
                        {settingsTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                                            ? 'bg-primary text-white'
                                            : 'text-text-secondary hover:text-white hover:bg-surface-hover'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </Card>

                {/* Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'profile' && (
                        <Card>
                            <h2 className="text-lg font-semibold text-white mb-6">Profile Settings</h2>

                            {/* Avatar */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                                        A
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">Admin User</h3>
                                    <p className="text-text-secondary text-sm">Restaurant Manager</p>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Admin"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue="User"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@restaurant.com"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        defaultValue="+1 234-567-8900"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-text-secondary text-sm mb-2">Bio</label>
                                    <textarea
                                        rows={3}
                                        defaultValue="Restaurant manager with 10+ years of experience..."
                                        className="w-full px-4 py-3 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <Button icon={<Save size={18} />}>
                                    Save Changes
                                </Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'restaurant' && (
                        <Card>
                            <h2 className="text-lg font-semibold text-white mb-6">Restaurant Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Restaurant Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Delicious Restaurant"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Cuisine Type</label>
                                    <select className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors">
                                        <option>International</option>
                                        <option>Italian</option>
                                        <option>Asian</option>
                                        <option>American</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-text-secondary text-sm mb-2">Address</label>
                                    <input
                                        type="text"
                                        defaultValue="123 Restaurant Street, Food City"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Opening Time</label>
                                    <input
                                        type="time"
                                        defaultValue="10:00"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Closing Time</label>
                                    <input
                                        type="time"
                                        defaultValue="22:00"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <Button icon={<Save size={18} />}>
                                    Save Changes
                                </Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card>
                            <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'New Orders', desc: 'Get notified when a new order is placed' },
                                    { label: 'Reservations', desc: 'Get notified for new table reservations' },
                                    { label: 'Low Stock Alerts', desc: 'Get notified when inventory is running low' },
                                    { label: 'Staff Updates', desc: 'Get notified about staff schedule changes' },
                                    { label: 'Daily Reports', desc: 'Receive daily summary reports' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                                        <div>
                                            <p className="text-white font-medium">{item.label}</p>
                                            <p className="text-text-muted text-sm">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={idx < 3} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-surface-light rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card>
                            <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="w-full h-12 px-4 rounded-xl bg-surface-hover border border-border text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <Button icon={<Shield size={18} />}>
                                    Update Password
                                </Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'appearance' && (
                        <Card>
                            <h2 className="text-lg font-semibold text-white mb-6">Appearance Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-4">Theme</label>
                                    <div className="flex gap-4">
                                        <button className="flex-1 p-4 rounded-xl border-2 border-primary bg-surface text-center">
                                            <div className="w-8 h-8 rounded-lg bg-background mx-auto mb-2"></div>
                                            <span className="text-white text-sm">Dark</span>
                                        </button>
                                        <button className="flex-1 p-4 rounded-xl border border-border bg-surface text-center hover:border-primary transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-white mx-auto mb-2"></div>
                                            <span className="text-text-secondary text-sm">Light</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-4">Accent Color</label>
                                    <div className="flex gap-3">
                                        {['#FF7CA3', '#9B51E0', '#50D1AA', '#65B0F6', '#FFB572'].map((color) => (
                                            <button
                                                key={color}
                                                className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 ${color === '#FF7CA3' ? 'ring-2 ring-white ring-offset-2 ring-offset-surface' : ''}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
