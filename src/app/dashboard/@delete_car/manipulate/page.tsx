"use client"

import { useState } from "react";
import { getAuthToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function DeleteFunction() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const deleteCar = async (carId: string) => {
        const token = getAuthToken();
        if (!token) throw new Error("Missing access token");

        const res = await fetch(`https://car-nextjs-api.cheatdev.online/cars/${carId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const data = await res.json();
            if (res.status === 401) {
                throw new Error("Access token expired. Please refresh token.");
            }
            throw new Error(data.message || "Failed to delete car");
        }

        return await res.json();
    };

    const handleDelete = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const carId = prompt("Enter Car ID to delete:");
            if (!carId) throw new Error("Car ID is required");

            const result = await deleteCar(carId);
            setMessage("Car deleted successfully!");
            console.log("Delete result:", result);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error deleting car");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Delete Car</h1>
            <Button onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting..." : "Delete Car"}
            </Button>

            {message && <div className="mt-4 text-green-600">{message}</div>}
            {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>
    );
}
