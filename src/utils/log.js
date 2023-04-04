/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

import colors from "colors"
import moment from "moment"
import { appendFile } from "fs"

export const logMod = {
    INDEX:          "INDEX",
    TGBOT:          "TGBOT",
    CONFIGS:        "CONFIGS",
    CTRL_HANDLER:   "CTRL_HANDLER"
}

const logType = {
    INFO: 0,
    WARN: 1,
    ERROR: 2
}

class Log {
    #path = "./"

    info(mod, msg) {
        this.#logging(mod, msg, logType.INFO)
        this.#saveToFile(mod, logType.INFO, msg)
    }

    warning(mod, msg) {
        this.#logging(mod, msg, logType.WARN)
        this.#saveToFile(mod, logType.WARN, msg)
    }

    error(mod, msg) {
        this.#logging(mod, msg, logType.ERROR)
        this.#saveToFile(mod, logType.ERROR, msg)
    }

    setPath(path) {
        this.#path = path
    }

    #logging(module, msg, type) {
        let dateStr = moment().format('YYYY-MM-DD')
        let timeStr = moment().format('HH:MM:SS')
        let outStr = "[" + dateStr.blue + "][" + timeStr.cyan + "]["
    
        switch (type) {
            case logType.INFO:
                outStr += "INFO".green
                break
    
            case logType.WARN:
                outStr += "WARN".yellow
                break
    
            case logType.ERROR:
                outStr += "ERROR".red
                break
        }
    
        outStr += "][" + module.magenta + "] "
    
        console.log(outStr + msg)
    }
    
    #saveToFile(module, type, msg) {
        let dateStr = moment().format('YYYY-MM-DD')
        let timeStr = moment().format('HH:MM:SS')
        let outStr = "[" + dateStr + "][" + timeStr + "]["
    
        switch (type) {
            case logType.INFO:
                outStr += "INFO"
                break
    
            case logType.WARN:
                outStr += "WARN"
                break
    
            case logType.ERROR:
                outStr += "ERROR"
                break
        }
    
        outStr += "][" + module + "] "
        let fileName = moment().format('YYYYMMDD') + ".log"
    
        appendFile(this.#path + fileName, outStr + msg + "\n", (e) => {
            if (e) {
                this.#logging(logMod.LOG, logType.ERROR, "Fail to write to log file: " + e.message)
                return
            }
        })
    }
}

export const log = new Log()
