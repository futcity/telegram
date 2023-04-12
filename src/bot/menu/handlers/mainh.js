/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

import { tgLevel, menuLevel } from "../level.js"
import { hdlBuilding } from "./buildingh.js"
import { Menu } from "../menu.js"

class MainHandler extends Menu {
    async process(user, ctx) {
        const bld = hdlBuilding.findBuilding(ctx.message.text)
        if (bld) {
            tgLevel.setData(user, "building", bld.name)
            tgLevel.setData(user, "server", bld.server)
            return menuLevel.BUILDING
        }

        let keys = []
        for (const bld of hdlBuilding.getBuildings()) {
            keys.push([bld.name])
        }
        this.showMenu(ctx, "ГЛАВНОЕ МЕНЮ",
            "Добро пожаловать в клавное меню бота для управления умными устройствами FutureCity.\n\nВыберете объект для управления:", keys)

        return menuLevel.NONE
    }
}

export const hdlMain = new MainHandler()
