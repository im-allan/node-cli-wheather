# 🌦️ CLI Weather Application

Aplicación de consola (CLI) en Node.JS, Typescript, Inquirer que te permite obtener información del clima de una ciudad o lugar ingresado por el usuario.

## 🌍 Características

- 🔍 Buscar ciudad: Ingresa el nombre de la ciudad o lugar que buscas y la aplicación te mostrará una selección de 5 opciones de lugares que coinciden con el nombre ingresado.
- 🌡️ Información de la ciudad: Una vez que seleccionas la ciudad, obtendrás información detallada del clima, incluyendo:
  - Nombre de la ciudad
  - Latitud
  - Longitud
  - Temperatura actual
  - Temperatura mínima
  - Temperatura máxima
  - Descripción breve del clima actual

## 🌐 API utilizadas

La aplicación consume dos APIs mediante Axios para obtener la información del clima de la ciudad:
- 🌤️ [OpenWeather API](https://openweathermap.org/api): Utilizada para obtener la información del clima actual.
- 🗺️ [Mapbox API](https://www.mapbox.com/): Utilizada para realizar la búsqueda de lugares basados en el nombre ingresado por el usuario.

## 🛠️ Instalación y Uso

1. Clona este repositorio o descarga los archivos.
2. Instala las dependencias usando npm:
   ```
   npm install
   ```
3. Configura las variables de entorno: Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno con tus propias API keys:
   ```
   MAPBOX_KEY=TU_API_KEY_DE_MAPBOX
   OPENWEATHER_KEY=TU_API_KEY_DE_OPENWEATHER
   ```
4. Compila el código TypeScript:
   ```
   npm run build
   ```
5. Ejecuta la aplicación:
   ```
   npm start
   ```

## 📦 Paquetes utilizados y sus versiones

- `axios` v1.4.0
- `colors` v1.4.0
- `dotenv` v16.3.1
- `inquirer` v8.2.6
- `typescript` v5.1.6
- `@types/inquirer` v9.0.3
- `@types/node` v20.4.6

Recuerda reemplazar `TU_API_KEY_DE_MAPBOX` y `TU_API_KEY_DE_OPENWEATHER` con tus propias API keys.

Con esta aplicación, podrás obtener fácilmente información del clima de diferentes ciudades y lugares, todo desde la comodidad de tu terminal. ¡Que disfrutes la experiencia!