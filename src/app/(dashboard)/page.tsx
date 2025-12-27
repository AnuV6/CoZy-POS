'use client';

import { Bell, ChevronDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Theme Colors for Recharts
const THEME = {
  primary: '#FAC1D9',
  white: '#FFFFFF',
  secondary: '#50CD89',
  secondaryLight: '#C2E9DD',
  card: '#292C2D',
  grid: '#444444',
  danger: '#F60000',
  placeholder: '#777979',
};

// Mock Data
const overviewData = [
  { name: 'JAN', sales: 2000, revenue: 2400 },
  { name: 'FEB', sales: 3000, revenue: 1398 },
  { name: 'MAR', sales: 2000, revenue: 9800 },
  { name: 'APR', sales: 2780, revenue: 3908 },
  { name: 'MAY', sales: 1890, revenue: 4800 },
  { name: 'JUN', sales: 2390, revenue: 3800 },
  { name: 'JUL', sales: 3490, revenue: 4300 },
  { name: 'AUG', sales: 2000, revenue: 2400 },
  { name: 'SEP', sales: 2780, revenue: 3908 },
  { name: 'OCT', sales: 1890, revenue: 4800 },
  { name: 'NOV', sales: 2390, revenue: 3800 },
  { name: 'DEC', sales: 3490, revenue: 4300 },
];

const popularDishes = [
  { id: 1, name: 'Chicken Parmesan', price: 55.00, status: 'In Stock', serving: '01 person', image: '/food-item.png' },
  { id: 2, name: 'Chicken Parmesan', price: 55.00, status: 'In Stock', serving: '01 person', image: '/food-item.png' },
  { id: 3, name: 'Chicken Parmesan', price: 55.00, status: 'Out of stock', serving: '01 person', image: '/food-item.png' },
  { id: 4, name: 'Chicken Parmesan', price: 55.00, status: 'In Stock', serving: '01 person', image: '/food-item.png' },
];

const recentOrders = [
  { id: 1, name: 'Chicken Parmesan', price: 55.00, quantity: 1, status: 'In Stock', image: '/food-item.png' },
  { id: 2, name: 'Chicken Parmesan', price: 110.00, quantity: 2, status: 'In Stock', image: '/food-item.png' },
  { id: 3, name: 'Chicken Parmesan', price: 55.00, quantity: 1, status: 'Out of stock', image: '/food-item.png' },
  { id: 4, name: 'Chicken Parmesan', price: 55.00, quantity: 1, status: 'In Stock', image: '/food-item.png' },
];

// Reusable Components
const StatCard = ({ title, value, subtitle, icon, barsColor = THEME.secondary, isRevenue = false }: any) => (
  <div className="rounded-[10px] p-6 relative overflow-hidden h-[166px] bg-[var(--color-card)]">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-[var(--color-foreground)] font-light text-[16px] font-[family-name:var(--font-sans)]">{title}</h3>
      <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-[var(--color-primary)]">
        {icon}
      </div>
    </div>

    <div className="text-[var(--color-foreground)] font-medium text-[25px] font-[family-name:var(--font-sans)] mb-8">{value}</div>

    <div className="text-[var(--color-text-muted)] font-light text-[16px] font-[family-name:var(--font-sans)] absolute bottom-4 left-6">{subtitle}</div>

    {/* Custom Bar Chart Visual */}
    <div className="flex gap-[6px] items-end absolute bottom-0 right-4 h-[52px]">
      {[40, 70, 45, 90, 60, 75, 50, 65].map((h, i) => (
        <div
          key={i}
          className="w-[12px] rounded-t-[3px]"
          style={{
            height: `${h}%`,
            backgroundColor: isRevenue ? THEME.secondaryLight : barsColor,
            opacity: isRevenue && i % 2 === 0 ? 0.7 : 1
          }}
        />
      ))}
    </div>
  </div>
);

const DishList = ({ title, items, isOrders = false }: any) => (
  <div className="rounded-[10px] p-6 h-[466px] relative flex flex-col bg-[var(--color-card)]">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-[var(--color-foreground)] font-medium text-[25px] font-[family-name:var(--font-sans)]">{title}</h2>
      <button className="text-[var(--color-primary)] underline text-[16px] font-normal font-[family-name:var(--font-sans)]">See All</button>
    </div>

    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
      {items.map((item: any, i: number) => (
        <div key={i} className="rounded-[8px] p-2 flex gap-4 items-center bg-[var(--color-card-hover)]">
          {/* Image */}
          <div className="w-[89px] h-[67px] rounded-[5px] flex-shrink-0 overflow-hidden relative">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-[var(--color-foreground)] font-medium text-[16px] font-[family-name:var(--font-sans)]">{item.name}</h3>
              <span className={`text-[16px] font-normal font-[family-name:var(--font-sans)] ${item.status === 'Out of stock' ? 'text-[var(--color-danger)]' : 'text-[var(--color-primary)]'}`}>
                {item.status === 'Out of stock' ? 'Out of stock' : 'In Stock'}
              </span>
            </div>

            <div className="flex justify-between items-end mt-1">
              <p className="text-[var(--color-text-muted)] text-[14px] font-normal font-[family-name:var(--font-sans)]">
                {isOrders
                  ? `Order : x${item.quantity} $${(item.price / item.quantity).toFixed(2)}`
                  : `Serving : ${item.serving}`
                }
              </p>
              <span className="text-[var(--color-foreground)] text-[14px] font-normal font-[family-name:var(--font-sans)]">${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="w-full max-w-[1440px] relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <h1 className="text-[var(--color-foreground)] font-medium text-[25px]">Dashboard</h1>

        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-card)] flex items-center justify-center text-[var(--color-primary)] relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-primary)] rounded-full"></span>
          </div>

          <div className="flex items-center gap-3 bg-[var(--color-card)] pl-1 pr-3 py-1 rounded-xl">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src="/admin-avatar.png" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <span className="text-[var(--color-foreground)] text-sm font-medium">Admin</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Daily Sales"
          value="$2k"
          subtitle="9 Feburary 2024"
          icon={<span className="text-[#333333] font-bold">$</span>}
        />
        <StatCard
          title="Monthly Revenue"
          value="$55k"
          subtitle="1 Jan - 1 Feb"
          icon={<span className="text-[#333333] font-bold">R</span>}
          barsColor={THEME.secondaryLight}
          isRevenue={true}
        />
        <StatCard
          title="Table Occupacy"
          value="25 Tables"
          subtitle=""
          icon={<span className="text-[#333333] font-bold">T</span>}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DishList title="Popular Dishes" items={popularDishes} />
        <DishList title="Popular Dishes" items={recentOrders} isOrders={true} />
      </div>

      {/* Overview Chart */}
      <div className="bg-[var(--color-card)] rounded-[10px] p-6 h-[514px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-8">
            <h2 className="text-[var(--color-foreground)] font-medium text-[25px]">Overview</h2>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--color-primary)]"></span>
                <span className="text-[var(--color-foreground)] text-sm">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--color-foreground)]"></span>
                <span className="text-[var(--color-foreground)] text-sm">Revenue</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-[var(--color-primary)] rounded-[8px] flex p-1">
              <button className="px-4 py-1 bg-[var(--color-foreground)] text-[var(--color-text-dark)] rounded-[6px] text-sm font-medium">Monthly</button>
              <button className="px-4 py-1 text-[var(--color-text-dark)] text-sm">Daily</button>
              <button className="px-4 py-1 text-[var(--color-text-dark)] text-sm">Weekly</button>
            </div>
            <button className="px-4 py-2 border border-[var(--color-primary)] rounded-[8px] text-[var(--color-primary)] text-sm flex items-center gap-2">
              Export
            </button>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={overviewData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={THEME.primary} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={THEME.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={THEME.grid} strokeDasharray="0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: THEME.white, fontSize: 12 }}
                dy={10}
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: THEME.white, fontSize: 12 }}
                tickFormatter={(value) => value === 0 ? '0' : `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: THEME.card, border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke={THEME.primary}
                strokeWidth={3}
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={THEME.white}
                strokeWidth={3}
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
