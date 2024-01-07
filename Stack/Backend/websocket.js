import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const WebSocket = require('ws');

export function setupWebSocket(server) {
    // Create a WebSocket server
    const wss = new WebSocket.Server({ server });

    // Handle new connections
    wss.on('connection', (ws) => {
        let username; // Variable to store the username

        // Handle incoming messages
        ws.on('message', (message) => {
            if (!username) {
                // If username is not set, consider the first message as the username
                username = message;
                console.log(`Client connected with username: ${username}`);
            } else {
                console.log(`Received message from ${username}: ${message}`);
                wss.clients.forEach(client => {
                    client.send(`${username}: ${message}`);
                });
            }
        });

        // Handle client disconnection
        ws.on('close', () => {
            console.log(`Client ${username} disconnected`);
        });
    });
};
