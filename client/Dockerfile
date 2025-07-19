# Gunakan base image nginx
FROM nginx:alpine

# Hapus default index nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy semua file web ke folder html nginx
COPY . /usr/share/nginx/html

# Container akan otomatis menjalankan nginx