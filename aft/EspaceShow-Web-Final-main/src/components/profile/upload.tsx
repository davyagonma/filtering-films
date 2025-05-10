import { Check } from 'lucide-react';
import React, { useState } from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useToast } from '@/hooks/use-toast';



const ProfilePictureUpdater: React.FC<{ image: string }> = (image) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(image.image);
    const {toast} = useToast()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (e:Event) => {
        e.preventDefault()
        if (!selectedImage) {
            localStorage.setItem('url', previewUrl!)
            return
        };
        const formData = new FormData();
        formData.set('file', selectedImage);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                throw new Error(`Error uploading file: ${res.status}`)
            }
            const data = await res.json()
            localStorage.setItem('url', data.file)
            toast({
                title: "Profile",
                description: "Vous avez validé le nouveau profile",
                variant: "default"
            })
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="flex flex-col items-center">
            <HoverCard>
                <HoverCardTrigger>
                    <label className="relative cursor-pointer">
                        {previewUrl === image.image && <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />}
                        <div className="w-32 h-32 rounded-full border-4 border-[#C30F66] flex items-center justify-center overflow-hidden">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Aperçu" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-gray-500">Aucune image</span>
                            )}
                        </div>
                        {previewUrl !== image.image && <span onClick={(e) => handleUpload(e as any)} className="absolute bottom-0 right-0 mb-2 mr-2 bg-[#C30F66] rounded-full p-1 shadow-lg">
                            <Check className="h-6 w-6 text-white" />
                        </span>}
                    </label>
                </HoverCardTrigger>
                {previewUrl === image.image && <HoverCardContent className='text-[10px] text-center'>Cliquez sur l'image pour changer le profile</HoverCardContent>}
            </HoverCard>

            
        </div>
    );
};

export default ProfilePictureUpdater;
