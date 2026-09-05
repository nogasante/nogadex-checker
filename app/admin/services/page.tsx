"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Power,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Edit2,
  RefreshCw,
  Save,
  X,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { ServiceConfig } from "@/lib/services";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<ServiceConfig | null>(null);
  const [editForm, setEditForm] = useState<{
    enabled: boolean;
    message: string;
    price: string;
    name: string;
  }>({
    enabled: true,
    message: "",
    price: "",
    name: "",
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/services");
      if (!res.ok) throw new Error("Failed to fetch service settings");
      const data = await res.json();
      setServices(data.services || []);
    } catch (err) {
      console.error(err);
      showToast("Could not load service configurations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggle = async (service: ServiceConfig) => {
    const newEnabledState = !service.enabled;
    setUpdatingKey(service.key);

    // Optimistic local update
    setServices((prev) =>
      prev.map((s) => (s.key === service.key ? { ...s, enabled: newEnabledState } : s))
    );

    try {
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: service.key,
          enabled: newEnabledState,
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const data = await res.json();

      setServices((prev) =>
        prev.map((s) => (s.key === service.key ? data.service : s))
      );
      showToast(
        `"${service.name}" is now ${newEnabledState ? "ENABLED" : "DISABLED"}`
      );
    } catch (err) {
      console.error(err);
      // Revert on error
      setServices((prev) =>
        prev.map((s) => (s.key === service.key ? { ...s, enabled: service.enabled } : s))
      );
      showToast(`Failed to toggle ${service.name}`, "error");
    } finally {
      setUpdatingKey(null);
    }
  };

  const openEditModal = (service: ServiceConfig) => {
    setEditingItem(service);
    setEditForm({
      enabled: service.enabled,
      message: service.message || "",
      price: service.price !== null && service.price !== undefined ? String(service.price) : "",
      name: service.name,
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdatingKey(editingItem.key);
    try {
      const priceNumber = editForm.price.trim() !== "" ? parseFloat(editForm.price) : null;

      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: editingItem.key,
          name: editForm.name,
          enabled: editForm.enabled,
          message: editForm.message.trim() || null,
          price: isNaN(priceNumber as number) ? null : priceNumber,
        }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      const data = await res.json();

      setServices((prev) =>
        prev.map((s) => (s.key === editingItem.key ? data.service : s))
      );

      setEditingItem(null);
      showToast(`Updated settings for "${editForm.name}"`);
    } catch (err) {
      console.error(err);
      showToast("Failed to save settings", "error");
    } finally {
      setUpdatingKey(null);
    }
  };

  const coreServices = services.filter((s) => s.category === "SERVICE");
  const examTypes = services.filter((s) => s.category === "EXAM_TYPE");

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2.5 text-xs font-semibold ${
              toastMessage.type === "success"
                ? "bg-slate-900 border-emerald-500/30 text-emerald-400"
                : "bg-slate-900 border-red-500/30 text-red-400"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Service &amp; Exam Availability
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase">
              Live Controls
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Instantly turn specific services or examination types on/off. When disabled, students see an official status alert and payment initialization is safely blocked.
          </p>
        </div>

        <button
          onClick={fetchServices}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-red-400" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
          <p className="text-xs">Loading service configurations...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* SECTION 1: PRIMARY PORTAL SERVICES */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                Primary Portal Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coreServices.map((service) => {
                const isUpdating = updatingKey === service.key;
                return (
                  <div
                    key={service.key}
                    className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                      service.enabled
                        ? "bg-slate-900/80 border-white/[0.08] shadow-sm"
                        : "bg-red-950/20 border-red-900/30 opacity-90"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Bar: Title & Toggle */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{service.name}</span>
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {service.enabled ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                ACTIVE
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                DISABLED
                              </span>
                            )}

                            {service.price !== null && service.price !== undefined && (
                              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                                GH₵{service.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Toggle Button */}
                        <button
                          type="button"
                          onClick={() => handleToggle(service)}
                          disabled={isUpdating}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                            service.enabled ? "bg-emerald-600" : "bg-slate-700"
                          } ${isUpdating ? "opacity-50" : ""}`}
                          title={`Click to ${service.enabled ? "disable" : "enable"}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              service.enabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Notice Message if any */}
                      {service.message ? (
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[11px] text-slate-300 leading-relaxed">
                          <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                            Custom Notice:
                          </span>
                          {service.message}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">
                          No custom notice configured. Default system messaging active.
                        </p>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-3 border-t border-white/[0.05] flex justify-end">
                      <button
                        onClick={() => openEditModal(service)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-red-400" />
                        <span>Edit Notice / Price</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: EXAMINATION TYPES */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Examination Types (WAEC Grades Checking)
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Turn off individual exams when results are not yet released
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examTypes.map((exam) => {
                const isUpdating = updatingKey === exam.key;
                return (
                  <div
                    key={exam.key}
                    className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                      exam.enabled
                        ? "bg-slate-900/80 border-white/[0.08] shadow-sm"
                        : "bg-red-950/20 border-red-900/30 opacity-90"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Bar */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-white">{exam.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {exam.enabled ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                CHECKING OPEN
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                UNAVAILABLE
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Toggle Button */}
                        <button
                          type="button"
                          onClick={() => handleToggle(exam)}
                          disabled={isUpdating}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                            exam.enabled ? "bg-emerald-600" : "bg-slate-700"
                          } ${isUpdating ? "opacity-50" : ""}`}
                          title={`Click to ${exam.enabled ? "disable" : "enable"}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              exam.enabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Custom Notice */}
                      {exam.message ? (
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[11px] text-slate-300 leading-relaxed">
                          <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                            Disabled Message:
                          </span>
                          {exam.message}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">
                          Standard &quot;Temporarily Unavailable&quot; note shown when disabled.
                        </p>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-3 border-t border-white/[0.05] flex justify-end">
                      <button
                        onClick={() => openEditModal(exam)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-red-400" />
                        <span>Edit Message</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Configure &quot;{editingItem.name}&quot;
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update display title, price, or custom maintenance notice
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Service / Exam Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-red-500 focus:outline-hidden"
                />
              </div>

              {/* Status Toggle in Modal */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Availability Status</div>
                  <div className="text-[11px] text-slate-400">
                    {editForm.enabled ? "Service is currently active" : "Service is currently paused / disabled"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditForm({ ...editForm, enabled: !editForm.enabled })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    editForm.enabled ? "bg-emerald-600" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      editForm.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Price Override (Only for Primary Services) */}
              {editingItem.category === "SERVICE" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Price (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="e.g. 30.00"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-red-500 focus:outline-hidden font-mono"
                  />
                  <p className="text-[10px] text-slate-500">
                    Leave blank if this service has no fee (e.g. Admissions Guidance).
                  </p>
                </div>
              )}

              {/* Custom Notice Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Custom Notice / Reason (Shown to Students)
                </label>
                <textarea
                  rows={3}
                  value={editForm.message}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  placeholder="e.g. 2025 results checking is temporarily unavailable while WAEC conducts scheduled server maintenance."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:border-red-500 focus:outline-hidden leading-relaxed"
                />
                <p className="text-[10px] text-slate-500">
                  This message appears in alert banners on the student portal when the service is disabled.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingKey === editingItem.key}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                >
                  {updatingKey === editingItem.key ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
