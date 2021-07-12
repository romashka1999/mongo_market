import { app } from './app';
import { DB } from './db';

const main = async () => {
    try {
        await DB.connectToDb()
        app.listen(8000, () => {
            console.log('listening on 8000')
        })
    } catch (error) {
        console.log('error :>> ', error);
    }
    
}

main();