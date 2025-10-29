    import { FaFacebook,   FaWhatsapp,  FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=" footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
        <h2 className="font-semibold text-">Recipe Book</h2>
        <div className="flex">
        <a href="https://www.facebook.com/md.safikol.islam.ashik"><FaFacebook  size={20}/></a>
        <a href="https://web.whatsapp.com/"><FaWhatsapp size={20} /></a>
        <a href="https://www.youtube.com/@safikolislam678"><FaYoutube size={20} /></a>
        </div>
        <div>Email: Cookbook Central88@gmail.com
            <div>Location:dhaka-1200,central road</div>
        </div>
          <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by RB Industries Ltd</p>
  </aside>
        </footer>
    );
};

export default Footer;


