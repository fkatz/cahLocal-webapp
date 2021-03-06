import io from 'socket.io-client';
const socketURL = "/";
class Broker {
    private socket: SocketIOClient.Socket;
    constructor() {
        this.socket = io(socketURL);
        this.socket.on("connect", () => {
            console.log("connected");
            this.emitter.dispatchEvent(
                new CustomEvent("connect", { detail: {} }));
        })
        this.socket.on("disconnect", () => {
            console.log("disconnected");
            this.socket.connect();
            this.emitter.dispatchEvent(
                new CustomEvent("connect", { detail: {} }));
        })
        this.socket.on("nameTaken",()=>{
            this.emitter.dispatchEvent(
                new CustomEvent("nameTaken", { detail: {} }));
        })

        this.socket.on("askChoosePlayer", (wCardsJSON: string) => this.emitter.dispatchEvent(
            new CustomEvent("askChoosePlayer", {
                detail: {
                    wCards: JSON.parse(wCardsJSON)
                }
            })
        ))
        this.socket.on("askGame", () => this.emitter.dispatchEvent(
            new CustomEvent("askGame", { detail: {} })
        ))
        this.socket.on("askName", () => this.emitter.dispatchEvent(
            new CustomEvent("askName", { detail: {} })
        ))
        this.socket.on("askStart", (startJSON: string) => this.emitter.dispatchEvent(
            new CustomEvent("askStart", {
                detail:
                    JSON.parse(startJSON)
            })
        ))
        this.socket.on("askSelect", (selectJSON: string) => {
            var select = JSON.parse(selectJSON);
            this.emitter.dispatchEvent(
                new CustomEvent("askSelect", {
                    detail: select
                }));
        });
        this.socket.on("lobbyNotFound",()=>{
            this.emitter.dispatchEvent(
                new CustomEvent("lobbyNotFound", { detail: {} }));
        })
        this.socket.on("askChoose", (chooseJSON: string) => {
            var choose = JSON.parse(chooseJSON);
            this.emitter.dispatchEvent(
                new CustomEvent("askChoose", {
                    detail: choose
                }));
        })
        this.socket.on("winner", (winnerJSON: string) => {
            this.emitter.dispatchEvent(
                new CustomEvent("winner", {
                    detail: JSON.parse(winnerJSON)
                }));
        })
    }
    public sendName(name: string) {
        this.socket.emit("newPlayer", { playerName: name });
    }
    public login(name: string) {
        this.socket.emit("login", { playerName: name });
    }
    public newGame(name: string, turns: number, cards: number, packs:string[]) {
        this.socket.emit("selectGame", {create:{ player: name, maxTurns: turns, maxCards: cards, packs:packs}});
    }
    public abortGame() {
        console.log("aborting game")
        this.socket.emit("abortGame");
    }
    public releaseName() {
        this.socket.emit("releaseName");
        console.log("released name")
    }
    public joinGame(name: string, host: string) {
        this.socket.emit("selectGame", {join:{ player: name, host: host }});
    }
    public start() {
        this.socket.emit("start");
    }
    public select(cards: string[]) {
        this.socket.emit("select", { wCards: cards });
    }
    public choose(winner: string) {
        this.socket.emit("choose", winner);
    }
    public nextTurn() {
        this.socket.emit("nextTurn");
    }
    public emitter: EventTarget = new EventTarget();
}

let broker = new Broker();
export default broker;