import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const ItemContext = createContext();

export function ItemProvider({ children }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/videos')
        .then(response => {
          setVideos(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  return (
    <ItemContext.Provider value={{ videos, setVideos }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItemContext() {
  return useContext(ItemContext);
}