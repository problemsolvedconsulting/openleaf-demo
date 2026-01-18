import React, { useState } from 'react';
import { 
  Target, AlertCircle, TrendingUp, Package, Calendar,
  ChevronDown, ChevronUp, DollarSign, Clock, BarChart3
} from 'lucide-react';

export default function ReorderPlanningDemo() {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // Sample inventory data with production planning fields
  const inventoryData = [
    {
      id: 1,
      sku: "SL-RSO-100-CS",
      productName: "SL RSO Caramel Chews Kona Sea Salt 100mg",
      available: 247,
      parLevel: 1500,
      gapToPar: 1253,
      avgSellThrough: 1500, // per month
      daysOfSupply: 5,
      wholesalePrice: 7.50,
      status: "critical"
    },
    {
      id: 2,
      sku: "SL-RSO-50-CS",
      productName: "SL RSO Caramel Chews 50mg",
      available: 89,
      parLevel: 650,
      gapToPar: 561,
      avgSellThrough: 419,
      daysOfSupply: 6,
      wholesalePrice: 6.50,
      status: "critical"
    },
    {
      id: 3,
      sku: "SL-CHOC-100-DB",
      productName: "SL Dark Chocolate Bar 100mg",
      available: 423,
      parLevel: 900,
      gapToPar: 477,
      avgSellThrough: 580,
      daysOfSupply: 22,
      wholesalePrice: 8.00,
      status: "medium"
    },
    {
      id: 4,
      sku: "SL-GUM-100-MG",
      productName: "SL Mango Gummies 100mg",
      available: 0,
      parLevel: 800,
      gapToPar: 800,
      avgSellThrough: 650,
      daysOfSupply: 0,
      wholesalePrice: 9.50,
      status: "critical"
    }
  ];

  // Filter only products below PAR
  const belowPARProducts = inventoryData.filter(item => item.available < item.parLevel);

  // Calculate totals
  const totalGap = belowPARProducts.reduce((sum, item) => sum + item.gapToPar, 0);
  const totalValueGap = belowPARProducts.reduce((sum, item) => sum + (item.gapToPar * item.wholesalePrice), 0);
  const criticalProducts = belowPARProducts.filter(item => item.daysOfSupply < 7);

  const getPriorityColor = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityLabel = (status) => {
    switch(status) {
      case 'critical': return 'URGENT';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Normal';
    }
  };

  const getProgressBarColor = (available, parLevel) => {
    const percentage = (available / parLevel) * 100;
    if (percentage < 20) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-emerald-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Reorder Planning</h1>
          </div>
          <p className="text-gray-600">Production recommendations based on PAR levels and sell-through rates</p>
        </div>

        {/* Collapsible Stats Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="text-emerald-600" size={20} />
              <span className="font-semibold text-gray-900">Overview Stats</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  Below PAR: <strong className="text-red-600">{belowPARProducts.length}</strong>
                </span>
                <span className="text-gray-600">
                  Gap: <strong className="text-orange-600">{totalGap.toLocaleString()}</strong> units
                </span>
                <span className="text-gray-600">
                  Value: <strong className="text-blue-600">${(totalValueGap / 1000).toFixed(1)}K</strong>
                </span>
              </div>
              {showStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>
          
          {showStats && (
            <div className="px-4 pb-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Products Below PAR</p>
                    <AlertCircle className="text-red-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-red-600">{belowPARProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">need production</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Total Gap to PAR</p>
                    <Package className="text-orange-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{totalGap.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">units to produce</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Value Gap</p>
                    <DollarSign className="text-blue-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">${(totalValueGap / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500 mt-1">potential revenue</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Critical (&lt;7 Days)</p>
                    <Clock className="text-purple-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{criticalProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">urgent production</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Alert Banner */}
        {criticalProducts.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">🚨 URGENT: Production Needed This Week</h3>
                <p className="text-red-800 mb-4">
                  {criticalProducts.length} products have less than 7 days of supply remaining. 
                  Immediate production recommended to avoid stockouts.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Schedule Production
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    View Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reorder Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
            <h2 className="text-xl font-bold text-gray-900">Products Below PAR Level</h2>
            <p className="text-sm text-gray-600 mt-1">Click any row to see detailed production recommendations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    PAR Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gap to PAR
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Recommended Qty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {belowPARProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-gray-900">{product.productName}</p>
                            <p className="text-sm text-gray-500 font-mono">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{product.available}</p>
                          <p className="text-xs text-gray-500">units</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-lg font-medium text-gray-700">{product.parLevel}</p>
                          <p className="text-xs text-gray-500">target</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-lg font-bold text-red-600">{product.gapToPar}</p>
                          <p className="text-xs text-gray-500">units short</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 inline-block">
                          <p className="text-sm font-bold text-emerald-800">
                            Produce {product.parLevel} units
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(product.status)}`}>
                          {getPriorityLabel(product.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {expandedProduct === product.id ? (
                          <ChevronUp className="text-gray-400" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400" size={20} />
                        )}
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedProduct === product.id && (
                      <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <td colSpan={8} className="px-6 py-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Left Column - Visual Progress */}
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-600" />
                                Current vs PAR Level
                              </h4>
                              
                              <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">
                                    {product.available} / {product.parLevel} units
                                  </span>
                                  <span className="text-sm font-bold text-gray-900">
                                    {Math.round((product.available / product.parLevel) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                                  <div 
                                    className={`h-8 ${getProgressBarColor(product.available, product.parLevel)} transition-all duration-500 flex items-center justify-center`}
                                    style={{ width: `${Math.max((product.available / product.parLevel) * 100, 5)}%` }}
                                  >
                                    {product.available > 0 && (
                                      <span className="text-xs font-bold text-white">
                                        {product.available} units
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <span className="text-sm text-gray-600">Gap to PAR</span>
                                  <span className="text-lg font-bold text-red-600">{product.gapToPar} units</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <span className="text-sm text-gray-600">Avg Monthly Sales</span>
                                  <span className="text-lg font-bold text-gray-900">{product.avgSellThrough} units</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <span className="text-sm text-gray-600">Days of Supply Left</span>
                                  <span className={`text-lg font-bold ${product.daysOfSupply < 7 ? 'text-red-600' : 'text-orange-600'}`}>
                                    {product.daysOfSupply} days
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Recommendations */}
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-purple-600" />
                                Production Recommendation
                              </h4>

                              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-6 mb-4">
                                <p className="text-sm opacity-90 mb-2">Recommended Production Quantity</p>
                                <p className="text-4xl font-bold mb-4">{product.parLevel} units</p>
                                <p className="text-sm opacity-90 mb-1">This will:</p>
                                <ul className="text-sm space-y-1">
                                  <li>✓ Fill gap of {product.gapToPar} units</li>
                                  <li>✓ Reach PAR level of {product.parLevel} units</li>
                                  <li>✓ Provide {Math.round((product.parLevel / product.avgSellThrough) * 30)} days of supply</li>
                                </ul>
                              </div>

                              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Financial Impact</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Production Value:</span>
                                    <span className="font-bold text-gray-900">
                                      ${(product.parLevel * product.wholesalePrice).toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Gap Value:</span>
                                    <span className="font-bold text-red-600">
                                      ${(product.gapToPar * product.wholesalePrice).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                                <Calendar size={18} />
                                Schedule Production
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Calendar Preview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="text-purple-600" size={24} />
            Recommended Production Schedule
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-red-900">THIS WEEK</h4>
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold">URGENT</span>
              </div>
              <div className="space-y-3">
                {belowPARProducts.filter(p => p.daysOfSupply < 7).map(product => (
                  <div key={product.id} className="bg-white rounded-lg p-3 border border-red-200">
                    <p className="font-medium text-gray-900 text-sm mb-1">{product.productName}</p>
                    <p className="text-xs text-gray-600">Produce: {product.parLevel} units</p>
                    <p className="text-xs text-red-600 font-semibold mt-1">
                      {product.daysOfSupply === 0 ? 'OUT OF STOCK' : `Only ${product.daysOfSupply} days left`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-orange-900">NEXT WEEK</h4>
                <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">HIGH</span>
              </div>
              <div className="space-y-3">
                {belowPARProducts.filter(p => p.daysOfSupply >= 7 && p.daysOfSupply < 14).length > 0 ? (
                  belowPARProducts.filter(p => p.daysOfSupply >= 7 && p.daysOfSupply < 14).map(product => (
                    <div key={product.id} className="bg-white rounded-lg p-3 border border-orange-200">
                      <p className="font-medium text-gray-900 text-sm mb-1">{product.productName}</p>
                      <p className="text-xs text-gray-600">Produce: {product.parLevel} units</p>
                      <p className="text-xs text-orange-600 font-semibold mt-1">
                        {product.daysOfSupply} days of supply
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No products scheduled</p>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-yellow-900">FOLLOWING WEEK</h4>
                <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-bold">MEDIUM</span>
              </div>
              <div className="space-y-3">
                {belowPARProducts.filter(p => p.daysOfSupply >= 14).length > 0 ? (
                  belowPARProducts.filter(p => p.daysOfSupply >= 14).map(product => (
                    <div key={product.id} className="bg-white rounded-lg p-3 border border-yellow-200">
                      <p className="font-medium text-gray-900 text-sm mb-1">{product.productName}</p>
                      <p className="text-xs text-gray-600">Produce: {product.parLevel} units</p>
                      <p className="text-xs text-yellow-600 font-semibold mt-1">
                        {product.daysOfSupply} days of supply
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No products scheduled</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
