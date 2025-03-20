const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// API endpoint to add task
app.post('/api/tasks', async (req, res) => {
    try {
        const { task } = req.body;
        
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: task
                            }
                        }
                    ]
                }
            }
        });

        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.error('Error adding task to Notion:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});