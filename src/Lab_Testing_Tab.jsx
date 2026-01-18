import React, { useState } from 'react';
import { 
  TestTube, DollarSign, CheckCircle, XCircle, Clock,
  ChevronDown, ChevronUp, AlertTriangle, TrendingUp,
  Calendar, BarChart3, Eye
} from 'lucide-react';

export default function LabTestingTab() {
  const [expandedTest, setExpandedTest] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Lab test tracking data
  const labTests = [
    {
      id: 1,
      confidantId: "2512APO4455.22901",
      batchId: "25-0825-03",
      productName: "SL Mango Gummies 100mg",
      lab: "Apollo Labs",
      testType: "Post Production - Edible",
      cost: 150,
      dateSubmitted: "2025-12-21",
      dateResults: null,
      leadTime: null,
      status: "awaiting",
      daysWaiting: 8,
      notes: "Expected results: 12/30/2025"
    },
    {
      id: 2,
      confidantId: "2510APO4201.20156",
      batchId: "25-1015-06",
      productName: "SL Dark Chocolate Bar 100mg",
      lab: "Apollo Labs",
      testType: "Post Production - Edible",
      cost: 150,
      dateSubmitted: "2025-10-20",
      dateResults: "2025-10-22",
      leadTime: 2,
      status: "passed",
      daysWaiting: null,
      notes: ""
    },
    {
      id: 3,
      confidantId: "2508APO3772.18728",
      batchId: "25-0820-08",
      productName: "SL RSO Caramel Chews 50mg",
      lab: "Apollo Labs",
      testType: "Post Production - Edible",
      cost: 150,
      dateSubmitted: "2025-08-25",
      dateResults: "2025-08-27",
      leadTime: 2,
      status: "passed",
      daysWaiting: null,
      notes: ""
    },
    {
      id: 4,
      confidantId: "2508APO3771.18727",
      batchId: "25-0821-11",
      productName: "SL RSO Caramel Chews 100mg",
      lab: "Apollo Labs",
      testType: "Post Production - Edible",
      cost: 150,
      dateSubmitted: "2025-08-26",
      dateResults: "2025-08-28",
      leadTime: 2,
      status: "passed",
      daysWaiting: null,
      notes: ""
    },
    {
      id: 5,
      confidantId: "2507APO2901.15023",
      batchId: "24-0715-08",
      productName: "SL Dark Chocolate Bar 100mg",
      lab: "Apollo Labs",
      testType: "Post Production - Edible",
      cost: 150,
      dateSubmitted: "2024-07-20",
      dateResults: "2024-07-23",
      leadTime: 3,
      status: "failed",
      daysWaiting: null,
      notes: "Microbial count exceeded limits. Batch destroyed per protocol. Root cause: Equipment contamination during mixing. Corrective action: Deep clean and sanitization of all mixing equipment."
    },
    {
      id: 6,
      confidantId: "2411KAY2156.19087",
      batchId: "24-1101-15",
      productName: "SL Caramel Chews 100mg",
      lab: "Kaycha Labs",
      testType: "Post Production - Edible + Rush",
      cost: 200,
      dateSubmitted: "2024-11-01",
      dateResults: "2024-11-02",
      leadTime: 1,
      status: "passed",
      daysWaiting: null,
      notes: "Rush service requested for urgent shipment"
    }
  ];

  // Calculate stats
  const totalCost = labTests.reduce((sum, test) => sum + test.cost, 0);
  const totalTests = labTests.length;
  const passedTests = labTests.filter(t => t.status === 'passed').length;
  const failedTests = labTests.filter(t => t.status === 'failed').length;
  const awaitingTests = labTests.filter(t => t.status === 'awaiting').length;
  const avgCost = totalCost / totalTests;
  const testsWithLeadTime = labTests.filter(t => t.leadTime);
  const avgLeadTime = testsWithLeadTime.length > 0 
    ? testsWithLeadTime.reduce((sum, test) => sum + test.leadTime, 0) / testsWithLeadTime.length 
    : 0;
  const passRate = ((passedTests / (passedTests + failedTests)) * 100).toFixed(0);

  // Filter tests
  const filteredTests = labTests.filter(test => {
    if (filterStatus === 'all') return true;
    return test.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'passed':
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <CheckCircle size={14} />
            PASS
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <XCircle size={14} />
            FAIL
          </span>
        );
      case 'awaiting':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <Clock size={14} />
            Awaiting
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TestTube className="text-purple-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Lab Testing</h1>
          </div>
          <p className="text-gray-600">Complete test tracking with cost analytics and pass/fail monitoring</p>
        </div>

        {/* Collapsible Stats Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-600" size={20} />
              <span className="font-semibold text-gray-900">Testing Analytics</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  Total Cost: <strong className="text-purple-600">${totalCost.toLocaleString()}</strong>
                </span>
                <span className="text-gray-600">
                  Pass Rate: <strong className="text-emerald-600">{passRate}%</strong>
                </span>
                <span className="text-gray-600">
                  Awaiting: <strong className="text-yellow-600">{awaitingTests}</strong>
                </span>
              </div>
              {showStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {showStats && (
            <div className="px-4 pb-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Cost</p>
                    <DollarSign className="text-purple-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">${totalCost}</p>
                  <p className="text-xs text-gray-500 mt-1">YTD spending</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Avg Cost</p>
                    <DollarSign className="text-blue-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">${avgCost.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 mt-1">per test</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Pass Rate</p>
                    <CheckCircle className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{passRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">{passedTests} passed</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Failed</p>
                    <XCircle className="text-red-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-red-600">{failedTests}</p>
                  <p className="text-xs text-gray-500 mt-1">tests failed</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Avg Lead Time</p>
                    <Clock className="text-orange-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{avgLeadTime.toFixed(1)}</p>
                  <p className="text-xs text-gray-500 mt-1">days</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Alert for Awaiting Tests */}
        {awaitingTests > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Clock className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-yellow-900 mb-2">⏱ {awaitingTests} Test{awaitingTests > 1 ? 's' : ''} Pending Results</h3>
                <p className="text-yellow-800 mb-4">
                  {awaitingTests} batch{awaitingTests > 1 ? 'es are' : ' is'} awaiting lab results. 
                  Production and shipment may be delayed until results are received.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                    Follow Up with Lab
                  </button>
                  <button 
                    onClick={() => setFilterStatus('awaiting')}
                    className="px-4 py-2 bg-white border-2 border-yellow-600 text-yellow-600 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
                  >
                    View Pending Tests
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Log Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Test Log</h2>
                <p className="text-sm text-gray-600 mt-1">Click any row to see detailed notes and actions</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Tests ({totalTests})</option>
                  <option value="passed">Passed ({passedTests})</option>
                  <option value="failed">Failed ({failedTests})</option>
                  <option value="awaiting">Awaiting ({awaitingTests})</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Confident ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lab
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Results
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lead Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTests.map((test) => (
                  <React.Fragment key={test.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono text-gray-900">{test.confidantId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-mono font-medium text-gray-900">{test.batchId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{test.productName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{test.lab}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{formatDate(test.dateSubmitted)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">
                          {test.dateResults ? formatDate(test.dateResults) : (
                            <span className="text-yellow-600 font-medium">Pending ({test.daysWaiting}d)</span>
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {test.leadTime ? `${test.leadTime}d` : '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">${test.cost}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(test.status)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {test.notes && (expandedTest === test.id ? (
                          <ChevronUp className="text-gray-400" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400" size={20} />
                        ))}
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedTest === test.id && test.notes && (
                      <tr className={`${test.status === 'failed' ? 'bg-red-50' : test.status === 'awaiting' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
                        <td colSpan={10} className="px-6 py-6">
                          {test.status === 'failed' && (
                            <div className="bg-white rounded-xl border-2 border-red-200 p-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <XCircle className="text-red-600" size={24} />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-red-900 mb-2">Failed Test Details</h4>
                                  <p className="text-sm text-red-800 mb-4">{test.notes}</p>
                                  
                                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                      <p className="text-xs text-red-600 font-semibold mb-1">Test Cost Lost</p>
                                      <p className="text-2xl font-bold text-red-900">${test.cost}</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                      <p className="text-xs text-red-600 font-semibold mb-1">Action Taken</p>
                                      <p className="text-sm text-red-900">Batch destroyed per protocol</p>
                                    </div>
                                  </div>

                                  <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm">
                                      Review Corrective Actions
                                    </button>
                                    <button className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm">
                                      Download Report
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {test.status === 'awaiting' && (
                            <div className="bg-white rounded-xl border-2 border-yellow-200 p-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Clock className="text-yellow-600" size={24} />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-yellow-900 mb-2">Awaiting Results</h4>
                                  <p className="text-sm text-yellow-800 mb-4">{test.notes}</p>
                                  
                                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-4">
                                    <p className="text-xs text-yellow-600 font-semibold mb-1">Days Waiting</p>
                                    <p className="text-2xl font-bold text-yellow-900">{test.daysWaiting} days</p>
                                    <p className="text-xs text-yellow-700 mt-1">
                                      {test.daysWaiting > 5 ? 'Consider follow-up call' : 'Within normal timeframe'}
                                    </p>
                                  </div>

                                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors text-sm">
                                    Contact Lab for Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {test.status === 'passed' && test.notes && (
                            <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Eye className="text-blue-600" size={24} />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-blue-900 mb-2">Test Notes</h4>
                                  <p className="text-sm text-blue-800">{test.notes}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
