class User {
    constructor(id, full_name, email, password, isAdmin, createdAt, updatedAt) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getUsers() {}

    getUserById() {}

    createUser() {}

    updateUser() {}

    deleteUser() {}
}

module.exports = User