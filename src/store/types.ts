
export interface IToken {
    access: string;
    token: string;
}

export interface IUserState {
    _id?         : string;
    email?       : string;
    username    : string;
    idapp?       : any;
    password?    : string;
    lang?        : string;
    ripetipassword?: string;

    idToken     : string;
    userId      : number;

    tokens?      : IToken[];

    verified_email: boolean;

    tokenforgot? : string;
}

export interface ILinkReg {
    idLink      : string;
}

export interface IIdToken {
    idToken      : string;
}

export interface IResult {
    status      : number;
    statusText  : string;
}
