interface VerseRow {
    id: number;
    book_id: number;
    chapter: number;
    verse: number;
    text_am?: string;
    [key: string]: any;
}

interface GetVerseResult extends VerseRow {
    requestedVerse: number;
}

interface DBTransaction {
    executeSql(
        sqlStatement: string,
        args?: any[],
        callback?: (transaction: DBTransaction, resultSet: DBResultSet) => void,
        errorCallback?: (transaction: DBTransaction, error: Error) => void
    ): void;
}

interface DBResultSet {
    rows: {
        length: number;
        item: (index: number) => VerseRow;
        _array: VerseRow[];
    };
}

interface DB {
    transaction: (callback: (tx: DBTransaction) => void) => void;
}

export const getVerse = (
    db: DB,
    bookId: number,
    chapter: number,
    verse: number
): Promise<GetVerseResult | undefined> =>
    new Promise((resolve, reject) => {
        let curr = verse;
        let tries = 0;

        function query() {
            db.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM verses WHERE book_id=? AND chapter=? AND verse=?`,
                    [bookId, chapter, curr],
                    (_, { rows }) => {
                        const row = rows.item(0);
                        if (row?.text_am || tries >= 3) {
                            resolve({ ...row, requestedVerse: verse });
                        } else {
                            curr++;
                            tries++;
                            query();
                        }
                    },
                    (_, err) => reject(err)
                );
            });
        }

        query();
    });
  
interface BookRow {
    id: number;
    name: string;
    order_index: number;
    [key: string]: any;
}

export const getBooks = (db: DB): Promise<BookRow[]> =>
    new Promise((resolve, reject) => {
        db.transaction((tx: DBTransaction) => {
            tx.executeSql(
                `SELECT * FROM books ORDER BY order_index`,
                [],
                (_: DBTransaction, { rows }: DBResultSet) => {
                    resolve(rows._array as unknown as BookRow[]);
                },
                (_: DBTransaction, err: Error) => reject(err)
            );
        });
    });
  