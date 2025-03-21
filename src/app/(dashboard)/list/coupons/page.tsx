"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Trash2, Edit, Plus, Search, X } from "lucide-react";

// TypeScript interfaces
interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minPurchase: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "scheduled";
  usageLimit: number;
  usageCount: number;
}

type CouponFormData = Omit<Coupon, "id" | "usageCount" | "status">;

// Sample data
const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "SPRING25",
    discount: 25,
    type: "percentage",
    minPurchase: 50,
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    status: "active",
    usageLimit: 1000,
    usageCount: 342,
  },
  {
    id: "2",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minPurchase: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active",
    usageLimit: 0,
    usageCount: 1205,
  },
  {
    id: "3",
    code: "FREESHIP",
    discount: 15,
    type: "fixed",
    minPurchase: 75,
    startDate: "2025-02-15",
    endDate: "2025-03-15",
    status: "expired",
    usageLimit: 500,
    usageCount: 500,
  },
];

// Component
const CouponsPage: React.FC = () => {
  // State with TypeScript types
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form state
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    discount: 0,
    type: "percentage",
    minPurchase: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
  });

  // Handle form input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // Add new coupon
  const handleAddCoupon = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Determine status based on dates
    const today: string = new Date().toISOString().split("T")[0];
    let status: "active" | "expired" | "scheduled" = "active";

    if (formData.startDate > today) {
      status = "scheduled";
    } else if (formData.endDate < today) {
      status = "expired";
    }

    const newCoupon: Coupon = {
      ...formData,
      id: Date.now().toString(),
      status,
      usageCount: 0,
    };

    if (editingCoupon) {
      // Update existing coupon
      setCoupons(
        coupons.map((c: Coupon) =>
          c.id === editingCoupon.id
            ? { ...newCoupon, id: c.id, usageCount: c.usageCount }
            : c
        )
      );
    } else {
      // Add new coupon
      setCoupons([...coupons, newCoupon]);
    }

    resetForm();
  };

  // Delete coupon
  const handleDeleteCoupon = (id: string): void => {
    setCoupons(coupons.filter((coupon: Coupon) => coupon.id !== id));
  };

  // Edit coupon
  const handleEditCoupon = (coupon: Coupon): void => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      minPurchase: coupon.minPurchase,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageLimit: coupon.usageLimit,
    });
    setIsFormOpen(true);
  };

  // Reset form
  const resetForm = (): void => {
    setFormData({
      code: "",
      discount: 0,
      type: "percentage",
      minPurchase: 0,
      startDate: "",
      endDate: "",
      usageLimit: 0,
    });
    setEditingCoupon(null);
    setIsFormOpen(false);
  };

  // Filter coupons by search term
  const filteredCoupons: Coupon[] = coupons.filter((coupon: Coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge color mapper
  const getStatusBadgeClass = (status: Coupon["status"]): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Coupon Management</h1>
        <p className="text-gray-500">
          Create and manage promotional coupons for your store
        </p>
      </div>

      {/* Search and actions */}
      <div className="flex justify-between mb-6">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search coupons..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} className="mr-2" />
          Add New Coupon
        </button>
      </div>

      {/* Coupon form */}
      {isFormOpen && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAddCoupon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  required
                  type="text"
                  name="code"
                  placeholder="e.g. SUMMER25"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.code}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
                </label>
                <select
                  name="type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Value
                </label>
                <input
                  required
                  type="number"
                  name="discount"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Purchase
                </label>
                <input
                  type="number"
                  name="minPurchase"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.minPurchase}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  required
                  type="date"
                  name="startDate"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  required
                  type="date"
                  name="endDate"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usage Limit (0 for unlimited)
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingCoupon ? "Update Coupon" : "Create Coupon"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min. Purchase
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon: Coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {coupon.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {coupon.type === "percentage" ? (
                      <span>{coupon.discount}%</span>
                    ) : (
                      <span>${coupon.discount.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {coupon.minPurchase > 0
                      ? `$${coupon.minPurchase.toFixed(2)}`
                      : "None"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {coupon.startDate} to {coupon.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        coupon.status
                      )}`}
                    >
                      {coupon.status.charAt(0).toUpperCase() +
                        coupon.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coupon.usageCount} /{" "}
                    {coupon.usageLimit === 0 ? "∞" : coupon.usageLimit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      aria-label="Edit coupon"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete coupon"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsPage;
