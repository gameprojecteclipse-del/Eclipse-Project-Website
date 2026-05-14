import { Howl } from "howler";

class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, Howl> = new Map();
  private ambience: Howl | null = null;
  private hasInteracted: boolean = false;

  private constructor() {
    this.sounds.set("click", new Howl({
      src: ["/assets/eclipse/audio/ui-click.mp3"],
      volume: 0.25,
    }));
    this.sounds.set("hover", new Howl({
      src: ["/assets/eclipse/audio/ui-hover.mp3"],
      volume: 0.1,
    }));
    
    this.ambience = new Howl({
      src: ["/assets/eclipse/audio/ambience.mp3"],
      loop: true,
      volume: 0,
    });

    // Listen for first interaction to unlock audio
    window.addEventListener('click', () => {
      this.hasInteracted = true;
    }, { once: true });
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playSound(name: string) {
    if (!this.hasInteracted) return;
    const sound = this.sounds.get(name);
    if (sound) sound.play();
  }

  public startAmbience() {
    if (!this.hasInteracted) return;
    if (this.ambience && !this.ambience.playing()) {
      this.ambience.play();
      this.ambience.fade(0, 0.2, 2000); 
    }
  }

  public stopAmbience() {
    if (this.ambience && this.ambience.playing()) {
      this.ambience.fade(this.ambience.volume(), 0, 1000);
      setTimeout(() => {
        if (this.ambience?.volume() === 0) this.ambience.stop();
      }, 1000);
    }
  }

  public forceStopAll() {
    if (this.ambience) {
      this.ambience.stop();
      this.ambience.volume(0);
    }
    this.sounds.forEach(s => s.stop());
  }
}

export const audioManager = AudioManager.getInstance();
