export interface initialStateType {
    user?: object,
    isAuthenticated?: boolean,
    isLoading?: boolean,
    error?: string,
}
export interface actionType  {
    type: string,
    payload: any
}

export type CurrentAuthContextType = {
    user?: any
    isAuthenticated?: any
    isLoading?: any
    signin?: any
    signup?: any
    logout?: any
}