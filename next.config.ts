import type {NextConfig} from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@": path.resolve(__dirname, "src"),
            "@/components": path.resolve(__dirname, "src/components"),
            "@/lib": path.resolve(__dirname, "src/lib"),
            "@/hooks": path.resolve(__dirname, "src/hooks"),
            "ui": path.resolve(__dirname, "src/components/ui"),
            "utils": path.resolve(__dirname, "src/lib/utils"),
            "components": path.resolve(__dirname, "src/components"),
            "lib": path.resolve(__dirname, "src/lib")
        }
        return config
    }
};

export default nextConfig;
