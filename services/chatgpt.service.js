import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

class chatgptService{

    requestCategories = async (expenses) => {
        

        const url = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',                 
            'Authorization': `Bearer ${API_KEY}`               
        };
    

        const data = {
            model: 'gpt-4o-mini',                                     
            messages: [{ role: 'user', content: `Please give me categories for each of these expenses: ${JSON.stringify(expenses)} . Make sure to return only the id and category as a json object` }],      
            max_tokens: 15000,                                    
            temperature: 0.7                                     
        };

        try {
            const response = await axios.post(url, data, { headers });
            const responseMessage = response.data.choices[0].message.content.trim();
            console.log(responseMessage);
            const jsonString = responseMessage.match(/\[([\s\S]*?)\]/)
            console.log('Response:', jsonString); // 12
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // 13
        }
    }

    
}

export default new chatgptService();