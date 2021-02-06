import React, { useRef, useState } from "react";
import ReactMapGl, { Marker, Popup ,GeolocateControl} from 'react-map-gl';
import * as data from './data.json';
import Geocoder from 'react-mapbox-gl-geocoder';

function App() {
  
  const REACT_APP_MAPBOX_TOKEN = "pk.eyJ1Ijoia2V0aW5nMjkxOCIsImEiOiJja2tzeHJ5MXcwZnliMndwaHEyaGU0d2c2In0.3eo0t-v_J2aZcU9pZUE3Iw";
  const [viewport, setViewport] = useState({
    latitude: 32.9350,
    longitude: -96.7025,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });
  const [selectedHome, setSelectedHome] = useState(null);
  const seletHandler = (viewport, item) => {
    setViewport(viewport);
}
const queryParams = {
  country: 'us',
  region: 'TX'
}
  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapStyle="mapbox://styles/keting2918/ckksyr06m1nid17qgovvkaavb"
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
      
      <Geocoder
                mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                onSelected={seletHandler}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                queryParams={queryParams}
                position="top-left"
            />
        {
          data.HomeData.map(home => (
            <Marker
              key={home.address}
              latitude={home.latitude}
              longitude={home.longitude}
            >
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedHome(home);
              }}>
                <img src={home.icon} alt="home icon"></img>
              </button>
            </Marker>
          ))
        }
        {selectedHome ? (
          <Popup
            latitude={selectedHome.latitude}
            longitude={selectedHome.longitude}
            onClose={() => {
              setSelectedHome(null);
            }}
            >
            <div>
              <h2>{selectedHome.address}</h2>
              <img></img>
              <p>{selectedHome.HOA}</p>
              <p>{selectedHome.Price}</p>
              <p>{selectedHome.date}</p>
            </div>
          </Popup>
        ) : null}

      </ReactMapGl>

    </div>
  );
}

export default App;
