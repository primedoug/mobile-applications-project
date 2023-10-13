import Role from "../model/role"
import { loggedRepository } from "../repositories/logged.repository"

class RoleService {

    private readonly  url = 'http://localhost:3030/roles'

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

    public async store(role: Role) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(role)
        })

        if (response.status === 201) {
            return await response.json()
        }

        const error = await response.json()
        throw new Error(error.message)
    }

    public async update(role: Role) {
        const response = await fetch(`${this.url}/${role.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(role)
        })

        if (response.status === 200) {
            return await response.json()
        }

        const error = await response.json()
        throw new Error(error.message)
    }

    public async remove(role: Role) {
        const response = await fetch(`${this.url}/${role.id}`, {
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

export const roleService = new RoleService()