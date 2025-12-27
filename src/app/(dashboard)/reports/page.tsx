'use client';

import { Header } from '@/components/layout';
import { Card, Badge } from '@/components/ui';
import { mockRevenueData, mockReservationStats, mockReservations } from '@/lib/mock-data';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from 'recharts';

const pieData = [
    { name: 'Confirmed', value: 98, color: '#50D1AA' },
    { name: 'Pending', value: 32, color: '#FFB572' },
    { name: 'Cancelled', value: 26, color: '#FF6B6B' },
];

export default function ReportsPage() {
    return (
        <div className="min-h-screen relative">
            <Header
                title="Reports & Analytics"
                subtitle="Comprehensive business insights and performance metrics"
            />

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="text-center p-4">
                    <p className="text-text-muted text-xs mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">$694k</p>
                    <p className="text-success text-xs mt-1">↑ 12.5% vs last year</p>
                </Card>
                <Card className="text-center p-4">
                    <p className="text-text-muted text-xs mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-white">5,680</p>
                    <p className="text-success text-xs mt-1">↑ 8.2% vs last year</p>
                </Card>
                <Card className="text-center p-4">
                    <p className="text-text-muted text-xs mb-1">Avg Order Value</p>
                    <p className="text-2xl font-bold text-white">$122</p>
                    <p className="text-success text-xs mt-1">↑ 4.1% vs last year</p>
                </Card>
                <Card className="text-center p-4">
                    <p className="text-text-muted text-xs mb-1">Total Reservations</p>
                    <p className="text-2xl font-bold text-white">{mockReservationStats.total}</p>
                    <p className="text-warning text-xs mt-1">→ Same as last month</p>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Revenue Trend</h2>
                        <select className="bg-surface-hover border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockRevenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF7CA3" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF7CA3" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ABBBC2', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ABBBC2', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#252836',
                                        border: '1px solid #393C49',
                                        borderRadius: '8px'
                                    }}
                                    labelStyle={{ color: '#FFFFFF' }}
                                    formatter={(value: number | undefined) => value ? [`$${value.toLocaleString()}`, 'Revenue'] : ['$0', 'Revenue']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#FF7CA3"
                                    strokeWidth={2}
                                    fill="url(#colorRev)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Reservation Pie Chart */}
                <Card>
                    <h2 className="text-lg font-semibold text-white mb-6">Reservations</h2>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#252836',
                                        border: '1px solid #393C49',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-text-secondary text-xs">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Orders Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <h2 className="text-lg font-semibold text-white mb-6">Orders by Month</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockRevenueData}>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ABBBC2', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ABBBC2', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#252836',
                                        border: '1px solid #393C49',
                                        borderRadius: '8px'
                                    }}
                                    labelStyle={{ color: '#FFFFFF' }}
                                />
                                <Bar dataKey="orders" fill="#9B51E0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Reservations */}
                <Card padding="none">
                    <div className="p-6 pb-4">
                        <h2 className="text-lg font-semibold text-white">Recent Reservations</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">ID</th>
                                <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Customer</th>
                                <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Date</th>
                                <th className="text-left py-3 px-6 text-text-secondary text-sm font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockReservations.slice(0, 4).map((res) => (
                                <tr key={res.id} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                                    <td className="py-3 px-6 text-white text-sm">{res.id}</td>
                                    <td className="py-3 px-6 text-white text-sm">{res.guestName}</td>
                                    <td className="py-3 px-6 text-text-secondary text-sm">{res.date}</td>
                                    <td className="py-3 px-6">
                                        <Badge
                                            variant={
                                                res.status === 'confirmed' ? 'success' :
                                                    res.status === 'pending' ? 'warning' : 'danger'
                                            }
                                            size="sm"
                                        >
                                            {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}
