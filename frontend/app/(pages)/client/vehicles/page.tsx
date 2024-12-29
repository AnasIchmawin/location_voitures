'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Remplace next/router par next/navigation
import Card from "../../../../components/cards/card";
import axios from "axios";

export default function Page() {
    interface LocationState {
        startDate?: string;
        endDate?: string;
    }

    const router = useRouter();
    const [queryParams, setQueryParams] = useState<LocationState>({
        startDate: undefined,
        endDate: undefined,
    });

    const [vehicles, setVehicles] = useState<Array<{
        id: string;
        brand: string;
        model: string;
        year: number;
        price: number;
        type: string;
        pathImg: string;
    }>>([]);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const startDate = urlParams.get("startDate") || undefined;
        const endDate = urlParams.get("endDate") || undefined;

        setQueryParams({ startDate, endDate });
    }, []);

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!queryParams.startDate || !queryParams.endDate) return;

            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    return;
                }
                const response = await axios.get(`${apiUrl}/vehicles/available`, {
                    params: {
                      startDate: queryParams.startDate,
                      endDate: queryParams.endDate,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const vehiclesData = response.data.map((vehicle: any) => ({
                    ...vehicle,
                    id: vehicle.liscencePlate,
                }));
                setVehicles(vehiclesData);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, [queryParams]);

    return (
        <section className="pt-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                    <div className="mx-auto max-w-3xl pb-12 text-center md:pb-10">
                        <h2 className="text-3xl font-semibold">Map your product journey</h2>
                        <p className="text-lg text-indigo-200/65">
                            Simple and elegant interface to start collaborating with your team in minutes.
                        </p>
                    </div>
                    <div className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
                        {vehicles.map((vehicle) => (
                            <Card
                                key={vehicle.id}
                                imageSrc={`${apiUrl}/uploads/${vehicle.pathImg}`}
                                marque={vehicle.brand}
                                modele={vehicle.model}
                                annee={vehicle.year}
                                tarifLocation={vehicle.price}
                                type={vehicle.type}
                                to="/vehicles/1"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
