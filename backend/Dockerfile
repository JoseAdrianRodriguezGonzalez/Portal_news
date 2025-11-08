# Version de node
FROM node:20-alpine
# Mi carpeta raiz dentro del contenedor
WORKDIR /app
# Copia todos los package json a raiz
COPY package*.json ./

# se instalana las dependencias del manifiesoto

RUN npm install

#Copiamos el resto del codigo

COPY . .
#Exponemos el puerto 3000

EXPOSE 3000

#Comando por defecto 
CMD ["npm","run","dev"]
