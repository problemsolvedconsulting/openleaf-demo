import React, { useState } from 'react';
import { 
  Users, Phone, Mail, MapPin, Calendar, Package,
  TrendingUp, AlertCircle, CheckCircle, Building2,
  ChevronDown, ChevronUp, BarChart3, FileText, Eye, User
} from 'lucide-react';

export default function CustomersCRMTab() {
  const [showStats, setShowStats] = useState(false);
  const [filterRep, setFilterRep] = useState('all');
  const [expandedCustomers, setExpandedCustomers] = useState({});

  const toggleCustomer = (id) => {
    setExpandedCustomers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Customer/Dispensary data
  const customers = [
    {
      id: 1,
      name: "Mint Cannabis - Tempe",
      rep: "Sarah",
      address: "4104 E 32nd St, Tempe, AZ 85365",
      buyer: "Ricardo Nava",
      buyerEmail: "ricardo@mintcannabis.com",
      buyerPhone: "(480) 555-0123",
      doorCount: 2,
      employeeCount: 12,
      buysBulk: true,
      lastOrder: "2025-01-27",
      lastSampleDrop: "2025-01-15",
      lastVisit: "2025-01-10",
      lastMenuCheck: "2025-01-25",
      totalOrders: 24,
      avgOrderSize: 450,
      ytdRevenue: 108000
    },
    {
      id: 2,
      name: "Curaleaf - Phoenix",
      rep: "HP",
      address: "520 S Price Rd, Phoenix, AZ 85288",
      buyer: "James Newland",
      buyerEmail: "james.newland@curaleaf.com",
      buyerPhone: "(602) 555-0456",
      doorCount: 3,
      employeeCount: 25,
      buysBulk: true,
      lastOrder: "2025-01-08",
      lastSampleDrop: "2024-12-20",
      lastVisit: "2024-12-15",
      lastMenuCheck: "2025-01-05",
      totalOrders: 18,
      avgOrderSize: 680,
      ytdRevenue: 122400
    },
    {
      id: 3,
      name: "The Flower Shop - Scottsdale",
      rep: "Lucas",
      address: "9420 W Bell Rd #108, Scottsdale, AZ 85351",
      buyer: "Aaron Hicks",
      buyerEmail: "aaron@theflowershop.com",
      buyerPhone: "(480) 555-0789",
      doorCount: 1,
      employeeCount: 8,
      buysBulk: false,
      lastOrder: "2025-01-16",
      lastSampleDrop: "2025-01-05",
      lastVisit: "2024-12-28",
      lastMenuCheck: "2025-01-12",
      totalOrders: 12,
      avgOrderSize: 280,
      ytdRevenue: 33600
    },
    {
      id: 4,
      name: "Territory Dispensary",
      rep: "Open",
      address: "2841 W Thunderbird Rd, Phoenix, AZ 85053",
      buyer: "Store Manager",
      buyerEmail: "orders@territory.com",
      buyerPhone: "(602) 555-0321",
      doorCount: 1,
      employeeCount: 10,
      buysBulk: true,
      lastOrder: "2024-12-30",
      lastSampleDrop: "2024-12-10",
      lastVisit: "2024-12-05",
      lastMenuCheck: "2024-12-28",
      totalOrders: 15,
      avgOrderSize: 320,
      ytdRevenue: 48000
    },
    {
      id: 5,
      name: "JARS Cannabis",
      rep: "Sarah",
      address: "Multiple Locations - Phoenix Metro",
      buyer: "Emily Chen",
      buyerEmail: "emily.chen@jarscannabis.com",
      buyerPhone: "(480) 555-0654",
      doorCount: 4,
      employeeCount: 45,
      buysBulk: true,
      lastOrder: "2025-01-10",
      lastSampleDrop: "2025-01-02",
      lastVisit: "2024-12-20",
      lastMenuCheck: "2025-01-08",
      totalOrders: 28,
      avgOrderSize: 850,
      ytdRevenue: 238000
    },
    {
      id: 6,
      name: "Sol Flower - Scottsdale",
      rep: "HP",
      address: "15380 N Northsight Blvd, Scottsdale, AZ 85260",
      buyer: "Michael Torres",
      buyerEmail: "michael@solflower.com",
      buyerPhone: "(480) 555-0987",
      doorCount: 2,
      employeeCount: 18,
      buysBulk: true,
      lastOrder: "2024-12-15",
      lastSampleDrop: "2024-11-28",
      lastVisit: "2024-11-20",
      lastMenuCheck: "2024-12-10",
      totalOrders: 9,
      avgOrderSize: 520,
      ytdRevenue: 46800
    }
  ];

  const getDaysSince = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getContactStatusColor = (days) => {
    if (days < 14) return 'text-emerald-600';
    if (days < 30) return 'text-yellow-600';
    if (days < 45) return 'text-orange-600';
    return 'text-red-600';
  };

  const getContactStatusIcon = (days) => {
    if (days < 14) return '✓';
    if (days < 30) return '🟡';
    if (days < 45) return '🟠';
    return '🔴';
  };

  const getContactStatusLabel = (days) => {
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 14) return `${days} days ago ✓`;
    if (days < 30) return `${days} days ago 🟡`;
    if (days < 45) return `${days} days ago 🟠`;
    return `${days} days ago 🔴`;
  };

  // Calculate stats
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.ytdRevenue, 0);
  const avgRevenue = totalRevenue / totalCustomers;
  const needsFollowUp = customers.filter(c => getDaysSince(c.lastOrder) > 30).length;
  const activeCustomers = customers.filter(c => getDaysSince(c.lastOrder) <= 30).length;

  // Filter customers
  const filteredCustomers = customers
    .filter(customer => {
      if (filterRep === 'all') return true;
      return customer.rep === filterRep;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Get unique reps
  const reps = [...new Set(customers.map(c => c.rep))];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Customer Relationships</h1>
          </div>
          <p className="text-gray-600">Dispensary CRM with order history and contact tracking</p>
        </div>

        {/* Collapsible Stats Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-900">Customer Analytics</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  Total Customers: <strong className="text-blue-600">{totalCustomers}</strong>
                </span>
                <span className="text-gray-600">
                  YTD Revenue: <strong className="text-emerald-600">${(totalRevenue / 1000).toFixed(0)}K</strong>
                </span>
                <span className="text-gray-600">
                  Need Follow-Up: <strong className="text-orange-600">{needsFollowUp}</strong>
                </span>
              </div>
              {showStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {showStats && (
            <div className="px-4 pb-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <Building2 className="text-blue-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
                  <p className="text-xs text-gray-500 mt-1">dispensaries</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">YTD Revenue</p>
                    <TrendingUp className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">${(totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500 mt-1">total sales</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Avg Revenue</p>
                    <BarChart3 className="text-purple-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">${(avgRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500 mt-1">per customer</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Need Follow-Up</p>
                    <AlertCircle className="text-orange-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{needsFollowUp}</p>
                  <p className="text-xs text-gray-500 mt-1">30+ days since order</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by Sales Rep:</label>
            <select 
              value={filterRep}
              onChange={(e) => setFilterRep(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Reps ({totalCustomers})</option>
              {reps.map(rep => (
                <option key={rep} value={rep}>
                  {rep} ({customers.filter(c => c.rep === rep).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customer Cards - Collapsible */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => {
            const daysSinceOrder = getDaysSince(customer.lastOrder);
            const daysSinceSample = getDaysSince(customer.lastSampleDrop);
            const daysSinceVisit = getDaysSince(customer.lastVisit);
            const needsAttention = daysSinceOrder > 30;
            const isExpanded = expandedCustomers[customer.id];

            return (
              <div 
                key={customer.id} 
                className={`bg-white rounded-xl shadow-lg border-2 ${needsAttention ? 'border-orange-300' : 'border-gray-200'} overflow-hidden transition-all`}
              >
                {/* Collapsible Header */}
                <button
                  onClick={() => toggleCustomer(customer.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${needsAttention ? 'bg-orange-100' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                      <Building2 className={needsAttention ? 'text-orange-600' : 'text-blue-600'} size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-gray-600">Rep: {customer.rep}</p>
                        <span className="text-gray-400">|</span>
                        <p className="text-sm text-gray-600">{customer.doorCount} {customer.doorCount === 1 ? 'Door' : 'Doors'}</p>
                        <span className="text-gray-400">|</span>
                        <p className="text-sm font-semibold text-emerald-600">${(customer.ytdRevenue / 1000).toFixed(0)}K YTD</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {needsAttention && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold border border-orange-300">
                        NEEDS FOLLOW-UP
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {/* Location */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{customer.address}</span>
                      </div>
                    </div>

                    {/* Stats Section - Moved to top */}
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Performance</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                          <p className="text-2xl font-bold text-gray-900">{customer.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Avg Order Size</p>
                          <p className="text-2xl font-bold text-gray-900">{customer.avgOrderSize}</p>
                          <p className="text-xs text-gray-500">units</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">YTD Revenue</p>
                          <p className="text-2xl font-bold text-emerald-600">${(customer.ytdRevenue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>

                    {/* Buyer Contact */}
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Buyer Contact</p>
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900">{customer.buyer}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Mail size={16} className="text-gray-400" />
                        <a href={`mailto:${customer.buyerEmail}`} className="text-sm text-blue-600 hover:underline">
                          {customer.buyerEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <a href={`tel:${customer.buyerPhone}`} className="text-sm text-blue-600 hover:underline">
                          {customer.buyerPhone}
                        </a>
                      </div>
                    </div>

                    {/* Last Contact Tracking */}
                    <div className="p-6 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Last Contact</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Last Order</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(customer.lastOrder)}</p>
                          <p className={`text-xs font-semibold mt-1 ${getContactStatusColor(daysSinceOrder)}`}>
                            {getContactStatusLabel(daysSinceOrder)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Last Sample Drop</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(customer.lastSampleDrop)}</p>
                          <p className={`text-xs font-semibold mt-1 ${getContactStatusColor(daysSinceSample)}`}>
                            {getContactStatusLabel(daysSinceSample)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(customer.lastVisit)}</p>
                          <p className={`text-xs font-semibold mt-1 ${getContactStatusColor(daysSinceVisit)}`}>
                            {getContactStatusLabel(daysSinceVisit)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-2 gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Phone size={16} />
                          Call
                        </button>
                        <button className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Mail size={16} />
                          Email
                        </button>
                        <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Package size={16} />
                          Log Sample Drop
                        </button>
                        <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Eye size={16} />
                          View History
                        </button>
                        <button className="col-span-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm">
                          <FileText size={16} />
                          Send Intake Sheet
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
