"use client"

import { useState } from "react";
import { getAuthToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type CreateCarType = {
  make: string,
  model: string,
  year: number,
  price: number,
  mileage: number,
  description: string,
  color: string,
  fuel_type: string,
  transmission: string,
  image: string
}
export default function UpdateFunction() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const updateCar = async (carId: string, updatedData: Partial<CreateCarType>) => {
        const token = getAuthToken();
        if (!token) throw new Error("Missing access token");

        const res = await fetch(`https://car-nextjs-api.cheatdev.online/cars/${carId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (!res.ok) {
            const data = await res.json();
            if (res.status === 401) {
                throw new Error("Access token expired. Please refresh token.");
            }
            throw new Error(data.message || "Failed to update car");
        }

        return await res.json();
    };

    const handleUpdate = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const carId = prompt("Enter Car ID to update:");
            if (!carId) throw new Error("Car ID is required");

            const updatedData = {
                price: 29999,
                color: "Red",
                mileage: 5000
            };

            const result = await updateCar(carId, updatedData);
            setMessage("Car updated successfully!");
            console.log("Update result:", result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error updating car");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Update Car</h1>
            <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Update Car"}
            </Button>

            {message && <div className="mt-4 text-green-600">{message}</div>}
            {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>
    );
}
