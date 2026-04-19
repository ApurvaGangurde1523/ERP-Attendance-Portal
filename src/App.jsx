import React, { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  Filter,
  Download,
  ChevronDown,
  Search,
  Bell,
  AlertCircle,
  Check,
  X,
  Clock,
  BarChart3,
  CalendarDays,
  Plus,
  Activity
} from 'lucide-react';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

export default function AttendanceSystem() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [viewMode, setViewMode] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH101', totalClasses: 45, attended: 42, percentage: 93.3, instructor: 'Dr. Smith', color: '#3b82f6', schedule: 'Mon, Wed, Fri - 9:00 AM', room: 'A-101' },
    { id: 2, name: 'Physics', code: 'PHY201', totalClasses: 40, attended: 35, percentage: 87.5, instructor: 'Prof. Johnson', color: '#8b5cf6', schedule: 'Tue, Thu - 11:00 AM', room: 'B-205' },
    { id: 3, name: 'Computer Science', code: 'CS301', totalClasses: 48, attended: 46, percentage: 95.8, instructor: 'Dr. Williams', color: '#10b981', schedule: 'Mon, Wed - 2:00 PM', room: 'C-302' },
    { id: 4, name: 'Chemistry', code: 'CHEM101', totalClasses: 42, attended: 38, percentage: 90.5, instructor: 'Dr. Brown', color: '#f59e0b', schedule: 'Tue, Fri - 10:00 AM', room: 'Lab-1' },
    { id: 5, name: 'English', code: 'ENG101', totalClasses: 35, attended: 30, percentage: 85.7, instructor: 'Prof. Davis', color: '#ef4444', schedule: 'Thu - 3:00 PM', room: 'D-104' },
  ]);

  const totalClasses = subjects.reduce((sum, sub) => sum + sub.totalClasses, 0);
  const totalAttended = subjects.reduce((sum, sub) => sum + sub.attended, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);

  const trendData = [
    { month: 'Jan', attendance: 88 },
    { month: 'Feb', attendance: 91 },
    { month: 'Mar', attendance: 89 },
    { month: 'Apr', attendance: 92 },
    { month: 'May', attendance: 90 },
    { month: 'Jun', attendance: 93 }
  ];

  const weeklyData = [
    { day: 'Mon', present: 4, absent: 1 },
    { day: 'Tue', present: 5, absent: 0 },
    { day: 'Wed', present: 4, absent: 1 },
    { day: 'Thu', present: 5, absent: 0 },
    { day: 'Fri', present: 3, absent: 2 }
  ];

  const pieData = [
    { name: 'Present', value: totalAttended, color: '#10b981' },
    { name: 'Absent', value: totalClasses - totalAttended, color: '#ef4444' }
  ];

  const recentRecords = [
    { date: '2024-11-20', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { date: '2024-11-20', subject: 'Physics', status: 'Present', time: '11:00 AM' },
    { date: '2024-11-19', subject: 'Computer Science', status: 'Present', time: '02:00 PM' },
    { date: '2024-11-19', subject: 'Chemistry', status: 'Absent', time: '10:00 AM' },
    { date: '2024-11-18', subject: 'English', status: 'Present', time: '03:00 PM' }
  ];

  const notifications = [
    { id: 1, type: 'warning', message: 'English attendance below 90%. Attend next 3 classes.', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Perfect attendance in Computer Science this week!', time: '1 day ago' },
    { id: 3, type: 'info', message: 'Physics class rescheduled to 12:00 PM tomorrow.', time: '2 days ago' }
  ];

  const handleMarkAttendance = (subjectId, status) => {
    setSubjects(subjects.map(sub => {
      if (sub.id === subjectId) {
        const newAttended = status === 'present' ? sub.attended + 1 : sub.attended;
        const newTotal = sub.totalClasses + 1;

        return {
          ...sub,
          attended: newAttended,
          totalClasses: newTotal,
          percentage: parseFloat(((newAttended / newTotal) * 100).toFixed(1))
        };
      }
      return sub;
    }));
    setShowMarkAttendance(false);
  };

  const filteredSubjects = subjects.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = format => {
    alert('Exporting attendance report as ' + format.toUpperCase());
  };

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const randomStatus = Math.random() > 0.15 ? 'present' : 'absent';
      days.push({ day: i, status: i <= 20 ? randomStatus : null });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* --- MARK ATTENDANCE POPUP --- */}
        {showMarkAttendance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">

              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">Mark Today's Attendance</h2>
                <button onClick={() => setShowMarkAttendance(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {subjects.map(subject => (
                  <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.code.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.schedule}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleMarkAttendance(subject.id, 'present')}
                          className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" /> Present
                        </button>

                        <button
                          onClick={() => handleMarkAttendance(subject.id, 'absent')}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" /> Absent
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* --- HEADER SECTION --- */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Attendance Management System
              </h1>
              <p className="text-gray-600">Track, analyze and manage your academic attendance</p>
            </div>

            <div className="flex gap-2 md:gap-3 flex-wrap">

              {/* 🔔 NOTIFICATION BUTTON */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">

                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {notifications.map(notif => (
                        <div key={notif.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start gap-3">

                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notif.type === 'warning'
                                ? 'bg-amber-500'
                                : notif.type === 'success'
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                            }`} />

                            <div className="flex-1">
                              <p className="text-sm">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>

              {/* ➕ MARK ATTENDANCE BUTTON */}
              <button
                onClick={() => setShowMarkAttendance(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Mark Attendance</span>
                <span className="sm:hidden">Mark</span>
              </button>

              {/* EXPORT */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50">

                  <button onClick={() => handleExport('pdf')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                    Export as PDF
                  </button>

                  <button onClick={() => handleExport('excel')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                    Export as Excel
                  </button>

                  <button onClick={() => handleExport('csv')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                    Export as CSV
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* SEARCH + TAB BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            <div className="flex gap-1 bg-white p-1 rounded-lg shadow-sm overflow-x-auto">

              <button
                onClick={() => setViewMode('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  viewMode === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Overview
              </button>

              <button
                onClick={() => setViewMode('subjects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  viewMode === 'subjects'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Subjects
              </button>

              <button
                onClick={() => setViewMode('analytics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  viewMode === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Activity className="w-4 h-4" /> Analytics
              </button>

              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  viewMode === 'calendar'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CalendarDays className="w-4 h-4" /> Calendar
              </button>

            </div>
          </div>
        </div>

        {/* --- ALERT FOR LOW ATTENDANCE --- */}
        {subjects.some(s => s.percentage < 90) && (
          <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">Attendance Alert!</p>
                <p className="text-sm text-amber-800">
                  {subjects.filter(s => s.percentage < 90).length} subject(s) below 90% threshold.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">

          {/* Card 1 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{overallPercentage}%</span>
            </div>
            <p className="text-blue-100 font-medium">Overall Attendance</p>
            <p className="text-sm text-blue-200 mt-1">{totalAttended}/{totalClasses} classes</p>

            <div className="mt-3 w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: overallPercentage + '%' }} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Check className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{totalAttended}</span>
            </div>
            <p className="text-emerald-100 font-medium">Classes Attended</p>
            <p className="text-sm text-emerald-200 mt-1">This semester</p>

            <div className="mt-3 flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3" /> +5 from last week
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{subjects.length}</span>
            </div>
            <p className="text-amber-100 font-medium">Total Subjects</p>
            <p className="text-sm text-amber-200 mt-1">Active courses</p>

            <div className="mt-3 flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" /> 15 weeks remaining
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">+2.3%</span>
            </div>
            <p className="text-purple-100 font-medium">Monthly Growth</p>
            <p className="text-sm text-purple-200 mt-1">vs last month</p>

            <div className="mt-3 flex items-center gap-1 text-xs">
              <BarChart3 className="w-3 h-3" /> Trending upward
            </div>
          </div>

        </div>

        {/* ============ VIEW MODES ============ */}
        
        {/* 🔵 OVERVIEW */}
        {viewMode === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* --- Trend Line Chart --- */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Attendance Trend</h2>

                <select
                  value={selectedPeriod}
                  onChange={e => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAttendance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* --- Pie Chart --- */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Distribution</h2>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-900">Attended</span>
                  <span className="font-bold text-green-700">{totalAttended}</span>
                </div>

                <div className="flex justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-sm text-red-900">Missed</span>
                  <span className="font-bold text-red-700">{totalClasses - totalAttended}</span>
                </div>
              </div>
            </div>

            {/* --- Subject Performance --- */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Subject Performance</h2>

              <div className="space-y-4">
                {filteredSubjects.map(subject => (
                  <div key={subject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.code.substring(0, 2)}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{subject.name}</h3>
                          <p className="text-sm text-gray-500">
                            {subject.code} • {subject.instructor}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: subject.color }}>
                          {subject.percentage}%
                        </p>
                        <p className="text-sm text-gray-500">
                          {subject.attended}/{subject.totalClasses}
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: subject.percentage + '%',
                          backgroundColor: subject.color
                        }}
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* --- Recent Activity --- */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

              <div className="space-y-3">
                {recentRecords.map((record, index) => (
                  <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      <p className="font-medium text-sm">{record.subject}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>

                    <span className={
                      'px-3 py-1 rounded-full text-xs font-semibold ' +
                      (record.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700')
                    }>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 🟪 SUBJECT TABLE */}
        {viewMode === 'subjects' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Details</h2>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4">Subject</th>
                    <th className="text-left py-4 px-4">Instructor</th>
                    <th className="text-center py-4 px-4">Attended</th>
                    <th className="text-center py-4 px-4">Percentage</th>
                    <th className="text-center py-4 px-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubjects.map(subject => (
                    <tr key={subject.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: subject.color }}
                          >
                            {subject.code.substring(0, 2)}
                          </div>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-600">
                        {subject.instructor}
                      </td>

                      <td className="py-4 px-4 text-center font-semibold">
                        {subject.attended}/{subject.totalClasses}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="text-lg font-bold" style={{ color: subject.color }}>
                          {subject.percentage}%
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className={
                          'px-3 py-1 rounded-full text-xs font-semibold ' +
                          (subject.percentage >= 90
                            ? 'bg-green-100 text-green-700'
                            : subject.percentage >= 75
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700')
                        }>
                          {subject.percentage >= 90
                            ? 'Excellent'
                            : subject.percentage >= 75
                            ? 'Good'
                            : 'At Risk'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* 🟦 ANALYTICS VIEW */}
        {viewMode === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Weekly pattern */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Weekly Pattern</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Subject comparison */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Subject Comparison</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjects} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="code" type="category" width={80} />
                  <Tooltip />

                  <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
                    {subjects.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Insights Panel */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Insights and Recommendations</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Best Performing</h3>
                  <p className="text-2xl font-bold">
                    {subjects.reduce((a, b) => (a.percentage > b.percentage ? a : b)).name}
                  </p>
                  <p className="text-sm opacity-90 mt-1">
                    {subjects.reduce((a, b) => (a.percentage > b.percentage ? a : b)).percentage}% attendance
                  </p>
                </div>

                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Needs Attention</h3>
                  <p className="text-2xl font-bold">
                    {subjects.reduce((a, b) => (a.percentage < b.percentage ? a : b)).name}
                  </p>
                  <p className="text-sm opacity-90 mt-1">
                    {subjects.reduce((a, b) => (a.percentage < b.percentage ? a : b)).percentage}% attendance
                  </p>
                </div>

                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Average</h3>
                  <p className="text-2xl font-bold">{overallPercentage}%</p>
                  <p className="text-sm opacity-90 mt-1">Across all subjects</p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 🟩 CALENDAR VIEW */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Attendance Calendar</h2>

              <select className="px-4 py-2 border rounded-lg text-sm">
                <option>November 2024</option>
                <option>October 2024</option>
                <option>September 2024</option>
              </select>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayData, index) => (
                <div
                  key={index}
                  className={
                    'aspect-square flex items-center justify-center rounded-lg text-sm font-medium ' +
                    (!dayData.status
                      ? 'bg-gray-100 text-gray-400'
                      : dayData.status === 'present'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700')
                  }
                >
                  {dayData.day}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-6">

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded" />
                <span className="text-sm">Present</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded" />
                <span className="text-sm">Absent</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
