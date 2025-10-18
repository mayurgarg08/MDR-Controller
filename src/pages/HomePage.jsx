import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { 
  AlertTriangle, 
  Bell, 
  Info, 
  Activity, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  MapPin,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCheck,
  Stethoscope,
  Shield,
  Navigation,
  Calendar,
  FileText,
  Settings,
  Filter,
  Download,
  Eye,
  Thermometer,
  Wind
} from "lucide-react";

// Enhanced Mock Data for Hospital Infection Control
const kpis = [
  { id: 1, title: "Total Patients", value: 347, icon: <Users className="w-6 h-6" />, color: "from-blue-500 to-blue-600", textColor: "text-blue-600", change: "+12", trend: "up" },
  { id: 2, title: "Active MDR Cases", value: 23, icon: <ShieldAlert className="w-6 h-6" />, color: "from-red-500 to-red-600", textColor: "text-red-600", change: "+5", trend: "up" },
  { id: 3, title: "Staff on Duty", value: 87, icon: <UserCheck className="w-6 h-6" />, color: "from-green-500 to-green-600", textColor: "text-green-600", change: "+3", trend: "up" },
  { id: 4, title: "Isolation Capacity", value: "18/25", icon: <Activity className="w-6 h-6" />, color: "from-amber-500 to-amber-600", textColor: "text-amber-600", change: "72%", trend: "stable" },
  { id: 5, title: "Critical Alerts", value: 7, icon: <Bell className="w-6 h-6" />, color: "from-purple-500 to-purple-600", textColor: "text-purple-600", change: "+2", trend: "up" },
  { id: 6, title: "Lab Processing Time", value: "4.2h", icon: <Clock className="w-6 h-6" />, color: "from-cyan-500 to-cyan-600", textColor: "text-cyan-600", change: "-0.3h", trend: "down" },
];

// Patient Movement & Contact Tracking Data
const patientMovements = [
  { id: "P001", name: "John Doe", room: "ICU-12", lastMoved: "2h ago", contacts: 8, riskLevel: "high", mdrStatus: "positive" },
  { id: "P002", name: "Jane Smith", room: "W-A-15", lastMoved: "4h ago", contacts: 12, riskLevel: "medium", mdrStatus: "pending" },
  { id: "P003", name: "Mike Johnson", room: "SUR-8", lastMoved: "1h ago", contacts: 15, riskLevel: "high", mdrStatus: "positive" },
  { id: "P004", name: "Sarah Wilson", room: "ICU-7", lastMoved: "30m ago", contacts: 6, riskLevel: "low", mdrStatus: "negative" },
];

// Staff Exposure Tracking
const staffExposure = [
  { id: "N001", name: "Dr. Anderson", department: "ICU", exposureLevel: "high", lastScreening: "1 day ago", patients: 15 },
  { id: "N002", name: "Nurse Patricia", department: "Surgery", exposureLevel: "medium", lastScreening: "2 days ago", patients: 22 },
  { id: "N003", name: "Dr. Roberts", department: "Emergency", exposureLevel: "low", lastScreening: "1 day ago", patients: 18 },
  { id: "N004", name: "Nurse James", department: "Ward A", exposureLevel: "high", lastScreening: "3 days ago", patients: 28 },
];

// Environmental Monitoring Data
const environmentalData = [
  { location: "ICU", airQuality: 85, temperature: 22.5, humidity: 45, pressure: 1013, lastCleaned: "2h ago" },
  { location: "Surgery", airQuality: 92, temperature: 23.1, humidity: 42, pressure: 1015, lastCleaned: "1h ago" },
  { location: "Ward A", airQuality: 88, temperature: 23.8, humidity: 48, pressure: 1012, lastCleaned: "4h ago" },
  { location: "Emergency", airQuality: 79, temperature: 24.2, humidity: 52, pressure: 1011, lastCleaned: "6h ago" },
];

// Lab Integration Data
const labResults = [
  { sampleId: "L001", patientId: "P001", type: "Blood Culture", status: "positive", pathogen: "MRSA", resistance: "High", timeToResult: "24h" },
  { sampleId: "L002", patientId: "P003", type: "Urine Culture", status: "positive", pathogen: "VRE", resistance: "Medium", timeToResult: "18h" },
  { sampleId: "L003", patientId: "P002", type: "Wound Swab", status: "pending", pathogen: "-", resistance: "-", timeToResult: "12h remaining" },
  { sampleId: "L004", patientId: "P004", type: "Blood Culture", status: "negative", pathogen: "-", resistance: "-", timeToResult: "16h" },
];

// Outbreak Prediction Metrics
const outbreakRisk = [
  { department: "ICU", riskScore: 85, trend: "increasing", predictedCases: 3, timeframe: "next 48h" },
  { department: "Surgery", riskScore: 72, trend: "stable", predictedCases: 1, timeframe: "next 72h" },
  { department: "Ward A", riskScore: 45, trend: "decreasing", predictedCases: 0, timeframe: "next 48h" },
  { department: "Emergency", riskScore: 68, trend: "increasing", predictedCases: 2, timeframe: "next 24h" },
];

// Containment Protocols Status
const containmentProtocols = [
  { protocol: "Contact Isolation", active: 12, effectiveness: 94, lastUpdated: "2h ago" },
  { protocol: "Droplet Precautions", active: 8, effectiveness: 89, lastUpdated: "1h ago" },
  { protocol: "Airborne Isolation", active: 3, effectiveness: 98, lastUpdated: "30m ago" },
  { protocol: "Enhanced Cleaning", active: 15, effectiveness: 87, lastUpdated: "4h ago" },
];

// Compliance Monitoring
const complianceData = [
  { metric: "Hand Hygiene", compliance: 87, target: 95, trend: "up" },
  { metric: "PPE Usage", compliance: 92, target: 98, trend: "stable" },
  { metric: "Isolation Protocols", compliance: 89, target: 100, trend: "up" },
  { metric: "Environmental Cleaning", compliance: 94, target: 95, trend: "stable" },
];

const weeklyTrend = [
  { day: "Mon", new: 3, active: 15, recovered: 2, deaths: 0 },
  { day: "Tue", new: 5, active: 18, recovered: 1, deaths: 0 },
  { day: "Wed", new: 2, active: 20, recovered: 3, deaths: 1 },
  { day: "Thu", new: 7, active: 24, recovered: 2, deaths: 0 },
  { day: "Fri", new: 4, active: 26, recovered: 4, deaths: 0 },
  { day: "Sat", new: 3, active: 25, recovered: 1, deaths: 1 },
  { day: "Sun", new: 1, active: 23, recovered: 3, deaths: 0 },
];

const pathogenTypes = [
  { name: "MRSA", count: 12, percentage: 52, color: "#ef4444", resistance: "Vancomycin, Oxacillin" },
  { name: "VRE", count: 5, percentage: 22, color: "#f97316", resistance: "Vancomycin, Teicoplanin" },
  { name: "ESBL", count: 4, percentage: 17, color: "#eab308", resistance: "Beta-lactam antibiotics" },
  { name: "CRE", count: 2, percentage: 9, color: "#dc2626", resistance: "Carbapenem antibiotics" },
];

const wards = [
  { id: "icu", name: "ICU", x: 50, y: 30, w: 200, h: 120, risk: "critical", beds: 25, occupied: 23, mdr: 8, temp: 22.5, staff: 12, visitors: 8 },
  { id: "surgery", name: "Surgery", x: 280, y: 30, w: 220, h: 120, risk: "critical", beds: 50, occupied: 45, mdr: 6, temp: 23.1, staff: 18, visitors: 15 },
  { id: "emergency", name: "Emergency", x: 530, y: 30, w: 200, h: 120, risk: "warning", beds: 75, occupied: 67, mdr: 4, temp: 24.2, staff: 22, visitors: 45 },
  { id: "wardA", name: "Ward A", x: 50, y: 180, w: 180, h: 100, risk: "warning", beds: 40, occupied: 34, mdr: 3, temp: 23.8, staff: 15, visitors: 20 },
  { id: "wardB", name: "Ward B", x: 250, y: 180, w: 180, h: 100, risk: "safe", beds: 60, occupied: 56, mdr: 2, temp: 23.5, staff: 18, visitors: 25 },
  { id: "pediatrics", name: "Pediatrics", x: 450, y: 180, w: 180, h: 100, risk: "safe", beds: 30, occupied: 28, mdr: 0, temp: 24.0, staff: 12, visitors: 35 },
  { id: "lab", name: "Laboratory", x: 650, y: 180, w: 100, h: 100, risk: "monitored", beds: 0, occupied: 0, mdr: 0, temp: 22.0, staff: 8, visitors: 2 },
];

const recentAlerts = [
  { id: 1, type: "critical", message: "New MRSA case detected in ICU - Bed 12", time: "2m", department: "ICU", action: "Immediate isolation required", priority: "urgent" },
  { id: 2, type: "warning", message: "Hand hygiene compliance below 85% in Surgery", time: "15m", department: "Surgery", action: "Staff training required", priority: "high" },
  { id: 3, type: "critical", message: "VRE transmission suspected between patients", time: "23m", department: "Ward A", action: "Contact investigation initiated", priority: "urgent" },
  { id: 4, type: "info", message: "Environmental cleaning overdue in Emergency", time: "45m", department: "Emergency", action: "Schedule immediate cleaning", priority: "medium" },
  { id: 5, type: "warning", message: "Staff member exceeded exposure limit", time: "1h", department: "ICU", action: "Mandatory screening required", priority: "high" },
  { id: 6, type: "critical", message: "Isolation room capacity at 92%", time: "1h 30m", department: "All", action: "Prepare additional isolation units", priority: "urgent" },
];

const riskFill = (r) => {
  if (r === "critical") return "#dc2626";
  if (r === "warning") return "#f59e0b";
  if (r === "monitored") return "#3b82f6";
  return "#22c55e";
};

export default function GlobalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedWard, setSelectedWard] = useState(null);
  const [alertFilter, setAlertFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredAlerts = alertFilter === "all" ? recentAlerts : recentAlerts.filter(alert => alert.type === alertFilter);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">MDR Infection Control Center</h1>
              <p className="text-slate-600">Real-time monitoring, contact tracing & outbreak prevention</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">System Active</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{currentTime.toLocaleDateString()}</p>
                <p className="text-sm text-slate-600">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-6 mt-4 border-b border-slate-200">
            {["overview", "patients", "staff", "environment", "lab"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 text-sm font-medium capitalize ${
                  activeTab === tab 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${kpi.color} text-white`}>
                  {kpi.icon}
                </div>
                <div className={`text-right ${kpi.textColor}`}>
                  <div className="text-xs font-medium flex items-center">
                    {kpi.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-600">{kpi.title}</p>
                <p className="text-lg font-bold text-slate-800">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Based on Active Tab */}
        {activeTab === "overview" && (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Hospital Floor Plan */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Interactive Hospital Floor Plan
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">Real-time occupancy, MDR cases & staff deployment</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      <span className="text-xs text-slate-600">Critical</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded bg-amber-500"></div>
                      <span className="text-xs text-slate-600">Warning</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span className="text-xs text-slate-600">Safe</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <svg viewBox="0 0 800 320" className="w-full h-[400px]">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                      </pattern>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />

                    {wards.map((ward) => {
                      const isSelected = selectedWard === ward.id;
                      
                      return (
                        <g
                          key={ward.id}
                          onClick={() => setSelectedWard(ward.id === selectedWard ? null : ward.id)}
                          className="cursor-pointer transition-all duration-200"
                        >
                          <rect
                            x={ward.x}
                            y={ward.y}
                            width={ward.w}
                            height={ward.h}
                            rx={12}
                            fill={riskFill(ward.risk)}
                            fillOpacity={isSelected ? 0.9 : 0.7}
                            stroke={isSelected ? "#1e293b" : "#64748b"}
                            strokeWidth={isSelected ? 3 : 1}
                            filter={ward.risk === "critical" ? "url(#glow)" : ""}
                          />

                          <text x={ward.x + 15} y={ward.y + 25} fontSize={16} fontWeight="700" fill="white">
                            {ward.name}
                          </text>
                          <text x={ward.x + 15} y={ward.y + 45} fontSize={12} fill="white" opacity={0.9}>
                            👥 {ward.occupied}/{ward.beds} • 👨‍⚕️ {ward.staff}
                          </text>
                          
                          {ward.mdr > 0 && (
                            <>
                              <text x={ward.x + 15} y={ward.y + 62} fontSize={12} fill="white" fontWeight="600">
                                🦠 MDR: {ward.mdr}
                              </text>
                              <text x={ward.x + 15} y={ward.y + 78} fontSize={11} fill="white" opacity={0.8}>
                                🌡️ {ward.temp}°C • 👥 {ward.visitors} visitors
                              </text>
                            </>
                          )}

                          <circle
                            cx={ward.x + ward.w - 20}
                            cy={ward.y + 20}
                            r={8}
                            fill={ward.risk === "critical" ? "#dc2626" : ward.risk === "warning" ? "#f59e0b" : "#22c55e"}
                            className="animate-pulse"
                          />

                          {isSelected && (
                            <rect
                              x={ward.x - 5}
                              y={ward.y - 5}
                              width={ward.w + 10}
                              height={ward.h + 10}
                              rx={15}
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              strokeDasharray="10,5"
                              className="animate-pulse"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {selectedWard && (
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    {(() => {
                      const ward = wards.find(w => w.id === selectedWard);
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold text-slate-800">{ward.name} - Live Status</h4>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              ward.risk === 'critical' ? 'bg-red-100 text-red-800' :
                              ward.risk === 'warning' ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ward.risk.toUpperCase()}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-slate-600">Occupancy</p>
                              <p className="font-bold">{ward.occupied}/{ward.beds}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-slate-600">MDR Cases</p>
                              <p className="font-bold text-red-600">{ward.mdr}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-slate-600">Staff On Duty</p>
                              <p className="font-bold">{ward.staff}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-slate-600">Visitors</p>
                              <p className="font-bold">{ward.visitors}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <p className="text-slate-600">Temperature</p>
                              <p className="font-bold">{ward.temp}°C</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Alerts Panel */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-red-600" />
                    Critical Alerts
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select 
                      value={alertFilter} 
                      onChange={(e) => setAlertFilter(e.target.value)}
                      className="text-sm border border-slate-300 rounded-lg px-3 py-1"
                    >
                      <option value="all">All</option>
                      <option value="critical">Critical</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border-l-4 transition-all duration-200 ${
                        alert.type === 'critical' 
                          ? 'bg-red-50 border-red-500 hover:bg-red-100' 
                          : alert.type === 'warning' 
                          ? 'bg-amber-50 border-amber-500 hover:bg-amber-100' 
                          : 'bg-blue-50 border-blue-500 hover:bg-blue-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              {alert.type === 'critical' ? 
                                <XCircle className="w-4 h-4 text-red-600 mr-2" /> :
                                alert.type === 'warning' ?
                                <AlertCircle className="w-4 h-4 text-amber-600 mr-2" /> :
                                <Info className="w-4 h-4 text-blue-600 mr-2" />
                              }
                              <span className="text-xs font-medium text-slate-600">{alert.department}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              alert.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              alert.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.priority}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                          <p className="text-xs text-slate-600 mt-1">Action: {alert.action}</p>
                        </div>
                        <div className="flex items-center text-xs text-slate-500 ml-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    View All Alerts
                  </button>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  MDR Outbreak Trends (7 Days)
                </h3>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyTrend}>
                      <defs>
                        <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area type="monotone" dataKey="active" stackId="1" stroke="#f59e0b" fillOpacity={1} fill="url(#colorActive)" />
                      <Area type="monotone" dataKey="new" stackId="1" stroke="#ef4444" fillOpacity={1} fill="url(#colorNew)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Outbreak Risk Prediction
                </h3>
                <div className="space-y-4">
                  {outbreakRisk.map((risk) => (
                    <div key={risk.department} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-slate-800">{risk.department}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            risk.riskScore >= 80 ? 'bg-red-100 text-red-800' :
                            risk.riskScore >= 60 ? 'bg-amber-100 text-amber-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.riskScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              risk.riskScore >= 80 ? 'bg-red-500' :
                              risk.riskScore >= 60 ? 'bg-amber-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${risk.riskScore}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 mt-1">
                          <span>Predicted: {risk.predictedCases} cases</span>
                          <span>{risk.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row - Pathogen Distribution & Compliance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Compliance Monitoring</h3>
                <div className="space-y-4">
                  {complianceData.map((compliance) => (
                    <div key={compliance.metric} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-800">{compliance.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">{compliance.compliance}%</span>
                          <div className={`w-3 h-3 rounded-full ${
                            compliance.compliance >= compliance.target ? 'bg-green-500' :
                            compliance.compliance >= compliance.target - 10 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            compliance.compliance >= compliance.target ? 'bg-green-500' :
                            compliance.compliance >= compliance.target - 10 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${compliance.compliance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600 mt-1">
                        <span>Target: {compliance.target}%</span>
                        <span className={`${
                          compliance.trend === 'up' ? 'text-green-600' :
                          compliance.trend === 'down' ? 'text-red-600' :
                          'text-slate-600'
                        }`}>
                          {compliance.trend === 'up' ? '↑' : compliance.trend === 'down' ? '↓' : '→'} {compliance.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Active Pathogen Distribution</h3>
                <div className="space-y-4">
                  {pathogenTypes.map((pathogen) => (
                    <div key={pathogen.name} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: pathogen.color }}></div>
                          <span className="ml-3 font-medium text-slate-800">{pathogen.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-800">{pathogen.count}</span>
                          <span className="text-slate-600 ml-2">({pathogen.percentage}%)</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">Resistant to: {pathogen.resistance}</p>
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </>
        )}

        {/* Patient Movement Tab */}
        {activeTab === "patients" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                Patient Movement Tracking
              </h3>
              <div className="space-y-4">
                {patientMovements.map((patient) => (
                  <div key={patient.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-slate-800">{patient.name}</p>
                        <p className="text-sm text-slate-600">ID: {patient.id} • Room: {patient.room}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          patient.mdrStatus === 'positive' ? 'bg-red-100 text-red-800' :
                          patient.mdrStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {patient.mdrStatus}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Last moved: {patient.lastMoved}</span>
                      <span>Contacts: {patient.contacts}</span>
                      <span className={`px-2 py-1 rounded ${
                        patient.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                        patient.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {patient.riskLevel} risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Lab Results Integration
              </h3>
              <div className="space-y-4">
                {labResults.map((result) => (
                  <div key={result.sampleId} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-slate-800">Sample: {result.sampleId}</p>
                        <p className="text-sm text-slate-600">Patient: {result.patientId} • Type: {result.type}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        result.status === 'positive' ? 'bg-red-100 text-red-800' :
                        result.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {result.status}
                      </div>
                    </div>
                    {result.pathogen !== '-' && (
                      <div className="text-sm text-slate-600">
                        <p><strong>Pathogen:</strong> {result.pathogen}</p>
                        <p><strong>Resistance:</strong> {result.resistance}</p>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">Processing time: {result.timeToResult}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Staff Monitoring Tab */}
        {activeTab === "staff" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
                Staff Exposure Monitoring
              </h3>
              <div className="space-y-4">
                {staffExposure.map((staff) => (
                  <div key={staff.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-slate-800">{staff.name}</p>
                        <p className="text-sm text-slate-600">{staff.department} • Patients: {staff.patients}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        staff.exposureLevel === 'high' ? 'bg-red-100 text-red-800' :
                        staff.exposureLevel === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {staff.exposureLevel} exposure
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Last screening: {staff.lastScreening}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                Active Containment Protocols
              </h3>
              <div className="space-y-4">
                {containmentProtocols.map((protocol) => (
                  <div key={protocol.protocol} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-800">{protocol.protocol}</span>
                      <span className="text-sm text-slate-600">{protocol.active} active</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Effectiveness: {protocol.effectiveness}%</span>
                      <span>Updated: {protocol.lastUpdated}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${protocol.effectiveness}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Environmental Monitoring Tab */}
        {activeTab === "environment" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {environmentalData.map((env) => (
                <div key={env.location} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4">{env.location}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wind className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Air Quality</span>
                      </div>
                      <span className={`font-bold ${env.airQuality >= 90 ? 'text-green-600' : env.airQuality >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                        {env.airQuality}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Thermometer className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-bold">{env.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Humidity</span>
                      <span className="font-bold">{env.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pressure</span>
                      <span className="font-bold">{env.pressure} hPa</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-600">Last cleaned: {env.lastCleaned}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lab Integration Tab */}
        {activeTab === "lab" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Laboratory Integration Dashboard
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {labResults.map((result) => (
                  <div key={result.sampleId} className="p-6 border border-slate-200 rounded-xl hover:bg-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-800">Sample {result.sampleId}</h4>
                        <p className="text-sm text-slate-600">Patient: {result.patientId} • Type: {result.type}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        result.status === 'positive' ? 'bg-red-100 text-red-800' :
                        result.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {result.status.toUpperCase()}
                      </div>
                    </div>
                    {result.pathogen !== '-' && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">Pathogen Identified:</p>
                          <p className="font-bold text-red-600">{result.pathogen}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">Resistance Level:</p>
                          <p className="font-bold">{result.resistance}</p>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600">Processing Time: {result.timeToResult}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-800 mb-3">Lab Queue Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Samples in queue:</span>
                      <span className="font-bold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average processing:</span>
                      <span className="font-bold">18.5h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority samples:</span>
                      <span className="font-bold text-red-600">7</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-800 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Request Priority Processing
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Export Lab Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-800">Infection Control Actions</h4>
              <p className="text-sm text-slate-600">Emergency protocols and reporting tools</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Initiate Isolation
              </button>
              <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Send Alert
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Start Screening
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}