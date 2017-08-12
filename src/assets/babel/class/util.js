/**
 * 便利関数クラス
 * @user fiwashita@j-cast.com
 */

export default class Util {

    /**
     * 初回
     */
    constructor() {
        //this.debug()
    }

    /**
     * デバイスタイプの取得
     * @return {string} デバイスタイプ
     */
    get device() {
        const userAgent = navigator.userAgent;
        var ua = "pc"
        if (userAgent.indexOf('iPhone') == -1
            && (userAgent.indexOf('Android') == -1 || userAgent.indexOf('Mobile') == -1) ) {
            ua = 'pc';
        } else {
            ua = 'sp';
        };
        return ua;
    }

    /**
     * インデックスかの判断
     * @return {boolean} 可否
     */
    get index() {
        const path = window.location.pathname;
        if (path.match(/^(\/www\/|\/)$/i)) {
            return true;
        }
        return false;
    }

    /**
     * エントリーかの判断
     * @return {boolean} 可否
     */
    get entry() {
        const path = window.location.pathname;
        if (path.match(/\d{6}\.html$/i)) {
            return true;
        }
        return false;
    }

    /**
     * URLパラメータからページ番号の取得
     * @return {number} ページ番号
     */
    get page() {
        const search = window.location.search;
        const match = search.match(/p=(\d+)/);
        if (match) {
            return match[1];
        }
        return 1;
    }

    /**
     * デバッグ
     * @return
     */
    debug() {
        const text = `hello ${this.device}!`;
        console.log(text);
        return;
    }

}
