import dotenv from 'dotenv';

dotenv.config();

const JWT_STRING = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlZGFsZGluby
BEYW5pZWwiLCJpYXQiOjE1MTYyMzkwMjJ9.Yp-tQG_Z8PBijiai8znsAnSQs_-VPvSxl65f4-6E6ekV`;

const {
    APP_PORT, APP_BASEURL,
    MONGO_DB, MONGO_STRING, 
    MONGO_CLUSTER
} = process.env;

export const configs = {
    variables: {
        app: {
            APP_PORT,
            APP_BASEURL,
            JWT_STRING
        },
        mongo: {
            MONGO_STRING,
            MONGO_DB,
            MONGO_CLUSTER,
        }
    }        
}