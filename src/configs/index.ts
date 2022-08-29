import dotenv from 'dotenv';

dotenv.config();

const {
    APP_PORT, APP_BASEURL,
    MONGO_DB, MONGO_STRING, JWT_STRING,
    MONGO_LOCAL
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
            MONGO_LOCAL,
        }
    }        
}