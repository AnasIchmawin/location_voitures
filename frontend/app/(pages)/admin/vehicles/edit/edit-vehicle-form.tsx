"use client";

import { useState, useEffect } from "react";

export default function FormEdit({
  handleCancel,
  vehicle,
  onEditVehicle,
}: {
  handleCancel: () => void;
  vehicle: {
    id: number;
    brand: string;
    model: string;
    year: number;
    rentalPrice: number;
    type: string;
    status: string;
  } | null;
  onEditVehicle: (vehicleData: any) => void;
}) {
  const [vehicleData, setVehicleData] = useState({
    id: 0,
    model: "",
    brand: "",
    year: 0,
    price: 0,
    status: "",
    type: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (vehicle) {
      setVehicleData({
        id: vehicle.id,
        model: vehicle.model,
        brand: vehicle.brand,
        year: vehicle.year,
        price: vehicle.rentalPrice,
        status: vehicle.status.toLowerCase(),
        type: vehicle.type,
        image: null,
      });
    }
  }, [vehicle]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVehicleData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEditVehicle(vehicleData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-slate-900 text-slate-100 rounded-lg shadow-xl animate-fade-in-up">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-100">
            Edit Vehicle
          </h2>
          <button
            onClick={handleCancel}
            className="text-slate-500 hover:text-slate-100 text-[2em] "
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.brand}
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Model
              </label>
              <input
                id="model"
                name="model"
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.model}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min={1900}
                max={3000}
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.year}
              />
            </div>
            <div>
              <label
                htmlFor="rentalPrice"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Rental Rate
              </label>
              <input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.price}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.status}
              >
                <option value="">Select a status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">In Maintenance</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-slate-200 mb-1"
              >
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleInputChange}
                value={vehicleData.type}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
