FROM node:18

# Crear directorio de trabajo
RUN mkdir -p /home/app

# Establecer directorio de trabajo
WORKDIR /home/app

# Copiar archivos
COPY . .

# Instalar dependencias (si tienes package.json)
RUN npm install

# Exponer el puerto
EXPOSE 3001

# Comando de inicio
CMD ["node", "server.js"]
