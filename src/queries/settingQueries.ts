import { db } from '~/App';
import { userSettings } from '../db/schema';

export async function getSettings() {
    return await db.transaction(async (tx) => {
        return await tx
            .select({
                settings: userSettings.settings
            })
            .from(userSettings)
            .limit(1);
    });
}
