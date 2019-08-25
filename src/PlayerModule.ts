class PlayerModule{
    get name():string{
        let name = localStorage.getItem("name");
        return name?name:"";
    }
    set name(name:string){
        localStorage.setItem("name",name);
    }
    get logged():boolean{
        let logged = localStorage.getItem("logged");
        return logged?true:false;
    }
    set logged(logged:boolean){
        if(logged){
            localStorage.setItem("logged","true");
        }
        else localStorage.removeItem("logged");
    }
    get inLobby():boolean{
        let inLobby = localStorage.getItem("inLobby");
        return inLobby?true:false;
    }
    set inLobby(inLobby:boolean){
        if(inLobby){
            localStorage.setItem("inLobby","true");
        }
        else localStorage.removeItem("inLobby");
    }
    get inGame():boolean{
        let inGame = localStorage.getItem("inGame");
        return inGame?true:false;
    }
    set inGame(inGame:boolean){
        if(inGame){
            localStorage.setItem("inGame","true");
        }
        else localStorage.removeItem("inGame");
    }
}

let playerModule = new PlayerModule();
export default playerModule;