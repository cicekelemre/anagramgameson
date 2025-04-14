export class ConfigService {
    private static instance: ConfigService;
    private gameDataUrl: string;
    private settingsUrl: string;

    private constructor() {
        // Yerel dosyaları kullan
        this.gameDataUrl = 'questions.json';
        this.settingsUrl = 'settings.json';
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public async loadSettings(): Promise<any> {
        try {
            const response = await fetch(this.settingsUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Settings yüklenirken hata:', error);
            // Varsayılan ayarlar
            return {
                data: {
                    font: 'Arial',
                    timer: { initialTime: 120, isCountDown: true },
                    shuffleQuestions: true,
                    UIComponentsColor: 'white',
                    answersTextColor: 'white',
                    questionsTextColor: 'white'
                }
            };
        }
    }

    public async loadQuestions(): Promise<any> {
        try {
            const response = await fetch(this.gameDataUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Oyun verileri yüklenirken hata:', error);
            // Varsayılan anagramlar
            return {
                list: [
                    {
                        scrambledWord: "LMEPA",
                        correctWord: "APPLE",
                        hint: "A fruit that keeps the doctor away"
                    },
                    {
                        scrambledWord: "NBAANA",
                        correctWord: "BANANA",
                        hint: "Yellow curved fruit"
                    }
                ]
            };
        }
    }
}
