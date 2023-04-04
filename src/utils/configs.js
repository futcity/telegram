/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

import { User } from "../bot/user.js"
import { log, logMod } from "./log.js"
import { readFileSync } from "fs"
import { tgBot } from "../bot/tgbot.js"
import { hdlBuilding } from "../bot/menu/handlers/buildingh.js"

class Configs {
    load(path) {
        let data = this.#loadFromFile(path)

        tgBot.setToken(data.token)
        log.info(logMod.CONFIGS, "Bot token: " + data.token)

        for (const usr of data.users) {
            tgBot.addUser(new User(usr.name, usr.id))
            log.info(logMod.CONFIGS, "Add user name: " + usr.name + " id: " + usr.id)
        }
        
        hdlBuilding.addBuildings(data.buildings)

        return true
    }

    #loadFromFile(fileName) {
        let rawData = readFileSync(fileName)
        return JSON.parse(rawData.toString())
    }
}

export const cfg = new Configs()
