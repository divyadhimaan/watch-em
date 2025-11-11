## Documenatation

## Ideas

- If Java backend is down, MongoDB should handle all operations.
1. Primary flow (Normal case): When Java backend is healthy
    `Client → Node.js → Java backend → MongoDB (cache/store data)`
    - Node forwards requests to Java backend.
    - It also saves a copy (cache) of the data to MongoDB for backup.
    - MongoDB is kept up to date (for read performance and resilience).
1. Fallback flow (Java backend down): When Java backend fails health check
    `Client → Node.js → MongoDB (serve cached data)`
    - Node serves data directly from MongoDB.
    - All write/update requests can be queued or marked as pending sync.