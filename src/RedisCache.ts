import { Cache } from './Cache';

const redis = require("redis");

export class RedisCache implements Cache {

    private redisConnection;
    private redisStore;
    private cacheTime: number = 60;
    
    constructor () {
       this.redisConnection = redis.createClient(6379, 'redis');
    }

    set (key: string, value) {
        this.redisConnection.set(key, JSON.stringify(value), 'EX', this.cacheTime);
    }

    fetch (key: string, callback) {
        this.redisConnection.get(key, function(err, reply) {
            if(err) {
                callback(false);
            }
            callback(JSON.parse(reply));
        });
    }
}