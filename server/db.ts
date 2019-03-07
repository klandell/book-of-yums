import { Pool } from 'pg';

const { DATABASE_URL } = process.env;
const pgPool = new Pool(DATABASE_URL);

export default pgPool;
