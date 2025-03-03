import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trick-go-asp-southeast.trycloudflare.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trick-go-asp-southeast.trycloudflare.comimages",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trick-go-asp-southeast.trycloudflare.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
