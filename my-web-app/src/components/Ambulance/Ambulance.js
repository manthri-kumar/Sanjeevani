import React, { useState, useEffect } from 'react';
import './Ambulance.css';

const Ambulance = () => {
  const [status, setStatus] = useState('loading');
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('Finding your location...');
  const ambulanceData = {
    id: 'A123-XYZ',
    distance: '2.5 km',
    eta: '5 mins',
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      setMessage('Your browser does not support geolocation.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setStatus('success');
        setMessage('');
      },
      (error) => {
        setStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setMessage('Location access was denied. Please enable it in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setMessage('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setMessage('The request to get your location timed out.');
            break;
          default:
            setMessage('An unknown error occurred.');
        }
      }
    );
  }, []);

  const handleBookAmbulance = () => {
    setStatus('booked');
    setTimeout(() => {
      setStatus('success');
      setMessage('Booking Confirmed!');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, 2000);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-4 font-inter">
      <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book an Ambulance</h1>
        <p className="text-gray-500 mb-6">Find the nearest ambulance to your location</p>

        {(status === 'loading' || status === 'booked') && (
          <div className="mb-6">
            <div className="loading-animation w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && location && (
          <>
            <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-left">
              <p className="font-semibold mb-1">Your Location:</p>
              <p className="text-sm font-mono">{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Nearest Ambulance Found</h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Ambulance ID</p>
                  <p className="font-semibold text-gray-800">{ambulanceData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-semibold text-gray-800">{ambulanceData.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ETA</p>
                  <p className="font-semibold text-gray-800">{ambulanceData.eta}</p>
                </div>
              </div>
              <button
                onClick={handleBookAmbulance}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105 hover:bg-red-700"
              >
                Book Now
              </button>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
            <p className="font-semibold text-lg mb-1">Error</p>
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ambulance;
