import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer/>
        </>
    );
}
