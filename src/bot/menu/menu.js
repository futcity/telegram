/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

export class Menu {
    showMenu(ctx, header, text, keys) {
        ctx.replyWithHTML("<b>" + header + "</b>\n\n" + text, {
            reply_markup: {
                keyboard: 
                    keys
            }
        })
    }

    getStrValue(value, type) {
        let out = ""

        switch (type) {
            case "status":
                if (value == true)
                    out = "Работает"
                else
                    out = "Не работает"
                break

            case "state":
                if (value == true)
                    out = "Включен"
                else
                    out = "Отключен"
                break

            case "reed":
                if (value == true)
                    out = "Открыт"
                else
                    out = "Закрыт"
                break

            case "temp":
                out = value + "°"
                break

            default:
                out = value
                break
        }

        return out
    }

    process(user, ctx) {
    }
}
