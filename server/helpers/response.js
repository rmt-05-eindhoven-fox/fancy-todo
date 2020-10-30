class response {
    constructor(status,message,data){
        this.status = status
        this.message = message
        this.data = data
    }

    static onSuccess(message,data){
        return new response(true,message,data)
    }

    static onFailed(message,data){
        let failed = new response(false,message,null);
        delete failed["data"]
        return failed;
    }
}

module.exports = response