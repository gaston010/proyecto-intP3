import { useState, useEffect } from 'react';

export function TagInfo() {
  const [tagInfo, setTagInfo] = useState(null);

  useEffect(() => {
    const fetchTagInfo = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=disco&api_key=fd58315aaf0d60e2c0169e363552da97&format=json`
        );
        if (response.ok) {
          const data = await response.json();
          setTagInfo(data.tag);
        } else {
          console.error('Error fetching tag info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tag info:', error);
      }
    };

    fetchTagInfo();
  }, []);

  if (!tagInfo) {
    return <p>Loading tag information...</p>;
  }

  return (
    <div className="tag-info">
      <h2 className="text-xl font-bold">{tagInfo.name}</h2>
      <p>{tagInfo.wiki ? tagInfo.wiki.summary : 'No description available.'}</p>
      <a href={tagInfo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Learn more on Last.fm
      </a>
    </div>
  );
}

export default TagInfo;
