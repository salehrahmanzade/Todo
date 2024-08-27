import http from "./httpService";

export async function getAllTodoApi(queries, options = {}) {
    return http
        .get(`/todo/list?${queries}`, {
            ...options,
            next: {tags: ['todo']},
        })
        .then(({data}) => data.data);
}

export async function getPostById(id) {
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

export async function likePostApi(id) {
    return http.post(`/post/like/${id}`).then(({data}) => data.data);
}

export async function bookmarkPostApi(id) {
    return http.post(`/post/bookmark/${id}`).then(({data}) => data.data);
}

const todoApi = {
    getAllTodoApi,
    getPostById,
    createTodoApi,
    editTodoApi,
    deleteTodoApi,
    likePostApi,
    bookmarkPostApi,
};

export default todoApi;
