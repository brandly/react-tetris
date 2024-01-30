# # Basisimage
# FROM node:alpine

# # Arbeitsverzeichnis im Container festlegen
# WORKDIR /react-docker-tutorial/

# # Abhängigkeiten installieren
# COPY package.json .

# RUN npm install

# # Quellcode kopieren
# COPY . . 

# # Build step
# RUN npm run build

# # Port freigeben
# EXPOSE 3000

# # Anwendung starten
# CMD ["npm", "start"]

# Stage 1: Node.js-Basisimage zum Bauen der App
FROM node:lts as build-stage

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app

# Abhängigkeiten installieren
# Beachten Sie, dass zuerst package.json und package-lock.json (falls vorhanden) kopiert werden
# Dies ermöglicht es Docker, den Build-Cache besser zu nutzen
COPY package*.json .
RUN npm ci

# Quellcode kopieren
COPY . .

# Anwendung bauen
RUN npm run build

# Stage 2: Nginx zum Ausführen der App
FROM nginx:alpine as production-stage

# Nginx Konfigurationsdatei kopieren
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Standardmäßig verwendet Nginx Port 80
EXPOSE 80

# Nginx im Vordergrund laufen lassen
CMD ["nginx", "-g", "daemon off;"]