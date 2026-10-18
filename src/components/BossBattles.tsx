import React, { useState } from 'react';
import { 
  Swords, 
  ShieldAlert, 
  Trophy, 
  Volume2, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DialogueOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
  cultureTip?: string;
  patienceDelta: number; // e.g. +20 or -25
  bossReply: string;
}

interface DialogueNode {
  id: number;
  npcText: string;
  npcGermanHint?: string;
  options: DialogueOption[];
}

interface BossMission {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1';
  location: string;
  bossName: string;
  bossRole: string;
  bossAvatar: string;
  playerAvatar: string;
  initialPatience: number;
  description: string;
  culturalBackground: string;
  dialogues: DialogueNode[];
  completionRewardXP: number;
}

const MISSIONS: BossMission[] = [
  {
    id: 'baeckerei',
    title: 'The Sunday Morning Bäckerei',
    level: 'A1',
    location: 'Berlin-Kreuzberg Bakery',
    bossName: 'Frau Becker',
    bossRole: 'No-Nonsense Master Baker',
    bossAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=FrauBecker&backgroundColor=b6e3f4',
    playerAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=AdventurerHans&backgroundColor=ffdfbf',
    initialPatience: 80,
    description: 'Survive the line of 15 impatient Germans on Sunday morning. Order your Brötchen politely using the Konjunktiv II, pick your pastry, and navigate the dreaded German cash-only checkout!',
    culturalBackground: 'Germans cherish Sunday bakeries. Always greet with "Guten Morgen" or "Hallo", order using "Ich hätte gern...", and always ask if card payment is possible ("Geht mit Karte?") before tapping!',
    completionRewardXP: 150,
    dialogues: [
      {
        id: 0,
        npcText: 'Der Nächste bitte! Guten Morgen. Was darf es denn sein?',
        npcGermanHint: '"Next please! Good morning. What can I get for you?"',
        options: [
          {
            text: 'Ich will drei Brötchen!',
            isCorrect: false,
            patienceDelta: -25,
            explanation: 'Too aggressive! "Ich will" sounds blunt and rude like a demanding child. Always use polite subjunctive "Ich hätte gern..." or "Ich möchte...".',
            cultureTip: 'In German shops, polite modals soften transactions.',
            bossReply: 'Na hören Sie mal, ein "Guten Morgen" und ein "Bitte" schaden nie... Also, drei normale Brötchen?'
          },
          {
            text: 'Guten Morgen! Ich hätte gern zwei normale Schrippen und ein Croissant, bitte.',
            isCorrect: true,
            patienceDelta: +15,
            explanation: 'Perfekt! "Guten Morgen" + "Ich hätte gern" (I would like to have) is the gold standard for polite German ordering.',
            cultureTip: 'In Berlin, bread rolls are called "Schrippen", in Bavaria "Semmeln", and everywhere else "Brötchen"!',
            bossReply: 'Sehr gerne, zwei Schrippen und ein Buttercroissant. Darf es sonst noch etwas sein?'
          },
          {
            text: 'Geben Sie mir Brot jetzt!',
            isCorrect: false,
            patienceDelta: -30,
            explanation: 'Imperative command! Unless it is an emergency, do not bark orders at bakery staff.',
            cultureTip: 'Always start with a greeting and soften requests.',
            bossReply: 'Immer mit der Ruhe! Was für ein Brot denn überhaupt?'
          }
        ]
      },
      {
        id: 1,
        npcText: 'Darf es sonst noch etwas sein? Ein Stück Kuchen für den Nachmittag vielleicht?',
        npcGermanHint: '"Can it be anything else? A slice of cake for the afternoon perhaps?"',
        options: [
          {
            text: 'Nein danke, das ist alles. Was kostet das zusammen?',
            isCorrect: true,
            patienceDelta: +15,
            explanation: 'Polite and clear. "Das ist alles" (That is all) wraps up the order neatly before asking the price.',
            cultureTip: 'Saying "Das wär’s, danke!" is also extremely common.',
            bossReply: 'Das macht dann 4 Euro 30 bitte.'
          },
          {
            text: 'Ich habe kein Hunger mehr, Tschüss.',
            isCorrect: false,
            patienceDelta: -20,
            explanation: 'Grammar error: It should be "keinen Hunger" (Accusative masculine). Plus, you haven\'t paid yet!',
            bossReply: 'Halt, erst bezahlen bitte! Das macht 4 Euro 30.'
          }
        ]
      },
      {
        id: 2,
        npcText: 'Das macht 4 Euro 30 bitte.',
        npcGermanHint: '"That makes 4 Euros 30 please."',
        options: [
          {
            text: 'Hier sind 5 Euro. Stimmt so!',
            isCorrect: true,
            patienceDelta: +20,
            explanation: 'Flawless! "Stimmt so!" is the idiomatic German way to say "Keep the change" (4.30 -> 5.00 is a generous 70c tip).',
            cultureTip: 'Germans say "Stimmt so!" instead of taking small coins back.',
            bossReply: 'Oh, vielen herzlichen Dank! Einen schönen Sonntag wünsche ich Ihnen!'
          },
          {
            text: 'Kann ich mit Kreditkarte zahlen für 4 Euro 30?',
            isCorrect: false,
            patienceDelta: -15,
            explanation: 'Cultural trap! While cards are accepted more now, card minimums (Kartenzahlung erst ab 10€) or EC-only rules still catch people.',
            cultureTip: 'Always carry some Bargeld (cash) to traditional German bakeries.',
            bossReply: 'Erst ab 10 Euro, mein Lieber! Nur Bargeld heute.'
          }
        ]
      }
    ]
  },
  {
    id: 'paketbote',
    title: 'The Paketbote Dilemma',
    level: 'A1',
    location: 'Altbau Stairwell (4th Floor)',
    bossName: 'Murat (DHL Bote)',
    bossRole: 'Rushing Courier Hero',
    bossAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=MuratDHL&backgroundColor=ffc533',
    playerAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=AdventurerHans&backgroundColor=ffdfbf',
    initialPatience: 75,
    description: 'The doorbell buzzes frantically. The delivery courier has 80 parcels left to deliver today. Can you understand which neighbor the parcel is for and sign correctly?',
    culturalBackground: 'Accepting parcels for neighbors ("Pakete für Nachbarn annehmen") is an unwritten community obligation in German apartment buildings (Mietshäuser).',
    completionRewardXP: 175,
    dialogues: [
      {
        id: 0,
        npcText: 'Hallo! Paket für Müller im 3. Stock links! Können Sie das annehmen? Der ist nicht da!',
        npcGermanHint: '"Hello! Package for Müller on 3rd floor left! Can you accept it? He is not there!"',
        options: [
          {
            text: 'Ja klar, gerne! Ich nehme das Paket für Herrn Müller.',
            isCorrect: true,
            patienceDelta: +20,
            explanation: 'Super! Friendly and confirms the neighbor\'s name clearly so the driver can put a slip in Müller\'s mailbox.',
            cultureTip: 'The delivery driver leaves a yellow card ("Benachrichtigungskarte") saying where the package is.',
            bossReply: 'Super, danke! Einmal hier auf dem Display unterschreiben bitte.'
          },
          {
            text: 'Wer ist Müller? Kenne ich nicht.',
            isCorrect: false,
            patienceDelta: -25,
            explanation: 'Unfriendly. Even if you don\'t know them personally, neighbors typically sign for each other in Germany.',
            bossReply: 'Na der Nachbar unter Ihnen! Schauen Sie mal aufs Klingelschild...'
          }
        ]
      },
      {
        id: 1,
        npcText: 'Super, vielen Dank! Ich werfe ihm einen Zettel in den Briefkasten. Schönen Tag noch!',
        npcGermanHint: '"Awesome, thanks a lot! I will throw a slip into his mailbox. Have a nice day!"',
        options: [
          {
            text: 'Danke, Ihnen auch einen schönen Feierabend später!',
            isCorrect: true,
            patienceDelta: +25,
            explanation: '"Ihnen auch" (To you as well) is the polite Dative form for responding to wishes.',
            cultureTip: 'German delivery workers work hard; wishing them a good "Feierabend" (end of work day) makes their day.',
            bossReply: 'Danke dir! Tschüss!'
          },
          {
            text: 'Geben Sie mir Geld dafür!',
            isCorrect: false,
            patienceDelta: -40,
            explanation: 'Demanding payment for holding a package for a neighbor is very socially awkward in Germany!',
            bossReply: 'Was? Nein! Tschüss...'
          }
        ]
      }
    ]
  },
  {
    id: 'wg-casting',
    title: 'The WG-Casting Interview',
    level: 'A2',
    location: 'Shared Flat in Munich (Schwabing)',
    bossName: 'Lukas & Sarah',
    bossRole: 'Prospective WG Flatmates',
    bossAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=LukasSarah&backgroundColor=d1d5db',
    playerAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=AdventurerHans&backgroundColor=ffdfbf',
    initialPatience: 80,
    description: 'Out of 200 applicants on WG-Gesucht, you scored an interview! Impress the flatmates by describing yourself, discussing chores (Putzplan), and understanding Warmmiete vs. Kaltmiete.',
    culturalBackground: 'A German WG-Casting is part interview, part social hangout. They want to know you are clean, respectful of quiet hours (Ruhezeiten), and can pay rent reliably.',
    completionRewardXP: 220,
    dialogues: [
      {
        id: 0,
        npcText: 'Hey! Schön, dass du da bist. Magst du einen Kaffee? Erzähl mal ein bisschen über dich!',
        npcGermanHint: '"Hey! Nice that you are here. Would you like a coffee? Tell us a bit about yourself!"',
        options: [
          {
            text: 'Gerne Kaffee, danke! Ich bin Student, koche gern und bin ordentlich.',
            isCorrect: true,
            patienceDelta: +20,
            explanation: 'Short, friendly, and addresses the two things flatmates care about most: good food and being tidy ("ordentlich").',
            cultureTip: 'Mentioning your daily routine shows you are predictable and pleasant to live with.',
            bossReply: 'Klingt super! Wie stehst du denn zum Thema Putzplan?'
          },
          {
            text: 'Ich mache jeden Tag bis 4 Uhr morgens laut Techno-Musik.',
            isCorrect: false,
            patienceDelta: -50,
            explanation: 'Instant rejection! Quiet hours (Nachtruhe ab 22 Uhr) are sacred in Germany.',
            bossReply: 'Ähm... unsere Nachbarn rufen leider direkt die Polizei bei Lärm nach 22 Uhr...'
          }
        ]
      },
      {
        id: 1,
        npcText: 'Wie stehst du zum Thema Putzplan? Bei uns putzt jeder einmal pro Woche.',
        npcGermanHint: '"How do you feel about the cleaning schedule? Here everyone cleans once a week."',
        options: [
          {
            text: 'Kein Problem! Ein sauberer Putzplan ist mir auch wichtig.',
            isCorrect: true,
            patienceDelta: +20,
            explanation: 'Music to German ears! The "Putzplan" is the foundation of peace in any German shared flat.',
            cultureTip: 'A rotational cleaning plan usually hangs on the fridge.',
            bossReply: 'Perfekt. Hast du noch Fragen zu den Kosten oder dem Einzugsdatum?'
          },
          {
            text: 'Ich hasse Putzen, aber meine Mutter kann sonntags kommen.',
            isCorrect: false,
            patienceDelta: -30,
            explanation: 'Big red flag! WG roommates expect independent adults who take care of their own chores.',
            bossReply: 'Haha, das meinen Sie hoffentlich als Scherz...'
          }
        ]
      },
      {
        id: 2,
        npcText: 'Hast du noch Fragen zur Miete oder der Kaution?',
        npcGermanHint: '"Do you have questions about the rent or the security deposit?"',
        options: [
          {
            text: 'Ist das die Warmmiete inklusive Nebenkosten und Internet?',
            isCorrect: true,
            patienceDelta: +20,
            explanation: 'Crucial distinction! "Warmmiete" includes heating, water, and building fees, whereas "Kaltmiete" is just the base room.',
            cultureTip: 'Always check if electricity (Strom) and GEZ broadcast fee (Rundfunkbeitrag) are included in the Warmmiete.',
            bossReply: 'Ja genau, die 580€ sind all-inclusive warm! Wir melden uns bis morgen bei dir!'
          },
          {
            text: 'Was bedeutet Kaution? Muss ich das wirklich zahlen?',
            isCorrect: false,
            patienceDelta: -20,
            explanation: 'The "Kaution" (security deposit) is mandatory by law in Germany (usually 2 to 3 months of Kaltmiete).',
            bossReply: 'Die Kaution (3 Monatsmieten) ist leider gesetzliche Pflicht zur Sicherheit des Vermieters.'
          }
        ]
      }
    ]
  },
  {
    id: 'buergeramt',
    title: 'Surviving the Bürgeramt (Anmeldung)',
    level: 'B1',
    location: 'Bürgeramt Mitte (Berlin)',
    bossName: 'Herr Schmidt',
    bossRole: 'Sachbearbeiter (Senior Civil Servant)',
    bossAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=HerrSchmidt&backgroundColor=c0aede',
    playerAvatar: 'https://api.dicebear.com/7.x/micah/svg?seed=AdventurerHans&backgroundColor=ffdfbf',
    initialPatience: 65,
    description: 'The ultimate boss of life in Germany: Registering your apartment (Anmeldung). Bureaucracy, formal "Sie", Wohnungsgeberbestätigung, and strict German paperwork regulations!',
    culturalBackground: 'You legally have 14 days after moving in to register at the Bürgeramt. You must bring your passport and the landlord confirmation ("Wohnungsgeberbestätigung").',
    completionRewardXP: 300,
    dialogues: [
      {
        id: 0,
        npcText: 'Guten Tag. Wartenummer 214? Sie sind 3 Minuten zu spät. Was ist Ihr Anliegen?',
        npcGermanHint: '"Good day. Waiting number 214? You are 3 minutes late. What is your concern?"',
        options: [
          {
            text: 'Guten Tag! Entschuldigen Sie bitte die Verspätung. Ich möchte mich anmelden.',
            isCorrect: true,
            patienceDelta: +15,
            explanation: 'Polite apology for tardiness + clear statement with "Ich möchte mich anmelden" (reflexive verb).',
            cultureTip: 'Punctuality ("Pünktlichkeit") is valued heavily at German administrative offices.',
            bossReply: 'Gut. Haben Sie Ihren Pass und die Wohnungsgeberbestätigung dabei?'
          },
          {
            text: 'Hallo Schmidt, ich wohne jetzt hier in Berlin!',
            isCorrect: false,
            patienceDelta: -30,
            explanation: 'Disaster! Never address a German official by first name or without "Herr/Frau". Use formal "Sie".',
            cultureTip: 'Always use "Herr Schmidt" and polite formal register ("Sie / Ihnen").',
            bossReply: 'Für Sie immer noch HERR Schmidt! Und wir duzen uns hier nicht!'
          }
        ]
      },
      {
        id: 1,
        npcText: 'Haben Sie Ihren Pass und das ausgefüllte Formular des Vermieters?',
        npcGermanHint: '"Do you have your passport and the filled-out landlord form?"',
        options: [
          {
            text: 'Ja, hier ist mein Reisepass und die Wohnungsgeberbestätigung im Original.',
            isCorrect: true,
            patienceDelta: +25,
            explanation: 'Golden answer! German authorities insist on original documents ("im Original") signed by the landlord.',
            cultureTip: 'Without the Wohnungsgeberbestätigung, your registration will be immediately rejected.',
            bossReply: 'Sehr vorbildlich. Ich trage Ihre Daten in das Melderegister ein... Gehören Sie einer Kirche an?'
          },
          {
            text: 'Mein Vermieter hat mir nur eine kurze WhatsApp-Nachricht geschickt.',
            isCorrect: false,
            patienceDelta: -35,
            explanation: 'WhatsApp is not a valid legal document in German administrative law! It must be the official signed form.',
            bossReply: 'Eine WhatsApp? Wir sind hier auf einem Amt! Ohne offizielle Bestätigung kann ich nichts machen!'
          }
        ]
      },
      {
        id: 2,
        npcText: 'Gehören Sie einer Religionsgemeinschaft an? Das ist relevant für die Kirchensteuer.',
        npcGermanHint: '"Do you belong to a religious community? That is relevant for church tax."',
        options: [
          {
            text: 'Nein, ich gehöre keiner Kirche an (konfessionslos).',
            isCorrect: true,
            patienceDelta: +20,
            explanation: '"Konfessionslos" (no religious affiliation) means no 8-9% church income tax will be deducted.',
            cultureTip: 'German church tax (Kirchensteuer) is collected automatically through payroll unless registered as konfessionslos.',
            bossReply: 'Verstanden. Hier ist Ihre offizielle Meldebestätigung. Willkommen in Deutschland!'
          },
          {
            text: 'Was hat der Staat mit meinem Glauben zu tun?!',
            isCorrect: false,
            patienceDelta: -20,
            explanation: 'While surprising for foreigners, Germany\'s tax office legally collects church tax for major denominations.',
            bossReply: 'Das steht so im Einkommensteuergesetz. Also, ja oder nein?'
          }
        ]
      }
    ]
  }
];

export const BossBattles: React.FC = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(MISSIONS[0].id);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(0);
  const [patience, setPatience] = useState<number>(MISSIONS[0].initialPatience);
  const [history, setHistory] = useState<{ role: 'npc' | 'player'; text: string; explanation?: string; isCorrect?: boolean }[]>([]);
  const [missionCompleted, setMissionCompleted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<{ text: string; isCorrect: boolean; tip?: string } | null>(null);

  const mission = MISSIONS.find(m => m.id === selectedMissionId) || MISSIONS[0];
  const currentNode = mission.dialogues[currentNodeIndex];

  const resetMission = (m: BossMission) => {
    setSelectedMissionId(m.id);
    setCurrentNodeIndex(0);
    setPatience(m.initialPatience);
    setHistory([
      { role: 'npc', text: m.dialogues[0].npcText }
    ]);
    setMissionCompleted(false);
    setGameOver(false);
    setLastFeedback(null);
  };

  // Initial load
  React.useEffect(() => {
    resetMission(mission);
  }, [selectedMissionId]);

  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSelectOption = (option: DialogueOption) => {
    sounds.playClick();
    const newPatience = Math.min(100, Math.max(0, patience + option.patienceDelta));
    setPatience(newPatience);

    setLastFeedback({
      text: option.explanation,
      isCorrect: option.isCorrect,
      tip: option.cultureTip
    });

    if (option.isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    // Add player answer to history
    const updatedHistory = [
      ...history,
      { role: 'player' as const, text: option.text, isCorrect: option.isCorrect, explanation: option.explanation }
    ];

    if (newPatience <= 0) {
      setGameOver(true);
      setHistory(updatedHistory);
      return;
    }

    // If there is an NPC reply
    if (option.bossReply) {
      updatedHistory.push({
        role: 'npc' as const,
        text: option.bossReply
      });
    }

    setHistory(updatedHistory);

    // Advance to next dialogue or win
    if (currentNodeIndex + 1 < mission.dialogues.length) {
      const nextIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextIndex);
      // Also speak the next NPC utterance
      setTimeout(() => {
        speakGerman(mission.dialogues[nextIndex].npcText);
      }, 400);
    } else {
      // Completed!
      sounds.playLevelUp();
      setMissionCompleted(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 md:p-8 text-white shadow-xl shadow-rose-600/20">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-3">
            <Swords className="w-4 h-4 text-amber-200" />
            RPG Dialogue Simulator
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
            Real-Life Germany Boss Battles
          </h1>
          <p className="mt-2 text-white/90 text-sm md:text-base font-body max-w-2xl">
            Test your real-world conversational readiness! Navigate everyday German situations with authentic dialogue choices, cultural etiquette tips, and instant grammar explanations.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 text-9xl opacity-15 select-none pointer-events-none">
          ⚔️🥐
        </div>
      </div>

      {/* Mission Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MISSIONS.map((m) => {
          const isSelected = m.id === mission.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                sounds.playClick();
                resetMission(m);
              }}
              className={`tactile-btn flex-shrink-0 px-4 py-2.5 rounded-2xl font-arcade font-bold text-sm transition-all flex items-center gap-2 border-2 ${
                isSelected
                  ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-rose-400'
              }`}
            >
              <span className={`text-xs px-1.5 py-0.5 rounded font-black ${
                m.level === 'A1' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                m.level === 'A2' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                'bg-purple-500/20 text-purple-600 dark:text-purple-400'
              }`}>
                {m.level}
              </span>
              <span>{m.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main RPG Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-3 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Boss Header & Patience Meter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={mission.bossAvatar} 
                alt={mission.bossName} 
                className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-rose-500 shadow-md object-cover" 
              />
              <span className="absolute -bottom-2 -right-1 text-xs px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold">
                NPC
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-display text-slate-900 dark:text-white">
                  {mission.bossName}
                </h3>
                <span className="text-xs text-slate-500 font-bold">({mission.bossRole})</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                📍 {mission.location} • Stage {currentNodeIndex + 1} of {mission.dialogues.length}
              </p>
            </div>
          </div>

          {/* Patience Bar */}
          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span className="flex items-center gap-1 text-rose-500">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                Boss Patience / Goodwill
              </span>
              <span className={patience < 40 ? 'text-rose-500 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                {patience}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
              <div 
                className={`h-full transition-all duration-500 ${
                  patience > 60 ? 'bg-emerald-500' :
                  patience > 30 ? 'bg-amber-500' :
                  'bg-rose-500 animate-pulse'
                }`}
                style={{ width: `${patience}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mission Briefing */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-800 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-rose-600 dark:text-rose-400 mr-2">Mission Briefing:</span>
          {mission.description}
        </div>

        {/* Chat / Dialogue Scroll Area */}
        <div className="space-y-4 max-h-[380px] overflow-y-auto p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border-2 border-slate-200 dark:border-slate-800">
          {history.map((msg, idx) => {
            const isNpc = msg.role === 'npc';
            return (
              <div 
                key={idx}
                className={`flex gap-3 items-start ${isNpc ? 'justify-start' : 'justify-end'}`}
              >
                {isNpc && (
                  <img 
                    src={mission.bossAvatar} 
                    alt="Boss" 
                    className="w-10 h-10 rounded-xl bg-amber-100 border border-slate-300 dark:border-slate-700 shrink-0 mt-1" 
                  />
                )}

                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  isNpc 
                    ? 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                    : msg.isCorrect === false
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-60">
                      {isNpc ? mission.bossName : 'You'}
                    </span>
                    {isNpc && (
                      <button 
                        onClick={() => speakGerman(msg.text)} 
                        className="text-slate-400 hover:text-amber-500 transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm md:text-base font-body font-medium leading-relaxed">
                    {msg.text}
                  </p>
                </div>

                {!isNpc && (
                  <img 
                    src={mission.playerAvatar} 
                    alt="You" 
                    className="w-10 h-10 rounded-xl bg-blue-100 border border-slate-300 dark:border-slate-700 shrink-0 mt-1" 
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Immediate Feedback Note */}
        {lastFeedback && !missionCompleted && !gameOver && (
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
            lastFeedback.isCorrect 
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-900 dark:text-rose-200'
          }`}>
            {lastFeedback.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider">
                {lastFeedback.isCorrect ? 'Grammar Mastered!' : 'Grammar Correction:'}
              </div>
              <p className="text-xs md:text-sm font-body">
                {lastFeedback.text}
              </p>
              {lastFeedback.tip && (
                <p className="text-xs italic opacity-85 mt-1">
                  💡 Cultural Tip: {lastFeedback.tip}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Mission Complete Screen */}
        {missionCompleted && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white text-center space-y-4 shadow-xl">
            <Trophy className="w-16 h-16 mx-auto text-amber-300 animate-bounce" />
            <h3 className="text-3xl font-black font-display">Mission Accomplished!</h3>
            <p className="text-sm md:text-base max-w-md mx-auto opacity-95">
              You survived &quot;{mission.title}&quot; with high respect! You earned +{mission.completionRewardXP} German XP.
            </p>
            <div className="pt-2">
              <button
                onClick={() => resetMission(mission)}
                className="tactile-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 font-arcade font-bold shadow-lg hover:bg-amber-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-600 to-red-800 text-white text-center space-y-4 shadow-xl">
            <ShieldAlert className="w-16 h-16 mx-auto text-amber-300" />
            <h3 className="text-3xl font-black font-display">Patience Depleted!</h3>
            <p className="text-sm md:text-base max-w-md mx-auto opacity-95">
              The German etiquette threshold was breached! Dust yourself off, review the subjunctive tips, and try again.
            </p>
            <div className="pt-2">
              <button
                onClick={() => resetMission(mission)}
                className="tactile-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-rose-900 font-arcade font-bold shadow-lg hover:bg-rose-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-rose-600" />
                Try Mission Again
              </button>
            </div>
          </div>
        )}

        {/* Interactive Response Options */}
        {!missionCompleted && !gameOver && currentNode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Choose Your Response:
              </label>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                {currentNode.npcGermanHint}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentNode.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  className="tactile-btn p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-left transition-all group flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="font-arcade font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      &quot;{opt.text}&quot;
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default BossBattles;
