import { loggedRepository } from '../repositories/logged.repository'

class AuthService {

    private readonly url = 'http://localhost:3030/auth'

    public async login(username: string, password: string) {
        const response = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        if (response.status === 201) {
            response.json().then(user => {
                loggedRepository.setLoggedUser(user)
            })
            return true
        }
        return false
    }

}

export const authService = new AuthService()