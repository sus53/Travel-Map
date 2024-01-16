import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './app.scss';
import { LocationOn, Star } from '@mui/icons-material';
import { CreatePin, GetPin } from './function/Pin';
import { format } from 'timeago.js'
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([])
  const [newPin, setNewPin] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [place, setPlace] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [viewport, setViewport] = useState({
    longitude: 85.31295,
    latitude: 27.712017,
    zoom: 10
  })

  const getPins = async () => {
    try
    {
      setPins(await GetPin());
      setNewPin(null);
    } catch (error)
    {
      console.log(error)
    }
  }
  //fetching pins from database
  useEffect(() => {
    getPins();
    setCurrentUser(window.localStorage.getItem('user'));
    console.log(currentUser)
  }, [])

  useEffect(() => {
    setNewPin({
      username: currentUser,
      place,
      review,
      rating,
      longitude,
      latitude
    })
  }, [currentUser, review, rating, latitude, longitude])

  const createPinHandler = async (e) => {
    e.preventDefault();
    await CreatePin(newPin);
    await getPins();
    setNewPin(null);
  }

  const doubleClickHandler = (e) => {
    const { lng, lat } = e.lngLat;
    setLatitude(lat);
    setLongitude(lng);
  }


  return (
    <div className="app">
      <Map mapLib={maplibregl}
        initialViewState={viewport}
        mapboxAccessToken="sk.eyJ1Ijoic2hyZWVqYW4zNSIsImEiOiJjbGV0Z2owYzcxZzIwM3VydmFmaGczOHZ4In0.7GkO0WW9li6EjPoAwHVxLw"
        style={{ width: "100vw", height: "100vh", zIndex: "0" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mzxBoE1FbFirkKahjGeW"
        onDblClick={(e) => doubleClickHandler(e)}
        onClick={() => setNewPin(null)}
      >

        {pins && pins.map(pin =>
          <div key={pin._id}>
            <Marker longitude={pin.longitude} latitude={pin.latitude} anchor="bottom" offsetLeft={0} offsetTop={0}>
              <LocationOn style={{ fontSize: viewport.zoom * 3, color: (currentUser == pin.username) ? 'red' : 'blue', zIndex: "10", cursor: "pointer" }} onClick={() => { setCurrentPlaceId(pin._id); setViewport({ longitude: pin.longitude, latitude: pin.latitude, zoom: 8 }); setNewPin(null) }} />
            </Marker>

            {(currentPlaceId == pin._id) ? <Popup longitude={pin.longitude} latitude={pin.latitude}
              anchor="left" closeOnClick={false} onClose={() => setCurrentPlaceId(null)} closeOnMove={() => setCurrentPlaceId(null)}
            >
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{pin.place}</h4>
                <label>Review</label>
                <p className='review'>{pin.review}</p>
                <label>Rating</label>
                <div className='rating'>
                  {Array(pin.rating).fill(<Star key={pin._id} />)}
                </div>
                <label>Information</label>
                <span className='username'>
                  Created by <b>{pin.username}</b>
                </span>
                <span className='date'>
                  {format(pin.createdAt)}
                </span>
              </div>
            </Popup> : ''}
          </div>
        )}
        {newPin ? (<Popup longitude={newPin.longitude} latitude={newPin.latitude}
          anchor="left" closeOnClick={false} onClose={() => setNewPin(null)}
        >
          <div className='create-card'>
            <label>Place</label>
            <input onChange={(e) => setPlace(e.target.value)} />
            <label>Review</label>
            <textarea onChange={(e) => setReview(e.target.value)} ></textarea>
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)} defaultValue="1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div>
              <button onClick={(e) => createPinHandler(e)}>Pin</button>
            </div>
          </div>
        </Popup>) : ''}
      </Map>
      {isLogin ? <Login setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} /> : ''}
      {isRegister ? <Register setIsRegister={setIsRegister} setCurrentUser={setCurrentUser} /> : ''}
      <div className={currentUser ? 'd-none' : 'user'}>
        <button onClick={() => { setIsLogin(true); setIsRegister(false); }}>Login</button>
        <button onClick={() => { setIsLogin(false); setIsRegister(true); }}> Register</button>
      </div>
      <div className={currentUser ? 'user' : 'd-none'} >
        <button onClick={() => { window.localStorage.removeItem('user'); window.location.reload() }}>Logout</button>
      </div>
    </div >
  );
}

export default App;