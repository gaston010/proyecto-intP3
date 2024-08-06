// import React from "react";
import Carousel from "../Carousel/Carousel";
import useFetchArtists from "../hooks/useFetchArtists";

export function News() {
  const { data: newsData, loading, error } = useFetchArtists();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <div className="flex">
        <div className="grid justify-center">
          <Carousel data={newsData} />
        </div>
      </div>
    </div>
  );
}

export default News;
