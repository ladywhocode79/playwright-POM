/// <reference types="node" />
import 'dotenv/config';

export const valid_credentials =    
{
    "username": process.env.TEST_USERNAME ?? 'placeholder_username',
    "password": process.env.TEST_PASSWORD ?? 'placeholder_password'
};