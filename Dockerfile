FROM nginx:1.21.0-alpine
ENV NODE_ENV production
# Copy built assets from builder
COPY /build /usr/share/nginx/html
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
