'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Eye,
    Edit2,
    Trash2,
    ArrowLeft
} from 'lucide-react';
import { mockStaff } from '@/lib/mock-data';

export default function StaffPage() {
    const [activeTab, setActiveTab] = useState('Staff Management');
    const [selectedStaff, setSelectedStaff] = useState<number[]>([]);

    const toggleSelectAll = () => {
        if (selectedStaff.length === mockStaff.length) {
            setSelectedStaff([]);
        } else {
            setSelectedStaff(mockStaff.map(s => s.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedStaff.includes(id)) {
            setSelectedStaff(selectedStaff.filter(s => s !== id));
        } else {
            setSelectedStaff([...selectedStaff, id]);
        }
    };

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-[#292C2D] flex items-center justify-center text-white hover:bg-[#3D4142] transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-white font-medium text-[25px]">Staff Management</h1>
                </div>

                <div className="flex gap-4 items-center">
                    <button className="w-10 h-10 rounded-xl bg-[#292C2D] flex items-center justify-center text-white relative">
                        <span className="sr-only">Notifications</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#FAC1D9] rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3 bg-[#292C2D] pl-1 pr-3 py-1 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FAC1D9] to-[#9b51e0]" />
                        <span className="text-white text-sm font-medium">Admin</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>
            </div>

            <h2 className="text-white text-[25px] font-medium mb-6">Staff ({mockStaff.length})</h2>

            {/* Tabs & Actions */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('Staff Management')}
                        className={`
                            px-6 py-2 rounded-[8px] font-medium text-base transition-all
                            ${activeTab === 'Staff Management' ? 'bg-[#FAC1D9] text-[#333333]' : 'text-white hover:bg-[#292C2D]'}
                        `}
                    >
                        Staff Management
                    </button>
                    <button
                        onClick={() => setActiveTab('Attendance')}
                        className={`
                            px-6 py-2 rounded-[8px] font-medium text-base transition-all
                            ${activeTab === 'Attendance' ? 'bg-[#FAC1D9] text-[#333333]' : 'text-white hover:bg-[#292C2D]'}
                        `}
                    >
                        Attendance
                    </button>
                </div>

                <div className="flex gap-4">
                    <button className="bg-[#FAC1D9] text-[#333333] px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                        Add Staff
                    </button>

                    <div className="flex items-center gap-2 bg-[#3D4142] px-4 py-2 rounded-lg">
                        <span className="text-white text-sm font-light">Sort by</span>
                        <ChevronDown size={14} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Staff Table */}
            <div className="bg-[#292C2D] rounded-[10px] overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#3D4142]">
                            <th className="py-4 px-6 w-[50px]">
                                <div
                                    className={`w-4 h-4 border rounded-[2px] cursor-pointer flex items-center justify-center ${selectedStaff.length === mockStaff.length ? 'bg-[#FAC1D9] border-[#FAC1D9]' : 'border-white'}`}
                                    onClick={toggleSelectAll}
                                >
                                    {selectedStaff.length === mockStaff.length && <div className="w-2 h-2 bg-[#333333]" />}
                                </div>
                            </th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">ID</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Name</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Email</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Phone</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Age</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Salary</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm">Timings</th>
                            <th className="py-4 px-6 text-left text-white font-medium text-sm"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStaff.map((staff, index) => (
                            <tr key={staff.id} className="border-b border-[#3D4142]/5 hover:bg-[#3D4142] transition-colors group">
                                <td className="py-4 px-6">
                                    <div
                                        className={`w-4 h-4 border rounded-[2px] cursor-pointer flex items-center justify-center ${selectedStaff.includes(staff.id) ? 'bg-[#FAC1D9] border-[#FAC1D9]' : 'border-white'}`}
                                        onClick={() => toggleSelect(staff.id)}
                                    >
                                        {selectedStaff.includes(staff.id) && <div className="w-2 h-2 bg-[#333333]" />}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.staffId}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600">
                                            {/* Placeholder Avatar */}
                                            <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" onError={(e: any) => { e.target.style.display = 'none' }} />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm">{staff.name}</div>
                                            <div className="text-[#FAC1D9] text-xs">{staff.role}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.email}</td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.phone}</td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.age}</td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.salary}</td>
                                <td className="py-4 px-6 text-white text-sm opacity-80">{staff.timings}</td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                        <button className="w-8 h-8 rounded-full bg-[#FAC1D9] flex items-center justify-center text-[#333333] hover:opacity-80">
                                            <Eye size={16} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#333333] hover:opacity-80">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-[#E70000] flex items-center justify-center text-white hover:opacity-80">
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
