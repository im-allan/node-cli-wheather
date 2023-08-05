import "dotenv/config.js";
import colors from 'colors';
import { Cities, inquirerMenu, listPlaces, pause, readInput } from "./helpers/inquirer.js"
import { Searches }from "./models/searches.js";

const main = async() => {
  let option;
  const searches = new Searches();
  do {
    option = await inquirerMenu();
    switch (option) {
      case 1:

        const place = await readInput('Ciudad: ');
        const places = await searches.city(place);
        const id = await listPlaces(places);
        if (id === '0') continue;
        // Guardar en db
        const {name, lng, lat} = places.find((p: Cities) => p.id === id);
        searches.addHistory(name);

        const {desc, min, max, temp} = await searches.cityWeather(lat, lng);
        console.clear();
        console.log(colors.blue('\nInformación de la ciudad\n'));
        console.log('Ciudad:', colors.green(name));
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('T° actual:', temp);
        console.log('T° Mínima:', min);
        console.log('T° Máxima:', max);
        console.log('Como está el clima ahora:', desc);
        break;
      case 2:
        searches.capitalizedHistory.forEach( (place, i) => {
          console.log(`${colors.blue(i + 1 + '.')} ${place}`)
        })
        break;
      }
    if (option !== 0) await pause();
    
  } while (option !== 0);
}

main();