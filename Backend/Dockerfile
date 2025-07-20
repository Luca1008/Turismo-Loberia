# Usamos una imagen oficial de Node.js
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install

# Ahora copiamos el resto del código
COPY . .

# Exponemos el puerto del backend
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["node", "index.js"]
