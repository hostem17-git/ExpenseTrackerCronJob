// save to db
import { query } from "express";
import { pool } from "../config/db.config.js";

class categoryRepository {
  readPendingRows = async () => {
    try {
      const query = `
            SELECT 
            id,expense
            FROM expenses
            WHERE category  = 'Categorization pending'
            `;

      const result = await pool.query(query);

      return result.rows;
    } catch (error) {
      console.log("Error reading data from DB", error);
    }
  };

  updateCategories = async (data) => {
    let client = await pool.connect();

    if(!data || data == {}){
        return;
    }

    try {
      await client.query("BEGIN");

      for(const id of Object.keys(data)){
            const query = `
                UPDATE expenses
                SET category = $1
                WHERE id = $2
                `;
    
            const values = [data[id], id];

            const result = await client.query(query, values);

            console.log(`Updated category for id : ${id}, ${result.rowCount} rows affected`);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("Error writing data to DB", error);
    } finally {
      client.release();
    }
  };
}

export default new categoryRepository();
