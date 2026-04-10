class Config {
    private constructor(){}

    private static instance: Config | null = null

    public static getInstance(): Config {
        if (this.instance === null) this.instance = new Config()
            
        return this.instance
    }

    private appName: string = "Notfication Factory"
    private maxRetries: number = 3
    private server: string = "server padrão"

    setServer(server:string ): void {
        this.server = server
    }
    setRetries(retries:number ): void {
        this.maxRetries = retries
    }
    setName(name:string ): void {
        this.appName = name
    }
    getServer(): string {
        return this.server
    }
    getRetries(): number {
        return this.maxRetries
    }
    getAppName(): string {
        return this.appName
    }
}

interface Notfication {
    sendMessage(): void
    getConfig(): Config
}

class NotficationProxy implements Notfication {
    private notification: Notfication
    private numRetries: number = 0
    private config: Config
    constructor (notification: Notfication, config: Config) {
        this.notification = notification
        this.config = config
    }

    getConfig(): Config {
        return this.config
    }

    sendMessage(): void {
        console.log(`Logging: Sending ${this.notification} notification`)
        if(this.numRetries < this.getConfig().getRetries()){
            this.notification.sendMessage()
            this.numRetries++
        } else {
            throw new Error(`You already sent ${this.numRetries} messages.`)
        }
    }


}

class WhatsappAdaptor implements Notfication {
    private whatsapp: WhatsApp
    private config: Config
    constructor (whatsapp: WhatsApp, config: Config) {
        this.whatsapp = whatsapp
        this.config = config
    }

    getConfig(): Config {
        return this.config
    }

    public sendMessage(): void {
        this.whatsapp.sendWhatsAppMessage()
    }
}

class WhatsApp {
    private message: string
    constructor(message: string){
        this.message = message
    }

    sendWhatsAppMessage(): void {
        console.log(`${this.message} was sent by WhatsApp`)
    }
}

class Email implements Notfication {
    private message: string
    private config: Config

    constructor (message: string, config: Config) {
        this.message = message
        this.config = config
    }

    getConfig(): Config {
        return this.config
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by email using config ${this.config.getServer()}`)
    }
}

class SMS implements Notfication {
    private message: string
    config: Config

    constructor (message:string, config:Config) {
        this.message = message
        this.config = config   
    }

    getConfig(): Config {
        return this.config
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by sms using number ${this.config.getServer()}`)
    }
}

class PushNotification implements Notfication {
    private message: string
    config: Config

    constructor (message:string, config:Config) {
        this.message = message
        this.config = config
    }
    
    getConfig(): Config {
        return this.config
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by push notification using server ${this.config.getServer()}`)
    }
}

class NotificationFactory {
    public static createNotification(type: string, msg: string, config: Config): Notfication {
        switch(type) {
            case "email":
                return new NotficationProxy(new Email(msg, config), config)
            case "sms":
                return new NotficationProxy(new SMS(msg, config), config)
            case "push":
                return new NotficationProxy(new PushNotification(msg, config), config)
            case "whatsapp":
                return new NotficationProxy( new WhatsappAdaptor(new WhatsApp(msg), config), config)
            default:
                throw new Error(`Tipo de notificação inválido: ${type}`)
        }
    }
}

const config = Config.getInstance()
config.setServer("smtp.example.com")
const emailNotification = NotificationFactory.createNotification("email", "Hello, World!", config)
emailNotification.sendMessage()