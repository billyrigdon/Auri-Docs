FROM archlinux as base
WORKDIR /opt/AuriDocs
RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel --noconfirm
RUN pacman -S nodejs npm vim --noconfirm
COPY . ./
RUN rm -rf node_modules
RUN npm install
EXPOSE 1944
CMD ["node", "/opt/AuriDocs/index.js"]