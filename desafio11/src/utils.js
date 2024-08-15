import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';
import { faker } from "@faker-js/faker";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateProducts = () => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        let product = {
            _id: faker.string.uuid(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumnail: faker.image.dataUri(),
            code: faker.string.uuid(),
            stock: faker.number.int(),
            available: faker.datatype.boolean(),
            category: faker.commerce.productAdjective()
        };
        products.push(product);
    }
    return products;
}

export default __dirname;