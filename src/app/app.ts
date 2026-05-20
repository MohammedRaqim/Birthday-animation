import { Component, computed, signal } from '@angular/core';

type QuizOption = {
  id: string;
  label: string;
  emoji: string;
  whisper: string;
};

type QuizQuestion = {
  key: string;
  prompt: string;
  subline: string;
  options: QuizOption[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private reasonsTimer: ReturnType<typeof setInterval> | null = null;

  readonly recipient = 'Talbiya Umang';

  readonly cakeStep = computed(() => this.questions.length + 1);
  readonly reasonsStep = computed(() => this.questions.length + 2);
  readonly finaleStep = computed(() => this.questions.length + 3);

  readonly candles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${18 + i * 16}%`,
  }));

  readonly smokePuffs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${12 + (i * 11) % 76}%`,
    delay: `${i * 0.08}s`,
    size: `${0.85 + (i % 3) * 0.2}rem`,
  }));

  readonly loveReasons: string[] = [
    'The way your smile turns my ordinary minutes into something golden',
    'How kind you are — even when no one is watching',
    'Your patience with me on the days I am not my best self',
    'The softness in your voice when you say my name',
    'How you make distance feel smaller than it is',
    'Your laugh — loud, shy, or in-between — I want all of it',
    'The way you care about little things like they matter (because they do)',
    'How safe I feel when you are near, even in silence',
    'Your strength wrapped in gentleness — rare and beautiful',
    'The way you remember details about me',
    'How you make me want to be softer, braver, and better',
    'Your eyes — they hold stories I never get tired of reading',
    'The comfort of your presence, like a warm blanket for my heart',
    'How you turn hard days into something we can face together',
    'Your honesty — even when it is hard, especially when it is hard',
    'The way you celebrate small wins like they are fireworks',
    'How loving you still feels like the best plot twist of my life',
    'Your heart — generous, steady, and impossibly dear to me',
    'Simply because you are you — and that has always been enough',
  ];

  readonly candlesBlown = signal(false);
  readonly blowing = signal(false);
  readonly visibleReasonCount = signal(0);
  readonly reasonsDone = signal(false);

  readonly questions: QuizQuestion[] = [
    {
      key: 'first-meet',
      prompt: 'When we finally meet after our wedding inshallah… what are you doing first babyy? 🥺🤍',
      subline: 'Choose carefully missss future wifeeee.',
      options: [
        {
          id: 'meet-1',
          label: 'huggggg me tightlyyyyyy and never let go 🫂',
          emoji: '🤍',
          whisper: 'I already know I am not escaping that hug.'
        },
        {
          id: 'meet-2',
          label: 'kisssss me for wayyyy too long and make me blushhhhhh 🥰',
          emoji: '💋',
          whisper: 'okay but I am definitely blushing now.'
        },
        {
          id: 'meet-3',
          label: 'sit peacefully together and talk for hourssss 🌙💕',
          emoji: '🕯️',
          whisper: 'just us, soft voices, and finally no distance.'
        },
        {
          id: 'meet-4',
          label: 'all of this obviouslyyyy 🤌🥺💖',
          emoji: '✨',
          whisper: 'correct answer detected my future wife 🙈 I already know I am not missing that hugggs and kisses inshallah and "usss" finallyy without any distance inshallah 🤌🙈🥰'
        },
      ],
    },
    {
      key: 'wedding-excitement',
      prompt: 'How excited are you for our weddingggg inshallahhhh? 🥳🎉',
      subline: 'Babyyy no hiding your excitement allowed here.',
      options: [
        {
          id: 'wed-1',
          label: 'checking pinterest every 5 minutes level excited 🎀',
          emoji: '📌',
          whisper: 'our aesthetic is already dangerously cute.❣️'
        },
        {
          id: 'wed-2',
          label: 'kicking feet, smiling at the wall type excited 🤭',
          emoji: '🫶',
          whisper: 'you are soooo in love and I adore it alhamdulillah.💞'
        },
        {
          id: 'wed-3',
          label: 'SO excited that my heart cannot stay calm anymore 😭💖',
          emoji: '💍',
          whisper: 'Same here yaaaar. Marrying you feels unreal in the best way, inshallah sooooon babyyy 🥰🫂.'
        },
        {
          id: 'wed-4',
          label: 'counting days like it is my favorite festival 🗓️',
          emoji: '💫',
          whisper: 'every day gets us closer to forever inshallah.💓'
        },
      ],
    },
    {
      key: 'honeymoon',
      prompt: 'Okayyyy future wifeeee… where are we traveling after the wedding inshallah? ✈️🤍',
      subline: 'Pack your bags mentally alreadyyy.',
      options: [
        {
          id: 'trip-1',
          label: 'Europeee — pretty streets, cold weather, and matching outfits 🇪🇺 💞',
          emoji: '🗼',
          whisper: 'romantic walks with you in Europe sounds illegal levels of cute.'
        },
        {
          id: 'trip-2',
          label: 'Middle East vibes — luxury, deserts, and dreamy nights 🌙',
          emoji: '🏜️',
          whisper: 'you + golden nights + fancy dinners = perfect honeymoon energy.'
        },
        {
          id: 'trip-3',
          label: 'Americaaaa — road trips, skylines, and endless adventures 🇺🇸 💓',
          emoji: '🌆',
          whisper: 'imagine us singing loudly during late-night drives together.'
        },
        {
          id: 'trip-4',
          label: 'all over the world with my favorite person inshallah 🌍💖',
          emoji: '✨',
          whisper: 'Honestly, anywhere becomes magical if it is with you inshallah.🙈 We will definitely travel the whole world babyyyy inshallah 🥰🫂'
        },
      ],
    },
    {
      key: 'future-car',
      prompt: 'What do you think your husband is buying for us in the future inshallah? 🚗💙',
      subline: 'Choose wiselyyyy my princess 🥰',
      options: [
        {
          id: 'car-1',
          label: 'A black matte Defender obviouslyyy 🥰🖤',
          emoji: '🖤',
          whisper: 'matching black fits + black Defender = superbbb couple energy 🙈'
        },
        {
          id: 'car-2',
          label: 'A classy luxury car for cute long drives ✨',
          emoji: '🛣️',
          whisper: 'every drive feels better when you are beside me.'
        },
        {
          id: 'car-3',
          label: 'A sporty car because your husband is dramatic 😭',
          emoji: '🏎️',
          whisper: 'okay but imagine us speeding toward late-night chai dates.'
        },
        {
          id: 'car-4',
          label: 'A legendary Tata Nano 😂',
          emoji: '🚕',
          whisper: 'I know you dont like this and you wont choose it 😂'
        },
      ],
    },
  ];

  /** 0 intro, 1..N questions, N+1 cake, N+2 reasons, N+3 finale */
  readonly step = signal(0);
  readonly pick = signal<string | null>(null);
  readonly answers = signal<Record<string, string>>({});
  readonly lastWhisper = signal<string | null>(null);

  readonly questionIndex = computed(() => {
    const s = this.step();
    if (s < 1 || s > this.questions.length) {
      return -1;
    }
    return s - 1;
  });

  readonly currentQuestion = computed(() => {
    const i = this.questionIndex();
    return i >= 0 ? this.questions[i] : null;
  });

  readonly finaleWhispers = computed(() => {
    const map = this.answers();
    return this.questions.map((q) => map[q.key]).filter((w): w is string => Boolean(w));
  });

  readonly hearts = Array.from({ length: 170 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    delay: `${(i * 0.21) % 4.2}s`,
    dur: `${7 + (i % 5)}s`,
    size: `${0.65 + (i % 5) * 0.12}rem`,
    drift: `${-18 + (i % 7) * 6}px`,
  }));

  readonly sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${(i * 53) % 100}%`,
    top: `${(i * 71) % 100}%`,
    delay: `${(i * 0.13) % 2.4}s`,
    dur: `${1.8 + (i % 4) * 0.35}s`,
  }));

  readonly confetti = Array.from({ length: 46 }, (_, i) => ({
    id: i,
    left: `${(i * 67) % 100}%`,
    delay: `${(i * 0.07) % 1.8}s`,
    dur: `${2.4 + (i % 6) * 0.25}s`,
    hue: (i * 41) % 360,
    rot: -40 + (i % 9) * 10,
  }));

  startQuiz(): void {
    this.step.set(1);
    this.pick.set(null);
    this.lastWhisper.set(null);
  }

  selectOption(optionId: string): void {
    this.pick.set(optionId);
  }

  canContinue(): boolean {
    return Boolean(this.pick());
  }

  continueQuiz(): void {
    if (this.lastWhisper()) {
      this.step.update((s) => s + 1);
      this.pick.set(null);
      this.lastWhisper.set(null);
      return;
    }

    const q = this.currentQuestion();
    const chosen = this.pick();
    if (!q || !chosen) {
      return;
    }

    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) {
      return;
    }

    this.answers.update((m) => ({ ...m, [q.key]: opt.whisper }));
    this.lastWhisper.set(opt.whisper);
  }

  goBackQuiz(): void {
    if (this.step() <= 1) {
      this.step.set(0);
      this.pick.set(null);
      this.lastWhisper.set(null);
      return;
    }

    this.step.update((s) => s - 1);
    this.pick.set(null);
    this.lastWhisper.set(null);
  }

  blowCandles(): void {
    if (this.candlesBlown() || this.blowing()) {
      return;
    }
    this.blowing.set(true);
    window.setTimeout(() => {
      this.candlesBlown.set(true);
      this.blowing.set(false);
    }, 720);
  }

  goToReasons(): void {
    this.step.set(this.reasonsStep());
    this.startReasonsReveal();
  }

  goToFinale(): void {
    this.step.set(this.finaleStep());
  }

  private startReasonsReveal(): void {
    this.clearReasonsTimer();
    this.visibleReasonCount.set(0);
    this.reasonsDone.set(false);

    let shown = 0;
    const revealNext = (): void => {
      shown += 1;
      this.visibleReasonCount.set(shown);
      if (shown >= this.loveReasons.length) {
        this.reasonsDone.set(true);
        this.clearReasonsTimer();
      }
    };

    revealNext();
    this.reasonsTimer = setInterval(revealNext, 520);
  }

  private clearReasonsTimer(): void {
    if (this.reasonsTimer !== null) {
      clearInterval(this.reasonsTimer);
      this.reasonsTimer = null;
    }
  }

  restart(): void {
    this.clearReasonsTimer();
    this.step.set(0);
    this.pick.set(null);
    this.answers.set({});
    this.lastWhisper.set(null);
    this.candlesBlown.set(false);
    this.blowing.set(false);
    this.visibleReasonCount.set(0);
    this.reasonsDone.set(false);
  }
}
