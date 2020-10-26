class homeController{
    static homepage(request, response){
        response.send("Hello, this is homepage");
    }
}

module.exports = homeController;