import React from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import Zalo from 'styles/svg/icon/zalo'
import { checkArrNotEmpty } from 'Helper/checkArrNotEmpty';
// import { Instagram } from '@mui/icons-material';

const SocialLinks = ({ channel, linkToSocial }) => {
  switch (channel) {
    case "facebook":
      return (<a href={linkToSocial}>
        <Facebook />
      </a>);
    case "instagram":
      return (<a href={linkToSocial}>
        <Instagram />
      </a>);
    case "Twitter":
      return (<a href={linkToSocial}>
        <Twitter />
      </a>);
    case "zalo":
      return (<a href={linkToSocial}>
        <Zalo />
      </a>);
    default:
      break;
  }
}

const Footer = ({ socialLink, other_info, footerInfo }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (<footer className={`w-full py-10 radius-for-skewed ${mode !== 'light' ? "" : "bg-gray-50"}`}>
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
            <a className="inline-block mb-3 text-3xl font-bold leading-none" href="#">
              <img className="h-12" src="atis-assets/logo/atis/atis-mono-black.svg" alt="" width="auto" />
            </a>
            <p className="mb-4 max-w-sm text-gray-400 leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt felis eu est.</p>
            <div>
              {checkArrNotEmpty(socialLink) && socialLink.map((item, index) => <SocialLinks key={index} {...item} />)}
            </div>
          </div>
          <div className="w-full lg:w-2/3 lg:pl-16 flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
              <h3 className="mb-6 text-2xl font-bold">Products</h3>
              <ul>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Services</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">About Us</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">News and Stories</a></li>
                <li><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Roadmap</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
              <h3 className="mb-6 text-2xl font-bold">Important Links</h3>
              <ul>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Organization Team</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Our Journeys</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Pricing Plans</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Roadmap</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Terms &amp; Conditions</a></li>
                <li><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 lg:w-auto">
              <h3 className="mb-6 text-2xl font-bold">Company</h3>
              <ul>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">About Us</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Jobs</a></li>
                <li className="mb-4"><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Press</a></li>
                <li><a className={`${mode !== 'light' ? "hover:text-gray-800" : "text-gray-800 hover:text-gray-80"}`} href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="lg:text-center text-sm text-gray-400 border-t border-gray-100 pt-12 mt-16">© 2021. All rights reserved.</p>
      </div>
    </section>

  </footer>
  );
};

export default Footer;
