export interface TodoObject {
    value: string,
    done: boolean,
    category?: string,
    desc?: string,
    _id?:string
}

export interface TodoCategoryObject {
    value: string,
    label: string
}

export interface TodoComponentItem {
    handleChangeStatus() : void,
    isPendingChangeStatus: boolean,
    todo: TodoObject,
    setIsEdite(v:boolean): void,
    setIsDelete(v:boolean): void,
}
