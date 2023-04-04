/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

import { log, logMod } from "../utils/log.js"
import { Telegraf } from "telegraf"
import { tgLevel, menuLevel } from "./menu/level.js"
import { hdlBuilding } from "./menu/handlers/buildingh.js"
import { hdlMain } from "./menu/handlers/mainh.js"
import { hdlModule } from "./menu/handlers/moduleh.js"
import { hdlController } from "./menu/handlers/controllerh.js"

class TelegramBot {
    #bot
    #users = []
    #token = ""
    #menus = new Map()

    addUser(user) {
        this.#users.push(user)
    }

    setToken(token) {
        this.#token = token
    }

    addMenu(level, menu) {
        this.#menus.set(level, menu)
    }

    start() {
        tgLevel.init(this.#users)
        this.#bot = new Telegraf(this.#token)
        this.#bot.on("text", (ctx) => { this.#processMessage(ctx) })
        this.#bot.launch()
    }

    async #processMessage(ctx) {
        let user = ctx.message.from
        let message = ctx.message.text
        let newLevel = menuLevel.NONE

        let foundUser = this.#findUser(user.id)
        if (!foundUser) {
            log.error(logMod.TGBOT, "User first_name: " + user.first_name +  " last_name: " +
                user.last_name + " id: " + user.id + " not authorized")
            return
        }

        if (message == "Назад") {
            tgLevel.back(foundUser)
        }

        newLevel = await this.processMenu(foundUser, ctx)
        if (newLevel != menuLevel.NONE) {
            tgLevel.setLevel(foundUser, newLevel)
            await this.processMenu(foundUser, ctx)
        }
    }

    async processMenu(user, ctx) {
        switch (tgLevel.getLevel(user)) {
            case menuLevel.MAIN:
                return await hdlMain.process(user, ctx)

            case menuLevel.BUILDING:
                return await hdlBuilding.process(user, ctx)

            case menuLevel.MODULE:
                return await hdlModule.process(user, ctx)

            case menuLevel.CONTROLLER:
                return await hdlController.process(user, ctx)
        }
        return menuLevel.NONE
    }

    #findUser(id) {
        for (const usr of this.#users) {
            if (usr.id == id) {
                return usr
            }
        }
        return undefined
    }
}

export const tgBot = new TelegramBot()
