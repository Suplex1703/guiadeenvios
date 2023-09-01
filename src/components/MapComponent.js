import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const socket = io('http://localhost:5000'); // Cambia la URL al servidor backend

  useEffect(() => {
    socket.on('newCoordinates', (newPackage) => {
      setCoordinates((prevCoordinates) => [...prevCoordinates, newPackage]);
    });
  }, []);

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY">
      <GoogleMap center={{ lat: 0, lng: 0 }} zoom={10}>
        {coordinates.map((coord, index) => (
          <Marker key={index} position={{ lat: coord.latitude, lng: coord.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
