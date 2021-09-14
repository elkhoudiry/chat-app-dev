import { resolve } from "path/posix";
import { Client } from "pg";
import logging from "./logging";

const NAMESPACE = "database"

const select = async (client: Client, values: string, table: string) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT ${values} from ${table};`, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rows);
        });
    });
};

const insert = async (client: Client, obj: {}, table: string) => {
    const keys = Object.keys(obj)
    const values = Object.values(obj)

    let keysStr = "("
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        i !== keys.length - 1 ? keysStr += `${key}, ` : keysStr += key
    }
    keysStr += ")"

    let valuesStr = "("
    for (let i = 0; i < values.length; i++) {
        const element = values[i] as any;
        if (typeof element === "string") valuesStr += `\'${element}\'`
        else valuesStr += element.toString()

        i !== values.length - 1 ? valuesStr += ", " : ""
    }
    valuesStr += ")"

    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO ${table} ${keysStr} VALUES ${valuesStr};`, (err, res) => {
            if (err) return reject(err);
            else resolve(res.rowCount);
        });

    });
};


export {
    select,
    insert
};
