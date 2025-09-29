FROM alpine:latest

# Install necessary packages
RUN apk add --no-cache ca-certificates wget unzip

# Create a non-root user
RUN adduser -D -s /bin/sh pocketbase

# Create directories for PocketBase
RUN mkdir -p /app/pb_data /app/pb_migrations

# Download and extract PocketBase
WORKDIR /tmp
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.30.0/pocketbase_0.30.0_linux_amd64.zip \
    && unzip pocketbase_0.30.0_linux_amd64.zip \
    && mv pocketbase /app/pocketbase \
    && chmod +x /app/pocketbase \
    && rm -rf /tmp/*

# Copy migrations and data directories
COPY pb_migrations/ /app/pb_migrations/
COPY pb_data/ /app/pb_data/

# Change ownership to the pocketbase user
RUN chown -R pocketbase:pocketbase /app

# Switch to non-root user
USER pocketbase

# Set working directory
WORKDIR /app

# Expose the default PocketBase port
EXPOSE 8090

# Create volumes for persistent data
VOLUME ["/app/pb_data", "/app/pb_migrations"]

# Run PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
