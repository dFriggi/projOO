class HomeTheater {
  tv: TV = new TV();
  sound: Sound = new Sound();
  light: Light = new Light();
  player: Player = new Player();
  runningNow: Sound | Player | null;

  constructor() {
    this.runningNow = null;
  }

  on() {
    this.tv.on();
    this.sound.on();
    this.light.on();
  }

  choosePlayer() {
    this.runningNow = this.player;
    this.tv.choosePlayer();
  }

  choosePlayerVideo(video: string) {
    this.runningNow === this.player
      ? this.player.chooseVideo(video)
      : console.log("You are in the wrong output!");
  }

  chooseMusic() {
    this.runningNow = this.sound;
    this.tv.chooseMusic();
  }

  chooseSongMusic(music: string) {
    this.runningNow === this.sound
      ? this.sound.chooseSong(music)
      : console.log("You are in the wrong output!");
  }

  play() {
    this.runningNow?.play();
  }

  stop() {
    this.runningNow?.stop();
  }

  volumeUp() {
    this.sound.liftVolume();
  }

  volumeDown() {
    this.sound.lowerVolume();
  }

  lightUp() {
    this.light.liftLevel();
  }

  lightDown() {
    this.light.lowerLevel();
  }

  changeLightColor(color: string) {
    this.light.changeColor(color);
  }

  offPlayer(): void {
    this.runningNow === this.player ? (this.runningNow = null) : null;
    this.player.off();
  }

  off() {
    this.runningNow = null;
    this.sound.off();
    this.light.off();
    this.tv.off();
  }
}

class TV {
  on(): void {
    console.log("TV on!");
  }

  choosePlayer(): void {
    console.log('Output "Player" was choosed!');
  }

  chooseMusic(): void {
    console.log('Output "Music" was choosed');
  }

  off() {
    console.log("TV off!");
  }
}

class Sound {
  volume: number;
  music: string | null;
  constructor() {
    this.volume = 3;
    this.music = null;
  }

  on(): void {
    console.log("Sound on!");
  }

  chooseSong(music: string) {
    this.music = music;
  }

  play() {
    console.log("Music is playing");
  }

  stop() {
    console.log("Music was stopped");
  }

  liftVolume() {
    this.volume++;
    this.showVolume();
  }

  lowerVolume() {
    this.volume--;
    this.showVolume();
  }

  showVolume() {
    console.log(this.volume);
  }

  off() {
    console.log("Sound off!");
  }
}

class Light {
  level: number;
  color: string;

  constructor() {
    this.level = 0;
    this.color = "white";
  }

  on() {
    console.log("Light on!");
    this.level = 10;
  }

  liftLevel() {
    this.level++;
    this.showLevel();
  }

  lowerLevel() {
    this.level--;
    this.showLevel();
  }

  showLevel() {
    console.log(this.level);
  }

  changeColor(color: string) {
    this.color = color;
    console.log("Light color was changed to ", this.showColor);
  }

  showColor() {
    console.log(this.color);
  }

  off() {
    console.log("Light off!");
  }
}

class Player {
  video: string;

  constructor() {
    this.video = "Nothing yet";
  }

  on() {
    console.log("Player on!");
  }

  chooseVideo(video: string) {
    this.video = video;
  }

  play() {
    console.log(this.video, " is running!");
  }

  stop() {
    console.log(this.video, " was stopped!");
  }

  off() {
    console.log("Player off!");
  }
}
