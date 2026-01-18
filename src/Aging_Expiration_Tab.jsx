import React, { useState } from 'react';
import { 
  Flame, AlertTriangle, Calendar, DollarSign, Package,
  ChevronDown, ChevronUp, BarChart3, TrendingDown, Tag,
  Gift, Megaphone, Users, CheckCircle
} from 'lucide-react';

export default function AgingExpirationTab() {
  const [showStats, setShowStats] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Inventory data with expiration tracking
  const inventoryData = [
    {
      id: 1,
      sku: "SL-PS-100-SEAS",
      productName: "SL Pumpkin Spice 10x10 - Seasonal",
      batchId: "25-0715-12",
      available: 789,
      wholesalePrice: 6.50,
      inventoryValue: 5128.50,
      manufactureDate: "2025-07-15",
      expirationDate: "2026-01-15",
      daysUntilExpiration: 17,
      shelfLife: 182,
      agingStatus: "urgent",
      productCategory: "Caramels"
    },
    {
      id: 2,
      sku: "SL-CHOC-50-MB",
      productName: "SL Milk Chocolate Bar 50mg",
      batchId: "25-0820-15",
      available: 234,
      wholesalePrice: 7.00,
      inventoryValue: 1638.00,
      manufactureDate: "2025-08-20",
      expirationDate: "2026-02-18",
      daysUntilExpiration: 51,
      shelfLife: 182,
      agingStatus: "aging",
      productCategory: "Chocolates"
    },
    {
      id: 3,
      sku: "SL-PRETZEL-100",
      productName: "SL Chocolate Covered Pretzels 100mg",
      batchId: "25-0915-08",
      available: 456,
      wholesalePrice: 8.50,
      inventoryValue: 3876.00,
      manufactureDate: "2025-09-15",
      expirationDate: "2026-03-14",
      daysUntilExpiration: 75,
      shelfLife: 180,
      agingStatus: "monitor",
      productCategory: "Baked Goods"
    },
    {
      id: 4,
      sku: "SL-RSO-100-CS",
      productName: "SL RSO Caramel Chews 100mg",
      batchId: "25-0821-11",
      available: 247,
      wholesalePrice: 7.50,
      inventoryValue: 1852.50,
      manufactureDate: "2025-08-21",
      expirationDate: "2026-06-21",
      daysUntilExpiration: 177,
      shelfLife: 182,
      agingStatus: "fresh",
      productCategory: "Caramels"
    },
    {
      id: 5,
      sku: "SL-CHOC-100-DB",
      productName: "SL Dark Chocolate Bar 100mg",
      batchId: "25-1015-06",
      available: 423,
      wholesalePrice: 8.00,
      inventoryValue: 3384.00,
      manufactureDate: "2025-10-15",
      expirationDate: "2026-07-15",
      daysUntilExpiration: 201,
      shelfLife: 270,
      agingStatus: "fresh",
      productCategory: "Chocolates"
    }
  ];

  // Aging rules by category
  const agingRules = {
    "Baked Goods": {
      shelfLife: "120 days",
      rules: [
        { range: "1-30 days", action: "NO action" },
        { range: "30-60 days", action: "Notify marketing team" },
        { range: "60-90 days", action: "25% discount + BOGO" }
      ]
    },
    "Caramels": {
      shelfLife: "182 days",
      rules: [
        { range: "1-30 days", action: "NO action" },
        { range: "30-60 days", action: "NO action" },
        { range: "60-90 days", action: "Notify marketing team" },
        { range: "90+ days", action: "25% discount + BOGO" }
      ]
    },
    "Chocolates": {
      shelfLife: "270 days",
      rules: [
        { range: "1-60 days", action: "NO action" },
        { range: "60-90 days", action: "Notify marketing team" },
        { range: "90-180 days", action: "Push sales" },
        { range: "180+ days", action: "25% discount + BOGO" }
      ]
    }
  };

  // Group by aging status
  const urgentProducts = inventoryData.filter(p => p.agingStatus === 'urgent');
  const agingProducts = inventoryData.filter(p => p.agingStatus === 'aging');
  const monitorProducts = inventoryData.filter(p => p.agingStatus === 'monitor');
  const freshProducts = inventoryData.filter(p => p.agingStatus === 'fresh');

  // Calculate stats
  const totalAtRisk = urgentProducts.length + agingProducts.length + monitorProducts.length;
  const valueAtRisk = [...urgentProducts, ...agingProducts, ...monitorProducts]
    .reduce((sum, p) => sum + p.inventoryValue, 0);
  const urgentValue = urgentProducts.reduce((sum, p) => sum + p.inventoryValue, 0);

  const getAgingColor = (status) => {
    switch(status) {
      case 'urgent': return 'border-red-300 bg-red-50';
      case 'aging': return 'border-orange-300 bg-orange-50';
      case 'monitor': return 'border-yellow-300 bg-yellow-50';
      case 'fresh': return 'border-emerald-300 bg-emerald-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getAgingBadge = (days) => {
    if (days < 30) return { color: 'bg-red-100 text-red-800 border-red-300', label: `${days}d - URGENT`, icon: '🔥' };
    if (days < 60) return { color: 'bg-orange-100 text-orange-800 border-orange-300', label: `${days}d - Aging`, icon: '🟠' };
    if (days < 90) return { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: `${days}d - Monitor`, icon: '🟡' };
    return { color: 'bg-emerald-100 text-emerald-800 border-emerald-300', label: `${days}d - Fresh`, icon: '✓' };
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getRecommendedActions = (days, category) => {
    if (days < 30) {
      return [
        { icon: Tag, text: "Apply 25% discount immediately", color: "text-red-600" },
        { icon: Gift, text: "Run BOGO promotion this week", color: "text-red-600" },
        { icon: Megaphone, text: "Notify marketing team", color: "text-red-600" },
        { icon: Users, text: "Send bulk offer to top 5 customers", color: "text-red-600" }
      ];
    } else if (days < 60) {
      return [
        { icon: Megaphone, text: "Notify marketing team", color: "text-orange-600" },
        { icon: Users, text: "Contact key accounts", color: "text-orange-600" }
      ];
    } else if (days < 90) {
      return [
        { icon: Megaphone, text: "Notify marketing team", color: "text-yellow-600" },
        { icon: TrendingDown, text: "Monitor inventory levels", color: "text-yellow-600" }
      ];
    }
    return [];
  };

  const ProductCard = ({ product, showActions = true }) => {
    const badge = getAgingBadge(product.daysUntilExpiration);
    const isExpanded = expandedProduct === product.id;
    const actions = getRecommendedActions(product.daysUntilExpiration, product.productCategory);

    return (
      <div className={`rounded-xl border-2 overflow-hidden ${getAgingColor(product.agingStatus)}`}>
        <button
          onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
          className="w-full p-6 flex items-center justify-between hover:bg-white/50 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="text-left flex-1">
              <h3 className="text-lg font-bold text-gray-900">{product.productName}</h3>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm text-gray-600">Batch: {product.batchId}</p>
                <span className="text-gray-400">|</span>
                <p className="text-sm text-gray-600">{product.available} units</p>
                <span className="text-gray-400">|</span>
                <p className="text-sm font-semibold text-gray-900">${product.inventoryValue.toLocaleString()} value</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${badge.color} flex items-center gap-2`}>
              <span>{badge.icon}</span>
              {badge.label}
            </span>
            {showActions && actions.length > 0 && (isExpanded ? (
              <ChevronUp className="text-gray-400" size={24} />
            ) : (
              <ChevronDown className="text-gray-400" size={24} />
            ))}
          </div>
        </button>

        {isExpanded && showActions && actions.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-white">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left - Product Details */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Product Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Manufactured</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(product.manufactureDate)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Expires</span>
                    <span className="text-sm font-medium text-gray-900">{formatDate(product.expirationDate)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Shelf Life</span>
                    <span className="text-sm font-medium text-gray-900">{product.shelfLife} days</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="text-sm font-medium text-gray-900">{product.productCategory}</span>
                  </div>
                </div>
              </div>

              {/* Right - Recommended Actions */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">📋 Recommended Actions</h4>
                <div className="space-y-3 mb-4">
                  {actions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg">
                      <action.icon className={action.color} size={20} />
                      <span className={`text-sm font-medium ${action.color}`}>{action.text}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm">
                    Apply Discount
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm">
                    Create Promo
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                    Notify Team
                  </button>
                  <button className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                    Bulk Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="text-orange-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Aging & Expiration</h1>
          </div>
          <p className="text-gray-600">Track products approaching expiration with automated discount recommendations</p>
        </div>

        {/* Collapsible Stats Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="text-orange-600" size={20} />
              <span className="font-semibold text-gray-900">Expiration Overview</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">
                  At Risk: <strong className="text-orange-600">{totalAtRisk}</strong> products
                </span>
                <span className="text-gray-600">
                  Value at Risk: <strong className="text-red-600">${(valueAtRisk / 1000).toFixed(1)}K</strong>
                </span>
                <span className="text-gray-600">
                  Urgent: <strong className="text-red-600">{urgentProducts.length}</strong>
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
                    <p className="text-sm text-gray-600">Urgent (&lt;30d)</p>
                    <Flame className="text-red-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-red-600">{urgentProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">${(urgentValue / 1000).toFixed(1)}K at risk</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Aging (30-60d)</p>
                    <AlertTriangle className="text-orange-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{agingProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">need attention</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Monitor (60-90d)</p>
                    <Calendar className="text-yellow-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">{monitorProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">watch closely</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border-2 border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Fresh (90+ days)</p>
                    <CheckCircle className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{freshProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">no action needed</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Urgent Section */}
        {urgentProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <Flame className="text-red-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-red-900">🔥 URGENT - Expires in &lt; 30 Days</h2>
                  <p className="text-sm text-red-800 mt-1">
                    {urgentProducts.length} product{urgentProducts.length > 1 ? 's' : ''} expiring soon. 
                    Total value at risk: ${urgentValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {urgentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Aging Section */}
        {agingProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-orange-900">🟠 AGING - 30-60 Days Until Expiration</h2>
                  <p className="text-sm text-orange-800 mt-1">
                    {agingProducts.length} product{agingProducts.length > 1 ? 's' : ''} in aging range
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {agingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Monitor Section */}
        {monitorProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-yellow-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-yellow-900">🟡 MONITOR - 60-90 Days Until Expiration</h2>
                  <p className="text-sm text-yellow-800 mt-1">
                    {monitorProducts.length} product{monitorProducts.length > 1 ? 's' : ''} to monitor
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {monitorProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Fresh Section - Collapsible */}
        {freshProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-emerald-100 border-2 border-emerald-300 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-600" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-emerald-900">✓ FRESH - 90+ Days Until Expiration</h2>
                  <p className="text-sm text-emerald-800 mt-1">
                    {freshProducts.length} product{freshProducts.length > 1 ? 's' : ''} - No action needed
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {freshProducts.map(product => (
                <ProductCard key={product.id} product={product} showActions={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
