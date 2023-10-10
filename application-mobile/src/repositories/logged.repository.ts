import storage from '@react-native-async-storage/async-storage'

import { User } from '../model/user'

class LoggedRepository {

    private static readonly LOGGED_KEY = '@Auth_logged'

    public async setLoggedUser(user: User) {
        const json = JSON.stringify(user)
        await storage.setItem(LoggedRepository.LOGGED_KEY, json)
    }

    public async getLoggedUser() {
        const json = await storage.getItem(LoggedRepository.LOGGED_KEY)
        return json ? JSON.parse(json) : null
    }

    public async logOut() {
        await storage.removeItem(LoggedRepository.LOGGED_KEY)
    }

}

export const loggedRepository = new LoggedRepository()