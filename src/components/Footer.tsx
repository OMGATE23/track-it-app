import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full p-8 bg-white footer-bg-backdrop">
      <p className="text-center">
        Created by{" "}
        <Link className="text-green-800" href="https://github.com/OMGATE23">
          Om Gate
        </Link>
      </p>
      <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
        <Link
          className="hover:text-blue-700 transition-all duration-150"
          href="https://x.com/om_gate"
        >
          Twitter
        </Link>
        <Link
          className="hover:text-blue-700 transition-all duration-150"
          href="https://github.com/OMGATE23"
        >
          Github
        </Link>
        <Link
          className="hover:text-blue-700 transition-all duration-150"
          href="https://github.com/OMGATE23/track-it-app"
        >
          Project
        </Link>
        <Link
          className="hover:text-blue-700 transition-all duration-150"
          href="https://omgate.hashnode.dev/"
        >
          Hashnode
        </Link>
      </div>
    </div>
  );
};

export default Footer;
