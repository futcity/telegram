/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

export const menuLevel = {
    NONE: 0,
    MAIN: 1,
    BUILDING: 2,
    MODULE: 3,
    CONTROLLER: 4,
    SOCKET_CTRL: 5
}

class UserMenu {
    constructor(level) {
        this.level = level
        this.data = new Map()
    }
}

class TelegramLevel {
    #menus = new Map()

    init(users) {
        for (const usr of users) {
            this.#menus.set(usr.id, new UserMenu(menuLevel.MAIN))
        }
    }

    getLevel(user) {
        return this.#menus.get(user.id).level
    }

    setLevel(user, level) {
        let usrMenu = this.#menus.get(user.id)
        usrMenu.level = level
        this.#menus.set(user.id, usrMenu)
    }

    setData(user, property, data) {
        let usrMenu = this.#menus.get(user.id)
        usrMenu.data.set(property, data)
        this.#menus.set(user.id, usrMenu)
    }

    getData(user, property) {
        let usrMenu = this.#menus.get(user.id)
        return usrMenu.data.get(property)
    }

    back(user) {
        switch (this.getLevel(user)) {
            case menuLevel.BUILDING:
                this.setLevel(user, menuLevel.MAIN)
                break

            case menuLevel.MODULE:
                this.setLevel(user, menuLevel.BUILDING)
                break

            case menuLevel.CONTROLLER:
                this.setLevel(user, menuLevel.MODULE)
                break
        }
    }
}

export const tgLevel = new TelegramLevel()
