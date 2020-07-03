import axios from "axios";
import QS from "query-string";

axios.defaults.timeout = 5000;

const server = axios.create();

/**
 * 自定义请求库
 */
class Request {
    async _fetch(url: string, opts: any) {
        let res;
        try {
            opts.url = url;
            res = await server(opts);
        } catch (e) {
            console.warn("网络错误", e);
            throw new Error("网络连接失败，请检查网络权限");
        }
        return res;
    }
    async _request(url: string, opts: any) {
        if (url.indexOf("http") !== 0) url = "/api" + url;
        let res = await this._fetch(url, opts);
        this._checkStatus(res, url);
        let json = res.data;
        this._checkServerStatus(json);
        return json.data;
    }
    _checkStatus(resp: any, url: string) {
        if (resp.status !== 200) {
            throw new Error("网络连接失败，请检查网络");
        }
    }
    async _parseJSON(resp: any) {
        let json = {};
        try {
            const txt = resp.data;
            json = JSON.parse(txt);
        } catch (e) {
            console.warn("响应数据格式错误", e);
            throw new Error("连接失败，请重试");
        }
        return json;
    }
    _checkServerStatus(json: any) {
        if (json.code !== 1) {
            throw new Error(json.msg);
        }
    }
    getHeaders() {
        let headers: any = {};
        return headers;
    }

    async get(url: string, data: any = {}) {
        if (data) {
            url += "?" + QS.stringify(data);
        }
        return this._request(url, {
            method: "GET",
            credentials: "include",
            headers: this.getHeaders(),
        });
    }

    async post(url: string, data: any = {}) {
        return this._request(url, {
            method: "POST",
            credentials: "include",
            headers: this.getHeaders(),
            data: data,
        });
    }
}

export default new Request();
