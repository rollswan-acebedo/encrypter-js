const rsBase64 = {  

    /**
     * String key
     */
    strKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /**
     * Encode request
     */
    encode: function (req) {
        var e, t, o, n, a, c, d, res = "", i = 0;
        for (req = rsBase64.utf8Encode(req); i < req.length;) e = req.charCodeAt(i++), t = req.charCodeAt(i++), o = req.charCodeAt(i++), n = e >> 2, a = (3 & e) << 4 | t >> 4, c = (15 & t) << 2 | o >> 6, d = 63 & o, isNaN(t) ? c = d = 64 : isNaN(o) && (d = 64), res = res + this.strKey.charAt(n) + this.strKey.charAt(a) + this.strKey.charAt(c) + this.strKey.charAt(d);
        return res
    },

    /**
     * Decode request
     */
    decode: function (req) {
        var e, t, o, n, a, c, d, res = "", i = 0;
        for (req = req.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < req.length;) n = this.strKey.indexOf(req.charAt(i++)), a = this.strKey.indexOf(req.charAt(i++)), c = this.strKey.indexOf(req.charAt(i++)), d = this.strKey.indexOf(req.charAt(i++)), e = n << 2 | a >> 4, t = (15 & a) << 4 | c >> 2, o = (3 & c) << 6 | d, res += String.fromCharCode(e), 64 != c && (res += String.fromCharCode(t)), 64 != d && (res += String.fromCharCode(o));
        return res = rsBase64.utf8Decode(res)
    },

    /**
     * Utf8 encode request
     */
    utf8Encode: function (req) {
        req = req.replace(/\r\n/g, "\n");
        for (var e = "", t = 0; t < req.length; t++) {
            var o = req.charCodeAt(t);
            128 > o ? e += String.fromCharCode(o) : o > 127 && 2048 > o ? (e += String.fromCharCode(o >> 6 | 192), e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224), e += String.fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128))
        }
        return e
    },

    /**
     * Utf8 decode request
     */
    utf8Decode: function (req) {
        for (var e = "", t = 0, o = 0, c1 = 0, c2 = 0; t < req.length;) o = req.charCodeAt(t), 128 > o ? (e += String.fromCharCode(o), t++) : o > 191 && 224 > o ? (c2 = req.charCodeAt(t + 1), e += String.fromCharCode((31 & o) << 6 | 63 & c2), t += 2) : (c2 = req.charCodeAt(t + 1), c3 = req.charCodeAt(t + 2), e += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), t += 3);
        return e
    }
}

module.exports = {

    /**
     * Encrypt string|object
     * 
     * @param string|object req
     */
    encrypt: function (req) {
        req = JSON.stringify(req).split("");
        for (var e = 0, t = req.length; t > e; e++) "{" == req[e] ? req[e] = "}" : "}" == req[e] && (req[e] = "{");
        var o = rsBase64.encode(req.join(""));
        return encodeURI(o)
    },
    
    /**
     * Decrypt string|object
     * 
     * @param string|object req 
     */
    decrypt: function (req) {
        req = rsBase64.decode(decodeURI(req.split(""))), req = req.split("");
        for (var e = 0, t = req.length; t > e; e++) "{" == req[e] ? req[e] = "}" : "}" == req[e] && (req[e] = "{");
        return JSON.parse(req.join(""))
    }
}
