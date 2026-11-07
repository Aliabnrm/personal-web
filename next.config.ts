import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/this-week", destination: "/writing", permanent: true },
      { source: "/this-week/:slug", destination: "/writing", permanent: true },
      {
        source: "/notes/small-evaluation-sets",
        destination: "/notes/retrieval-before-generation",
        permanent: true,
      },
      {
        source: "/notes/context-is-a-design-decision",
        destination: "/notes/retrieval-before-generation",
        permanent: true,
      },
      {
        source: "/notes/when-does-a-workflow-need-an-agent",
        destination: "/roadmaps/building-agents",
        permanent: true,
      },
      {
        source: "/notes/build-an-experiment-logbook",
        destination: "/writing",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
