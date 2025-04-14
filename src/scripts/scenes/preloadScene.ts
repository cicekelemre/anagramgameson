import Configs from '../statics/configs';

export default class PreloadScene extends Phaser.Scene {
    private _theme: string

    constructor(theme: string) {
        super({ key: 'PreloadScene' });
        this._theme = theme;
    }

    public preload(): void {
        // Doğrudan temel assetleri yükle - uzak URL'leri kullanma
        this.load.image('background', 'assets/background.png');
        
        // Ses dosyaları
        this.load.audio('backgroundMusic', 'assets/sounds/background.mp3');
        this.load.audio('clickSound', 'assets/sounds/click.mp3');
        this.load.audio('successSound', 'assets/sounds/success.mp3');
        this.load.audio('failSound', 'assets/sounds/fail.mp3');
        this.load.audio('gameRestartSound', 'assets/sounds/restart.mp3');
        
        // UI bileşenleri için görüntüler
        this.load.image('fullscreen-white', 'assets/ui/fullscreen-white.png');
        this.load.image('fullscreen-black', 'assets/ui/fullscreen-black.png');
        this.load.image('sound-enabled', 'assets/ui/sound-on.png');
        this.load.image('sound-disabled', 'assets/ui/sound-off.png');
        this.load.image('restart', 'assets/ui/restart.png');

        // Font yüklemeye gerek yok, sistem fontlarını kullanacağız
        
        this.load.html('finishDialog', 'assets/partials/finishDialog.html');

        this.load.on('complete', this.complete, this);
    }

    public complete(): void {
        document.getElementById('loader')?.remove();
        this.scene.start('StartScene');
        window.dispatchEvent(new Event('resize'));
    }
}
