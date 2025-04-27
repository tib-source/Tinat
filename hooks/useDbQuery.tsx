import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export default function useDbQuery<T, A extends any[] = []>(
    callback: (db: ReturnType<typeof useSQLiteContext>, ...args: A) => Promise<T>,
    args?: A,
    deps: any[] = []
): T | undefined {
    const [object, setObject] = useState<T>();
    const db = useSQLiteContext();

    useEffect(() => {
        let isMounted = true;
        callback(db, ...(args ?? ([] as unknown as A))).then((data: T) => {
            if (isMounted) setObject(data);
        });
        return () => {
            isMounted = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db, ...(args ?? []), ...deps]);

    return object;
}