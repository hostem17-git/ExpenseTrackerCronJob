import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
class OPENAIClient{

    requestCategories = async (data) => {
        try {
        const url = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',                 
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`               
        };
    
        const data = {
            model: 'gpt-4o-mini',                                     
            messages: [{ role: 'user', content: `Please give me categories for each of these expenses: ${data} . Make sure to return only the id and category as a json object` }],      
            max_tokens: 150,                                    
            temperature: 0.7                                     
        };

            const response = await axios.post(url, data, { headers }); // 11
            console.log('Response:', response.data.choices[0].message.content.trim()); // 12
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // 13
        }
    }
}

export default new OPENAIClient();