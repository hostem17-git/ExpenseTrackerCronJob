import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

const primaryCategories = ["Essential Expenses","Financial & Savings","Lifestyle & Leisure","Family & Personal","Business & Work","Miscellaneous"];

const secondaryCategories = ["Housing","Food & Groceries","Transportation","Healthcare","Insurance","Savings & Investments","Debt Payments","Entertainment","Shopping","Hobbies","Education","Gifts & Donations","Childcare","Pet Expenses","Office Expenses","Freelance/Side Business","Travel","Taxes","Miscellaneous"]
class chatgptService{

    requestCategories = async (expenses) => {
        const url = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',                 
            'Authorization': `Bearer ${API_KEY}`               
        };
    
        const data = {
            model: 'gpt-4o-mini',                                     
            messages: [{ role: 'user', content: `Please give me categories for each of these expenses: ${JSON.stringify(expenses)} with primary category out of ${primaryCategories.join(", ")}  and secondary category out of ${secondaryCategories.join(", ")}. Make sure to return only the id, primary category as "primarycategory" and secondary category as "secondarycategory" as a json object. Do not return anything apart from the json object` }],      
            max_tokens: 15000,                                    
            temperature: 0.7                                     
        };

        try {
            const response = await axios.post(url, data, { headers });
            const responseMessage = response.data.choices[0].message.content.trim();

            const jsonString = responseMessage.match(/```json([\s\S]*?)```/);
            const categories = JSON.parse(jsonString[1].trim());
            return categories;

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // 13
        }
    }

}

export default new chatgptService();