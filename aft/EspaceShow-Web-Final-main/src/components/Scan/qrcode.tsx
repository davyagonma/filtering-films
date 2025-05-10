"use client"
import LoginFirst from "@/components/components/LoginFirst";
import Menu from "@/components/components/Menu";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { colors } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast"
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeResult } from 'html5-qrcode'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStatus, setIsScanned } from "@/utils/services";

export default function Scan() {
    const { toast } = useToast()
    const code = useSearchParams().get('process')!
    const uuid = useSearchParams().get('uuid')!


    return (
        <>
            <Navbar />
            <section className="p-5 pt-[100px] h-[70vh] md:h-[auto] ">
                <p className="hidden md:block text-xl font-bold pb-5">Tableau de bord</p>
                <div className="flex justify-start">
                    <div id="search" className="hidden md:block bg-white p-4 rounded-lg h-[400px]" style={{ border: '1px solid #dadada' }}>
                        <Menu />
                    </div>
                    <div className="text-center m-[auto]">
                        <div className="flex justify-center w-full mt-10 md:md-0 ">
                            <p style={{ color: `${colors.primary}` }} className="text-xl font-bold">Scanner un code QR</p>
                        </div>
                        <div>
                            <LoginFirst route={"/scan"} />
                            <QrCode code={code} uuid={uuid} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>

    );
}


const QrCode = ({ code, uuid }: { code: string, uuid: string }) => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [scannerKey, setScannerKey] = useState<number>(0);
    const [isScanned, setIsScanne] = useState<string | null>(null)
    const [isScannedBool, setIsScannedBool] = useState<boolean>(false);

    useEffect(() => {
        let scanner: Html5QrcodeScanner | null = null;

        const initializeScanner = async () => {
            try {
                setIsScanning(true);
                setError(null);
                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                };

                scanner = new Html5QrcodeScanner("reader", config, /* verbose= */ false);

                const onScanSuccess = async (decodedText: string) => {
                    const [code, reservationId] = decodedText.split('-');
                    setScanResult(code.trim()!);
                    setIsScanning(false);
                    const data = await getStatus(reservationId.trim()!);
                    if (data?.scan === 'oui') {
                        setIsScannedBool(true);
                        setScanResult(null);
                        setIsScanne('Déjà scanné');
                        setTimeout(() => {
                            setIsScanne(null);
                            setIsScannedBool(false);
                        }, 3000);
                    } else {
                        await setIsScanned(reservationId.trim()!); // Set the ticket as scanned
                        setIsScannedBool(false);
                        setTimeout(() => {
                            setScanResult(null);
                        }, 3000);
                    }
                    // console.log(decodedText);
                    if (scanner) {
                        scanner.clear();
                    }
                    setScannerKey(prevKey => prevKey + 1); 
                };

                const onScanFailure = (error: string) => {
                    console.warn(`QR code scanning failed: ${error}`);
                };

                await scanner.render(onScanSuccess, onScanFailure);
            } catch (err) {
                console.error("Failed to initialize scanner:", err);
                setError("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
                setIsScanning(false);
            }
        };

        initializeScanner();

        return () => {
            if (scanner) {
                scanner.clear().catch(console.error);
            }
        };
    }, [scannerKey]);

    return (
        <div className="text-center mt-6">
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}
            {scanResult && !isScannedBool && isScanned !== 'Déjà scanné' ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Résultats du Scan</h3>
                    {scanResult === code ? (
                        <p className="text-center my-3 p-2 text-green-500 border border-green-500 rounded-lg text-xl">Validé</p>
                    ) : (
                        <p className="text-center my-3 p-2 text-red-500 border border-red-500 rounded-lg text-xl">Refusé</p>
                    )}
                </div>
            ) : <p className={`text-center my-3 p-2 text-red-500 border border-red-500 rounded-lg text-xl ${!isScannedBool ? 'hidden' : ''}`}>{isScanned}</p> }
            <div id="reader" className="mx-auto" style={{ maxWidth: '250px' }}></div>
        </div>
    );
};

export { QrCode };
