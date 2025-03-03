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
      {
        protocol: "https",
        hostname: "67c52d50fa45f80008d169bf--hso-client.netlify",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
