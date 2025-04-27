import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";

export default function useDbQuery<T>(callback: (db: ReturnType<typeof useSQLiteContext>) => Promise<T>, deps: any[] = []): T | undefined {
    const [object, setObject] = useState<T>();
    const db = useSQLiteContext();

    useEffect(() => {
        let isMounted = true;
        callback(db).then((data: T) => {
            if (isMounted) setObject(data);
        });
        return () => {
            isMounted = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db, ...deps]);

    return object;
}