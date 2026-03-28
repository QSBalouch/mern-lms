import API from "./api";

export const getAllUsers = () => {
    return API.get("/users");
};

export const deleteUserById = (id) => {
    return API.delete(`/users/${id}`);
};