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
import { hdlController } from "./controllerh.js"
import { hdlBuilding } from "./buildingh.js"
import { Menu } from "../menu.js"
import { HttpClient } from "../../../net/client.js"

class ModuleHandler extends Menu {
    async process(user, ctx) {
        const server = tgLevel.getData(user, "server")
        const building = tgLevel.getData(user, "building")
        const module = tgLevel.getData(user, "module")

        const client = new HttpClient(server.proto, server.ip, server.port, server.api)

        const controller = hdlController.findController(building, module, ctx.message.text)
        if (controller) {
            tgLevel.setData(user, "controller", controller.name)
            return menuLevel.CONTROLLER
        }

        const controllers = hdlController.getControllers(building, module)

        /*
         * Configure info
         */

        let info = ""
        for (const ctrl of controllers) {
            info += "<b>" + ctrl.name.toUpperCase() + ":</b>\n"
            await client.getRequest(ctrl.info.url, (resp) => {
                for (const field of ctrl.info.fields) {
                    if (field.name == "") {
                        info += "\n"
                        continue
                    }
                    
                    for (const item of resp.data) {
                        if (item.name == field.name) {
                            info += "        " + field.alias + ": <b>" + this.getStrValue(item[field.field], field.type) + "</b>\n"
                            break
                        }
                    }
                }
            })
            info += "\n"
        }

        /*
         * Configure buttons
         */

        let keys = []
        for (const ctrl of controllers) {
            keys.push([ctrl.name])
        }
        keys.push(["Назад"])

        /*
         * Show menu
         */

        this.showMenu(ctx, module.toUpperCase(), info, keys)

        return menuLevel.NONE
    }

    getModules(building) {
        const bld = hdlBuilding.findBuilding(building)

        if (bld) {
            return bld.modules
        }

        return undefined
    }

    findModule(building, name) {
        for (const mod of this.getModules(building)) {
            if (mod.name == name) {
                return mod
            }
        }
        return undefined
    }
}

export const hdlModule = new ModuleHandler()
