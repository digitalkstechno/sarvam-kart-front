"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Edit2, X } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

const EditProductPriceModal = ({ isOpen, onClose, product, onSave }: { isOpen: boolean, onClose: () => void, product: any, onSave: () => void }) => {
  const [resellerPrice, setResellerPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setResellerPrice(!product.isResellerPriceDefault && product.resellerPrice > 0 ? product.resellerPrice.toString() : "");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload: any = { resellerPrice: Number(resellerPrice) || 0 };
      const res = await api.put(`/product/${product._id || product.shopifyId}/reseller-price`, payload);

      const data = res.data;
      if (data.status === "Success") {
        toast.success("Reseller price updated successfully");
        onSave();
        onClose();
      } else {
        toast.error(data.message || "Failed to update reseller price");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg">Edit Reseller Price</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex gap-4 items-center mb-4">
            <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-slate-100 shrink-0">
              <Image 
                src={product.images?.[0]?.src || "/images/placeholder.jpg"} 
                alt={product.title} 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <p className="font-medium text-sm text-slate-900 line-clamp-2">{product.title}</p>
              <p className="text-xs text-slate-500 mt-1">Base Price: ₹{product.basePrice || product.price || 0}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Reseller Price (₹)
            </label>
            <p className="text-xs text-slate-500 mb-2">Set to 0 to fallback to the base price.</p>
            <input
              type="number"
              value={resellerPrice}
              onChange={(e) => setResellerPrice(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] outline-none transition-all text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#00A759] text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product?search=${search}&page=${page}&limit=${limit}`);
      const data = res.data;
      if (data.status === "Success") {
        setProducts(data.data);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
        }
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [page, limit, search]);

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <EditProductPriceModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        product={editingProduct} 
        onSave={fetchProducts} 
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759] outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Base Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Reseller Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-lg border border-slate-100 overflow-hidden bg-slate-50 shrink-0">
                          <Image
                            src={product.images?.[0]?.src || "/images/placeholder.jpg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-slate-900 line-clamp-1 max-w-[200px]" title={product.title}>
                            {product.title}
                          </span>
                          <span className="text-xs text-slate-500">
                            SKU: {product.sku || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {product.categories?.[0]?.title || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">
                        ₹{product.basePrice || product.price || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ${!product.isResellerPriceDefault ? 'text-[#00A759]' : 'text-slate-900'}`}>
                          ₹{product.resellerPrice}
                        </span>
                        {!product.isResellerPriceDefault ? (
                          <span className="text-xs text-green-600 bg-green-50 px-2 rounded w-max mt-1">Custom Set</span>
                        ) : (
                          <span className="text-xs text-slate-400 w-max mt-1">Default Base Price</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#00A759] bg-[#00A759]/10 rounded-lg hover:bg-[#00A759]/20 transition-colors"
                          title="Edit Reseller Price"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Price
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Rows per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="text-sm border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#00A759]/20 focus:border-[#00A759]"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
