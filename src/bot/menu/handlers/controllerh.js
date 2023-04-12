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
import { HttpClient } from "../../../net/client.js"
import { log, logMod } from "../../../utils/log.js"

class ControllerHandler extends Menu {
    async process(user, ctx) {
        const server = tgLevel.getData(user, "server")
        const building = tgLevel.getData(user, "building")
        const module = tgLevel.getData(user, "module")

        const client = new HttpClient(server.proto, server.ip, server.port, server.api)
        const controller = this.findController(building, module, tgLevel.getData(user, "controller"))

        /*
         * Control of devices
         */

        for (const row of controller.buttons) {
            for (const button of row) {
                if (ctx.message.text == button.name && ctx.message.text != "Обновить") {
                    await client.getRequest(button.url, (resp) => {
                        if (!resp.result) {
                            log.error(logMod.CTRL_HANDLER, "Failed to get request")
                        }
                    })
                }
            }
        }

        /*
         * Configure info
         */

        let info = ""
        await client.getRequest(controller.info.url, (resp) => {
            for (const field of controller.info.fields) {
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

        /*
         * Configure buttons
         */

        let keys = []
        for (const row of controller.buttons) {
            let cols = []
            for (const col of row) {
                cols.push(col.name)
            }
            keys.push(cols)
        }

        this.showMenu(ctx, controller.name.toUpperCase(), info, keys)

        return menuLevel.NONE
    }

    getControllers(building, module) {
        const mod = hdlModule.findModule(building, module)

        if (mod) {
            return mod.controllers
        }

        return undefined
    }

    findController(building, module, name) {
        for (const ctrl of this.getControllers(building, module)) {
            if (ctrl.name == name) {
                return ctrl
            }
        }
        return undefined
    }
}

export const hdlController = new ControllerHandler()
