# Menggunakan image dasar nginx
FROM nginx:alpine

# Hapus file default nginx agar tidak ditampilkan
RUN rm -rf /usr/share/nginx/html/*

# Salin file html, js, dan img ke folder yang di-serve Nginx
COPY index.html /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/

# (Opsional) expose port 80
EXPOSE 80
