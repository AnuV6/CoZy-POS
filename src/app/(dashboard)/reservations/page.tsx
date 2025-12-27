'use client';

import { useState } from 'react';
import {
    ChevronDown,
    ArrowLeft,
    Users
} from 'lucide-react';
import { mockReservations, mockTables } from '@/lib/mock-data';

const TIME_SLOTS = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function ReservationsPage() {
    const [activeFloor, setActiveFloor] = useState('1st Floor');

    // Helper to calculate position and width of reservation card
    const getReservationStyle = (startTime: string, endTime: string) => {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMin = parseInt(startTime.split(':')[1]);
        const endHour = parseInt(endTime.split(':')[0]);
        const endMin = parseInt(endTime.split(':')[1]);

        const startOffset = (startHour - 10) * 100 + (startMin / 60) * 100;
        const duration = ((endHour - startHour) * 60 + (endMin - startMin)) / 60 * 100;

        return {
            left: `${startOffset}px`,
            width: `${duration}px`
        };
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-[#292C2D] flex items-center justify-center text-white hover:bg-[#3D4142] transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-white font-medium text-[25px]">Reservation</h1>
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

            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-8">
                    {['1st Floor', '2nd Floor', '3rd Floor'].map((floor) => (
                        <button
                            key={floor}
                            onClick={() => setActiveFloor(floor)}
                            className={`
                                px-6 py-3 rounded-[8px] font-medium text-base transition-all
                                ${activeFloor === floor ? 'bg-[#FAC1D9] text-[#333333]' : 'text-white hover:bg-[#292C2D]'}
                            `}
                        >
                            {floor}
                        </button>
                    ))}
                </div>

                <div className="flex gap-6">
                    <div className="flex items-center gap-2 bg-[#3D4142] px-5 py-3 rounded-lg text-white min-w-[140px] justify-between cursor-pointer hover:bg-[#4D5152] transition-colors">
                        <span className="text-sm font-light">Today</span>
                        <ChevronDown size={14} />
                    </div>

                    <button className="bg-[#FAC1D9] text-[#333333] px-6 py-3 rounded-lg font-medium text-base hover:bg-[#ffb6d4] transition-colors">
                        Add New Reservation
                    </button>
                </div>
            </div>

            {/* Timeline Grid */}
            <div className="flex-1 bg-[#111315] border-t border-[#3D4142] overflow-x-auto">
                <div className="min-w-[1200px]">
                    {/* Time Header */}
                    <div className="flex border-b border-[#3D4142]">
                        <div className="w-[150px] shrink-0 border-r border-[#3D4142] bg-[#111315] sticky left-0 z-10"></div>
                        <div className="flex-1 flex relative">
                            {TIME_SLOTS.map((time) => (
                                <div key={time} className="w-[100px] shrink-0 text-center py-4 border-r border-[#3D4142] text-white text-sm font-medium">
                                    {time}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Rows */}
                    {mockTables.map((table) => (
                        <div key={table.id} className="flex border-b border-[#3D4142] h-[100px]">
                            {/* Table Name Column */}
                            <div className="w-[150px] shrink-0 border-r border-[#3D4142] bg-[#111315] flex items-center justify-center sticky left-0 z-10">
                                <span className="text-white font-medium">{table.name}</span>
                            </div>

                            {/* Timeline Cells */}
                            <div className="flex-1 flex relative">
                                {/* Grid Lines */}
                                {TIME_SLOTS.map((slot) => (
                                    <div key={slot} className="w-[100px] shrink-0 border-r border-[#3D4142] h-full" />
                                ))}

                                {/* Reservations Overlay */}
                                {mockReservations
                                    .filter(res => res.tableId === table.id)
                                    .map(res => {
                                        const style = getReservationStyle(res.startTime, res.endTime);
                                        return (
                                            <div
                                                key={res.id}
                                                className={`absolute top-2 bottom-2 rounded-lg p-3 flex flex-col justify-center gap-1 cursor-pointer transition-transform hover:scale-[1.02] z-0
                                                    ${res.type === 'new' ? 'bg-[#FAC1D9] text-[#333333]' : 'bg-[#3D4142] text-white'}
                                                `}
                                                style={style}
                                            >
                                                <div className="font-medium text-sm truncate">{res.guestName}</div>
                                                <div className="flex items-center gap-1.5 text-xs opacity-80">
                                                    <Users size={12} />
                                                    <span>0{res.guests}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
