/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

import { log, logMod } from "./utils/log.js"
import { cfg } from "./utils/configs.js"
import { tgBot } from "./bot/tgbot.js"

function main() {
    log.setPath("./log/")

    if (!cfg.load("./configs/tgbot.json")) {
        log.error(logMod.INDEX, "Failed to load configs")
        return
    }
    log.info(logMod.INDEX, "Configs loading complete")

    log.info(logMod.INDEX, "Starting Telegram bot ...")
    tgBot.start()
}

main()
