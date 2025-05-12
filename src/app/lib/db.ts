import { sql } from '@vercel/postgres';
//import { Pool } from 'pg';
//installed module just in case.
//const pool = new Pool({
//    connectionString: process.env.DATABASE_URL,
//let it auto configure unless for self managed hosting or server.
//});
//Fallback sql. Use as back up or for very specific behavior.
//export default pool;
export {sql}; //Cannonical access. Use this as default.