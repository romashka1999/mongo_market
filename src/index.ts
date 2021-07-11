import { app } from './app';
import { DB } from './db';

const main = async () => {
    try {
        await DB.connectToDb()
        app.listen(8000, () => {
            console.log('listening on 3000')
        })
    } catch (error) {
        console.log('error :>> ', error);
    }
    
}

main();