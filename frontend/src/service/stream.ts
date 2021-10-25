import api from "./api";

export const fetchStreams = async () => {
    let response = await api.get("/streams")
    return response.data;
}

export const fetchStream = async (key: string) => {
    let response = await api.get(`/stream/${key}`)
    return response.data;
}

export const insertStream = async (payload: object) => {
    return await api.post(`/stream/`, payload).then(response => {
        window.location.replace("/");
    }).catch(error => {
        console.error(error.message);
    })
}

export const updateStream = async (payload: object, key: string) => {
    return await api.patch(`/stream/${key}`, payload).then(response => {
        window.location.replace("/channel")
    }).catch(error => {
        console.error(error.message);
    })
}

export const deleteStream = async (key: string) => {
    return await api.delete(`/stream/${key}`).then(response=>{
        window.location.reload();
    }).catch(error => {
        console.error(error.message);
    })
}