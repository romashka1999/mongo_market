class ApiReponse {
    constructor(
        protected readonly statusCode: number,
        protected readonly success: boolean,
        protected readonly message: string,
    ) { }
}


export class SuccessReponse extends ApiReponse {
    constructor(
        public readonly statusCode: number,
        protected readonly message: string,
        private readonly data: any,
    ) { 
        super(statusCode, true, message);
    }
}

export class ErrorReponse extends ApiReponse {
    constructor(
        public readonly statusCode: number,
        protected readonly message: string,
    ) { 
        super(statusCode, false, message);
    }
}