const mapErrorCode: any = {
  '23505': 'Duplicate key',
};

export default class DatabaseError extends Error {
  constructor(errCode: string, errMessage: string) {
    const foundMessage = mapErrorCode[errCode] ?? '';
    const message = `Database Error. code: ${errCode} ${foundMessage}. detail: ${errMessage}`;
    super(message);
  }
}