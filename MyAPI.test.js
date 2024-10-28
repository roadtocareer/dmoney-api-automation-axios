import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
import storeToken from './setEnvVar.js';
dotenv.config();
import { faker } from '@faker-js/faker';
import generateRandomId from './Utils.js'
import jsonData from './userData.json' assert { type: 'json' };
import fs from 'fs'

describe("User Login", async () => {
    it("User login with valid creds", async () => {
        const {data} = await axios.post(`${process.env.base_url}/user/login`, {
            "email": "admin@roadtocareer.net",
            "password": "1234",
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        // Log the response data to verify the output
        console.log(data);

        expect(data.message).to.contains("Login successful");
        storeToken('token', data.token);

    })
    it("search user", async ()=> {
        const {data} = await axios.get(`${process.env.base_url}/user/search/id/11745`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${process.env.token}`
            }
        });
        console.log(data);
        expect(data.message).to.equal("User found")
    });
    it("create user", async ()=> {
        const { data } = await axios.post(`${process.env.base_url}/user/create`, {
            "name": `Axios user ${faker.person.firstName()}`,
            "email": `${faker.internet.email()}`,
            "password": "1234",
            "phone_number": `01502${generateRandomId(100000, 999999)}`,
            "nid": "123456789",
            "role": "Customer"
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY":`${process.env.secretKey}`
                }
            });
        console.log(data);
        jsonData.push(data.user);
        fs.writeFileSync('./userData.json', JSON.stringify(jsonData, null, 2)); 
    });


})