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
import { hdlModule } from "./moduleh.js"
import { Menu } from "../menu.js"

class BuildingHandler extends Menu {
    #buildings = []

    addBuildings(blds) {
        this.#buildings = blds
    }

    async process(user, ctx) {
        const building = tgLevel.getData(user, "building")

        const module = hdlModule.findModule(building, ctx.message.text)
        if (module) {
            tgLevel.setData(user, "module", module.name)
            return menuLevel.MODULE
        }

        let keys = []
        for (const mod of hdlModule.getModules(building)) {
            keys.push([mod.name])
        }
        keys.push(["Назад"])

        this.showMenu(ctx, building.toUpperCase(), "Hello it is Building menu", keys)

        return menuLevel.NONE
    }

    getBuildings() {
        return this.#buildings
    }

    findBuilding(name) {
        for (const bld of hdlBuilding.getBuildings()) {
            if (bld.name == name)
                return bld
        }
        return undefined
    }
}

export const hdlBuilding = new BuildingHandler()
