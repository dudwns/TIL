/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,

  // redirect 시킴, URL 변경
  async redirects() {
    return [
      {
        source: "/old-blog/:path*", //유저가 접속하는 URL
        destination: "/new-blog/:path*", //실제로 보낼 URL
        permanent: false, //기록을 남기는지 여부
      },
    ];
  },

  // rewrites는 redirect를 시키긴 하지만, URL이 변하지 않음
  async rewrites() {
    return [
      {
        source: "/api/movies", // API KEY를 숨김
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
