"use client"
import { useToast } from '@/hooks/use-toast'
import { colors } from '@/utils/constants'
import { Check, CheckCheckIcon, ShieldCloseIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CoverUpload = () => {
    const [file, setFile] = useState<File>()
    const {toast} = useToast()
    
    const [url, setUrl] = useState('')

    useEffect(() => {
        const img = typeof localStorage !== 'undefined' ? localStorage.getItem('file') : null
        if (img) {
            setUrl(img)
        }
        // console.log(img!)
    }, [url])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.removeItem("file")
        setUrl(URL.createObjectURL(e.target?.files![0]))
        setFile(e.target?.files![0])
    }

    const handleDelete = () => {
        localStorage.removeItem("file")
        setUrl('')
        setFile(undefined)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
        const formData = new FormData()
        formData.set('file', file)
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                throw new Error(`Error uploading file: ${res.status}`)
            }
            const data = await res.json()
            setUrl(data.file)
            toast({
                title: "Couverture",
                description: "Photo de couverture validée",
                variant: "default"
            })
            localStorage.setItem('file', data.file)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <p className="mb-3 mt-2 text-sm">Photo de l'événement (2 Mo max)</p>
            <input className="ml-1 cursor-pointer opacity-0" style={{ zIndex: '10' }} accept='image/*' type="file" id="photo" onChange={(e) => handleChange(e)} />
            <div className="p-[9px] flex justify-between items-center cursor-pointer rounded-lg text-black mt-[-37px] w-full" style={{ border: `2px solid ${colors.primary}`, outline: 'none', zIndex: '1' }}>
                <p className='text-sm'>{file?.name || 'Appuyez pour choisir une image'}</p>
                {/* <button onClick={(e) => handleSubmit(e as any)} id='photo' className='bg-[#C30F66] text-white border-none flex justify-start items-center gap-1 z-40 border rounded-sm p-1' type="button" style={{ opacity: file?.name ? 1 : 0 }}>
                    <Check size={15} />
                    <span className='text-sm '>Valider</span>
                </button> */}
            </div>
            {url !== "" && (
                <div className='my-5'>
                    <Image alt='' className='rounded-sm border border-slate-100' loading='lazy' quality={50} height={100} width={350} src={url} />
                    <div className='flex my-2 justify-start gap-2 items-center'>
                        <div onClick={(e) => handleSubmit(e as any)} className='w-[70px] flex bg-green-600 text-white p-1 rounded-sm cursor-pointer justify-start gap-2 items-center text-[11px]'>
                            <CheckCheckIcon size={15} />
                            <span>Valider</span>
                        </div>
                        <div onClick={(e) => handleDelete()} className='w-[70px] flex  bg-red-600 text-white p-1 rounded-sm cursor-pointer justify-start gap-2 items-center text-[11px]'>
                            <ShieldCloseIcon size={15} />
                            <span>Suppr</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoverUpload
