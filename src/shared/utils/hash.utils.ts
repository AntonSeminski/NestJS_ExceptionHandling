import * as bcrypt from "bcrypt";
import {Md5} from 'ts-md5';

const SecureHash = {
    isValid: async (stringToCheck: string, hashedString: string): Promise<boolean> => {
        if (!(stringToCheck && hashedString))
            return null;

        try {
            return await bcrypt.compare(stringToCheck, hashedString)
        } catch (e) {
            return false;
        }
    },
    hash: async (toHash: string) => {
        if (!toHash)
            return null;

        return await bcrypt.hash(toHash, await bcrypt.genSalt(+process.env.CRYPTO_SALT_ROUNDS));
    }
}
const SimpleHash = {
    hash: (toHash: string) => {
        return Md5.hashStr(toHash);
    },
    isValid: async (toCheck: string, hashed: string) => {
        return Md5.hashStr(toCheck) === hashed;
    }
}

export {
    SecureHash,
    SimpleHash
}