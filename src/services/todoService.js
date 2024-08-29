import http from "./httpService";

export async function getAllTodoApi(queries, options = {}) {
    return http
        .get(`/todo/list?${queries}`, {
            ...options,
            next: {tags: ['todo']},
        })
        .then(({data}) => data.data);
}

export async function getTodoById(id) {
    return http.get(`/post/${id}`).then(({data}) => data);
}

export async function createTodoApi(data) {
    return http.post(`/todo/create`, data).then(({data}) => data.data);
}

export async function editTodoApi({id, data}) {
    return http.patch(`/todo/update/${id}`, data).then(({data}) => data.data);
}

export async function deleteTodoApi(id) {
    return http
        .delete(`/todo/remove/${id}`)
        .then(({data}) => data.data);
}



const todoApi = {
    getAllTodoApi,
    getTodoById,
    createTodoApi,
    editTodoApi,
    deleteTodoApi,
};

export default todoApi;
