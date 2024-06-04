import React, { use, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '10px'
};


function GoogleMapSection({coordinates,listing}  ) {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
  // })

  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 })

  const [map, setMap] = React.useState(null)

  useEffect(() => {
    coordinates&&setCenter(coordinates)
  }, [coordinates])

  const onLoad = React.useCallback(function callback(map) {
    
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {listing.map((item,index)=>(
        <MarkerItem
          key={index}
          item={item}
        ></MarkerItem>
      ))}
      </GoogleMap>
  ) 
}

export default React.memo(GoogleMapSection)