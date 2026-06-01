import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
    if (!API_KEY) {
        console.error("No API KEY found");
        return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    // There isn't a direct listModels on genAI instance in the node sdk easily without using the model manager, 
    // but let's try to just use a known model and see if it works, or catch the error.
    // actually, the error message said "Call ListModels".

    // We can't easily call ListModels via this SDK helper, it's usually via REST.
    // But let's try a direct REST call to see the models.

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
