import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { url } from "../../lib/utils"

interface GalleryImage {
    id: string;
    imageUrl: string;
    phoneNumber: string | null;
    email: string;
    sent: string;
    uploadedAt: string;
    generatedImages: string[];
}

const AIBoothPage = () => {
    const { eventId, galleryId } = useParams();
    const [galleryItem, setGalleryItem] = useState<GalleryImage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGalleryItem = async () => {
            try {
                const response = await fetch(
                    `${url}/api/event/${eventId}/gallery/${galleryId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch gallery item");
                }
                const data = await response.json();
                setGalleryItem(data);
            } catch (error) {
                console.error("Error fetching gallery item:", error);
                setError(
                    "Failed to load gallery item. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryItem();
    }, [eventId, galleryId]);

    if (loading) {
        return <div className="container mt-64 mx-auto text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-64 mx-auto text-center">Error: {error}</div>;
    }

    if (!galleryItem) {
        return <div className="container mt-64 mx-auto text-center">Gallery item not found</div>;
    }

    return (
        <div className="container mx-auto my-32">
            {galleryItem.generatedImages && galleryItem.generatedImages.length > 0 ? (
                <>
                    <h1 className="heading-1 leading-tight">Your Photos are ready!</h1>
                    <p className="mb-4 text-xl">
                        Thank you for using Lumetry Media Photo Booth! We hope you had a great experience. Don’t forget to tag us in your posts with #LumetryMedia on social media!
                    </p>
    
                    <hr className="my-6 border-neutral-600" />
    
                    <p className="mb-4">How to Save Your Images:</p>
                    <p>📱 Mobile – Tap and hold the image to save.</p>
                    <p>💻 Desktop – Click and drag to your desired folder, or right-click and select “Save As.”</p>
    
                    <div className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {galleryItem.generatedImages.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Generated ${index}`}
                                    className="w-full h-auto"
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="heading-1 leading-tight">Your photos are being generated...</h1>
                    <p className="mb-4 text-xl">Please check again in a few minutes.</p>

                    <hr className="my-6 border-neutral-600" />
                </>
            )}
        </div>
    );    
};

export default AIBoothPage;
