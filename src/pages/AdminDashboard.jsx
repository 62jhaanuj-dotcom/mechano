import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Package, 
  Wrench, 
  MessageSquare, 
  LayoutDashboard,
  TrendingUp
} from "lucide-react";

const AdminDashboard = () => {
  // Menu items configuration
  const adminLinks = [
    {
      title: "Users",
      desc: "Manage and view all registered users",
      icon: <Users className="w-6 h-6" />,
      path: "/admin/users",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Appointments",
      desc: "Check and schedule service slots",
      icon: <Calendar className="w-6 h-6" />,
      path: "/admin/appointments",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Products",
      desc: "Inventory and store management",
      icon: <Package className="w-6 h-6" />,
      path: "/admin/products",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Mechanics",
      desc: "Staff attendance and assignments",
      icon: <Wrench className="w-6 h-6" />,
      path: "/admin/mechanics",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Contact Messages",
      desc: "Customer inquiries and feedback",
      icon: <MessageSquare className="w-6 h-6" />,
      path: "/admin/contact",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Overview
          </h1>
        </div>
        <p className="text-gray-700 text-lg">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Quick Stats (Optional but makes it look pro) */}


      {/* Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLinks.map((link, index) => (
          <Link to={link.path} key={index} className="group">
            <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 transform group-hover:-translate-y-1">
              <div className={`w-12 h-12 ${link.bgColor} ${link.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {link.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {link.desc}
              </p>
              
              <div className="mt-6 flex items-center text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage now
                <TrendingUp className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;