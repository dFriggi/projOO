class Config {
    private constructor(){}

    private static instance: Config

    public static getInstance(): Config {
        if (this.instance === null) this.instance = new Config()
            
        return this.instance
    }

    private appName: string = "Notification Factory"
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

interface Notification {
    sendMessage(): void
}

class Email implements Notification {
    private message: string
    private server: string

    constructor (message:string, server:string) {
        this.message = message
        this.server = server
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by email using server ${this.server}`)
    }
}

class SMS implements Notification {
    private message: string
    private server: string

    constructor (message:string, server:string) {
        this.message = message
        this.server = server
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by sms using number ${this.server}`)
    }
}

class PushNotification implements Notification {
    private message: string
    private server: string

    constructor (message:string, server:string) {
        this.message = message
        this.server = server
    }

    sendMessage(): void {
        console.log(`${this.message} was sent by push notification using server ${this.server}`)
    }
}

class NotificationFactory {
    public static createNotification(type: string, msg: string, config: string): Notification {
        if (type === "email") return new Email(msg, config)
        if (type === "sms") return new SMS(msg, config)
        if (type === "push") return new PushNotification(msg, config)
    }
}

const config = Config.getInstance()
config.setServer("smtp.example.com")
const emailNotification = NotificationFactory.createNotification("email", "Hello, World!", config.getServer())
emailNotification.sendMessage()