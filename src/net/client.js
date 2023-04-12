/*********************************************************************/
/*                                                                   */
/* Future City Telegram Bot                                          */
/*                                                                   */
/* Copyright (C) 2023 Denisov Smart Devices Limited                  */
/* License: GPLv3                                                    */
/* Written by Sergey Denisov aka LittleBuster (DenisovS21@gmail.com) */
/*                                                                   */
/*********************************************************************/

export class HttpClient {
    constructor(proto, ip, port, api) {
        this.proto = proto
        this.ip = ip
        this.port = port
        this.api = api
    }

    async getRequest(req, resp) {
        await fetch(this.proto + "://" + this.ip + ":" + this.port + "/api/v" + this.api + "/" + req)
            .then((response) => response.json())
            .then((result) => {
                resp(result)
            })
    }
}
