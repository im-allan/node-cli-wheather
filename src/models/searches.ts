import * as fs from 'fs';

import axios from 'axios';


interface Feature {
  id: string;
  place_name: string;
  center: [number, number];
}

interface Weather {
  desc: string;
  min: number;
  max: number;
  temp: number;
}


class Searches {
  history: string[];
  dbPath = './dist/db/database.json';

  constructor() {
    this.history = [];
    this.readDB();
  }

  get capitalizedHistory(){
    return this.history.map(place => {
      let words = place.split(' ');
      words = words.map(word => word[0].toUpperCase() + word.substring(1));
      return words.join(' ');
    })
  }

  get paramsMapbox(){
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsOpenWeather(){
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  async city(place: string){
    console.log('ciudad', place);

    try {

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places`,
        params: this.paramsMapbox
      })
      const resp = await instance.get(`/${place}.json`);

      const mappedPlace = resp.data.features.map((place: Feature) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }))

      return mappedPlace;

    } catch (error) {
      return [];
    }
  }

  async cityWeather(lat: number, lon: number): Promise<Weather>{
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5`,
        params: {
          lat,
          lon,
          ...this.paramsOpenWeather
        },
      })
      const resp = await instance.get(`weather`);
      const {weather, main} = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  addHistory(place: string){
    if (this.history.includes(place.toLocaleLowerCase())) return;
    this.history = this.history.splice(0, 5);
    this.history.unshift(place.toLowerCase());

    this.saveDB();
  }

  saveDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.history));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    this.history = data;
  }
}

export {
  Searches,
  Feature,
}; 