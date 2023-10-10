import { User } from "../model/user"
import { loggedRepository } from "../repositories/logged.repository"

class UserService {

    private readonly url = 'http://localhost:3030/users'

    private async getHeaders() {
        const logged = await loggedRepository.getLoggedUser()
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        }
    }

    public async get(): Promise<[]> {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        })

        if (response.status === 200) {
            return await response.json()
        }

        throw new Error(await response.json())
    }

    public async store(user: User) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })

        if (response.status === 201) {
            return await response.json()
        }

        const error = await response.json()
        throw new Error(error.message)
    }

    public async update(user: User) {
        const response = await fetch(`${this.url}/${user.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })

        if (response.status === 200) {
            return await response.json()
        }

        const error = await response.json()
        throw new Error(error.message)
    }

    public async remove(user: User) {
        const response = await fetch(`${this.url}/${user.id}`, {
            method: 'DELETE',
            headers: await this.getHeaders()
        })

        if (response.status === 200) {
            return await response.json()
        }

        const error = await response.json()
        throw new Error(error.message)
    }

}

export const userService = new UserService()