import { SlideData } from '../types/slide';

const pearlHarborGallery = [
  {
    url: "/assets/history/slide8-battleship-row-start.webp",
    caption: "Battleship Row at the start of the Pearl Harbor attack.",
    source: "U.S. Navy / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20Pearl%20Harbor%20Navy%20Yard%20and%20Ford%20Island%20on%2026%20November%201941.jpg",
    caption: "Pearl Harbor Navy Yard and Ford Island before the attack.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Overhead%20view%20of%20Ford%20Island%20in%201941.jpg",
    caption: "Ford Island in 1941, before the illusion of safety was broken.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pearl%20Harbor%20torpedo%20attack%20Japanese%20aerial.jpg",
    caption: "Aerial view from a Japanese aircraft during the opening attack.",
    source: "Imperial Japanese Navy / Public Domain"
  },
  {
    url: "/assets/history/slide8-arizona-sinking.webp",
    caption: "USS Arizona sinking after being hit during the attack.",
    source: "U.S. Navy / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Burning%20ships%20at%20Pearl%20Harbor.jpg",
    caption: "Burning ships at Pearl Harbor after the strike.",
    source: "U.S. Navy / Public Domain"
  }
];

const stalingradGallery = [
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20183-J17815%2C%20Russland%2C%20Kampf%20um%20Stalingrad%2C%20Luftangriff.jpg",
    caption: "Aerial view of Stalingrad after a German air attack.",
    source: "Bundesarchiv / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pavlov%27s%20House.jpg",
    caption: "Pavlov's House, the apartment fortress held for weeks.",
    source: "Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Stalingrad%20infantry.jpg",
    caption: "Soviet infantry attacking German positions in Stalingrad.",
    source: "RIA Novosti / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/RIAN%20archive%20602770%20Battle%20of%20Stalingrad.jpg",
    caption: "Soviet soldiers during a street fight in Stalingrad.",
    source: "RIA Novosti / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20183-B22478%2C%20Stalingrad%2C%20Luftwaffen-Soldaten%20in%20Ruinen.jpg",
    caption: "Soldiers moving through ruins in Stalingrad.",
    source: "Bundesarchiv / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/RIAN%20archive%2044732%20Soviet%20soldiers%20attack%20house.jpg",
    caption: "Soviet soldiers attacking through urban ruins.",
    source: "RIA Novosti / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/RIAN%20archive%20137429%20Stalingrad%20soldiers%20during%20short%20lull.jpg",
    caption: "Soviet soldiers during a short lull in the fighting.",
    source: "RIA Novosti / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/RIAN%20archive%2061150%20Great%20Patriotic%20War.jpg",
    caption: "A lull on the frontline during the Stalingrad battle.",
    source: "RIA Novosti / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Volgograd%20Mill%20Gerhardt.jpg",
    caption: "Gerhardt's Mill, a surviving scar of the battle.",
    source: "Wikimedia Commons"
  }
];

const normandyGallery = [
  {
    url: "/assets/saving-private-ryan-omaha.webp",
    caption: "'Into the Jaws of Death' — troops landing at Omaha Beach.",
    source: "U.S. Coast Guard / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/D-day%20Normandy%20Nara%2026-G-2343.jpg",
    caption: "U.S. Army troops wade ashore on Omaha Beach.",
    source: "NARA / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/NormandySupply%20edit.jpg",
    caption: "Allied invasion armada and barrage balloons over Normandy.",
    source: "U.S. National Archives / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Omaha%20Beach%201944.jpg",
    caption: "Allied reinforcements and vehicles on Omaha Beach.",
    source: "U.S. Army Signal Corps"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/2nd%20Infantry%20Division%2C%20E-1%20draw%2C%20Easy%20Red%20sector%2C%20Omaha%20Beach%2C%20D%2B1%2C%20June%207%2C%201944.jpg",
    caption: "U.S. troops climb the bluffs beyond Omaha Beach.",
    source: "U.S. Army / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/General%20Dwight%20D.%20Eisenhower%20addresses%20American%20paratroopers%20on%20D-Day.jpg",
    caption: "Eisenhower speaks with airborne troops before D-Day.",
    source: "U.S. National Archives / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/101st%20Airborne%20Division%20pathfinders%20before%20D-Day.jpg",
    caption: "Airborne troops preparing for the Normandy jump.",
    source: "U.S. Army / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/US%20soldiers%20march%20through%20Carentan.jpg",
    caption: "American soldiers moving through Normandy after the landings.",
    source: "U.S. Army / Wikimedia Commons"
  }
];

const berlinGallery = [
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/BM-13-Katjuscha_Berlin.JPG",
    caption: "A BM-13 Katyusha rocket launcher preserved in Berlin.",
    source: "Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Raising_a_flag_over_the_Reichstag_-_Restoration.jpg",
    caption: "Raising a Flag over the Reichstag, May 1945.",
    source: "Yevgeny Khaldei / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruins%20of%20the%20Reichstag%20in%20Berlin%2C%203%20June%201945.%20BU8573.jpg",
    caption: "The damaged Reichstag after the battle for Berlin.",
    source: "Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv_B_145_Bild-P054320%2C_Berlin%2C_Brandenburger_Tor_und_Pariser_Platz.jpg",
    caption: "Brandenburg Gate and Pariser Platz after Berlin's fall.",
    source: "Bundesarchiv / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv_Bild_183-E0406-0022-012%2C_Sowjetische_Artillerie_vor_Berlin.jpg",
    caption: "Soviet artillery moving toward Berlin.",
    source: "Bundesarchiv / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Reichstag_flag.jpg",
    caption: "A closer Reichstag flag image from the final days of the battle.",
    source: "Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Soviet_War_Memorial_Field_Artillery_%2828151645503%29.jpg",
    caption: "Soviet field artillery memorialized in Berlin.",
    source: "Wikimedia Commons"
  }
];

const pacificSledgeGallery = [
  {
    url: "/assets/history/eugene-sledge.jpg",
    caption: "Eugene B. Sledge (1923–2001) in USMC uniform, 1st Marine Division — author of 'With the Old Breed'.",
    source: "U.S. Marine Corps / Archival Record"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/USS%20Yorktown%20%28CV-5%29%20is%20hit%20by%20a%20torpedo%20on%204%20June%201942.jpg",
    caption: "Battle of Midway: USS Yorktown (CV-5) struck on the port side by an aerial torpedo, June 4, 1942.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Japanese%20aircraft%20carrier%20Hiryu%20adrift%20and%20burning%20on%205%20June%201942%20%28NH%2073065%29.jpg",
    caption: "Battle of Midway: Japanese fleet carrier Hiryū burning and abandoned after U.S. dive-bomber attacks, June 5, 1942.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Japanese%20heavy%20cruiser%20Mikuma%20sinking%20on%206%20June%201942%20%2880-G-414422%29.jpg",
    caption: "Battle of Midway: Japanese heavy cruiser Mikuma heavily bombed and sinking, June 6, 1942.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Douglas%20TBD-1%20Devastators%20of%20VT-6%20are%20spotted%20for%20launch%20aboard%20USS%20Enterprise%20%28CV-6%29%20on%204%20June%201942%20%2880-G-41686%29.jpg",
    caption: "Battle of Midway: Douglas TBD-1 Devastators of VT-6 spotted on USS Enterprise (CV-6) before launching strikes.",
    source: "U.S. Navy / Wikimedia Commons"
  },
  {
    url: "/assets/history/slide5-peleliu-marines.webp",
    caption: "Pacific Theater: U.S. Marines under deadly fire on Peleliu — the brutal crucible recorded by Eugene Sledge.",
    source: "U.S. Marine Corps / Public Domain"
  },
  {
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Explosion%20of%20the%20Japanese%20battleship%20Yamato%20on%207%20April%201945%20%2880-G-413914%29.jpg",
    caption: "Pacific Theater: Giant Japanese battleship Yamato explodes during Operation Ten-Go, April 7, 1945.",
    source: "U.S. Navy / Wikimedia Commons"
  }
];

export const slidesData: SlideData[] = [
  {
    id: 1,
    title: "JOURNEY TO THE CRUCIBLE OF HISTORY",
    subtitle: "Setting the Time Dial to 1939 – 1945",
    tag: "[ WAR DEPARTMENT ARCHIVE // TOP SECRET ]",
    date: "SEPTEMBER 1939 – SEPTEMBER 1945",
    layoutType: "title",
    content: {
      lead: "If You Could Travel Back in Time, Which Era Would You Choose?",
      points: [
        {
          title: "TARGET DESTINATION",
          desc: "1939 – 1945: The Second World War — The most turbulent six years in human history.",
          accent: "brass"
        },
        {
          title: "OBSERVER PROTOCOL",
          desc: "The Invisible Witness — Observing the turning points that forged our modern world.",
          accent: "olive"
        },
        {
          title: "CORE MISSION",
          desc: "Not to glorify conflict, but to understand the profound cost of peace and human resilience.",
          accent: "red"
        }
      ]
    },
    media: {
      url: "https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=1200&q=80",
      caption: "Cartographic Survey & Chronological Navigator (1939–1945)",
      source: "Allied Strategic Mapping Agency"
    },
    speakerNote: {
      timing: "00:00 – 01:00",
      cue: "Welcome the audience warmly. Pose the time-travel dilemma and state your surprising destination right away.",
      scriptSnippet: `Good morning, everyone! Thank you very much for coming today.

Let me start with an interesting question: If you had a time machine and could travel back to any time in history, where would you go?

Most people would choose a beautiful and romantic time. For example, they might go to ancient Egypt to see the Pyramids, visit Italy to meet Leonardo da Vinci, or walk through Paris in the 1920s. Those are wonderful choices. But if you gave me that time machine, I would choose a very different era. I would set the time to 1939 to 1945 — the Second World War.`,
      keyVocabulary: ["Time machine", "Crucible of history", "Invisible witness", "Defining era"]
    }
  },
  {
    id: 2,
    title: "THE COMMON CHOICES VS. MY DIAL",
    subtitle: "Contrasting Romantic Nostalgia with Historical Gravity",
    tag: "[ HISTORICAL CONTRAST ANALYSIS ]",
    layoutType: "split-contrast",
    content: {
      leftCol: {
        header: "WHERE WOULD MOST PEOPLE GO?",
        subtitle: "The Allure of Golden & Peaceful Eras",
        theme: "golden",
        items: [
          "Ancient Egypt: Witnessing the grandeur of the Great Pyramids of Giza.",
          "Renaissance Florence: Walking alongside Leonardo da Vinci and Michelangelo.",
          "Paris in the Roaring Twenties: Jazz clubs, literary salons, and romantic peace."
        ]
      },
      rightCol: {
        header: "MY DESTINATION: 1939 – 1945",
        subtitle: "The Uncomfortable, Defining Crucible",
        theme: "slate",
        highlight: true,
        items: [
          "Not as peaceful as today's world.",
          "Far more dangerous than other historical eras.",
          "Shows both the worst and the best of humanity.",
          "The most defining six years of modern human history."
        ]
      }
    },
    media: {
      url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
      caption: "Romanticized antiquity vs The mechanized crucible of total war"
    },
    speakerNote: {
      timing: "01:00 – 02:00",
      cue: "Acknowledge why people choose romantic eras like Egypt or 1920s Paris, then contrast with the gravity and importance of WWII.",
      scriptSnippet: `I know what you are thinking: "Why would you choose the darkest and most dangerous time in human history?"

That is true. World War II was not as peaceful as our world today, and it was certainly not as safe as other historical eras. Millions of people lost their lives. But for me, this era shows both the worst and the best of humanity. In the middle of terrible darkness, we can see the greatest courage, deep friendship, and the strongest human will.`,
      keyVocabulary: ["Not as peaceful as...", "Far more dangerous than...", "Human resilience", "Crucible"]
    }
  },
  {
    id: 3,
    title: "THE ROLE: THE INVISIBLE WITNESS",
    subtitle: "Dossier Directive: Observation Without Intervention",
    tag: "[ OPERATIONAL DIRECTIVE // CLASSIFIED ]",
    layoutType: "dossier",
    content: {
      lead: "MISSION STATEMENT: TO BEAR WITNESS TO TURNING POINTS",
      points: [
        {
          title: "❌ NOT AS A COMBATANT",
          desc: "Not as a soldier to fight.",
          accent: "red"
        },
        {
          title: "❌ NOT TO ALTER TIME",
          desc: "Not to change the timeline.",
          accent: "red"
        },
        {
          title: "✅ AS AN INVISIBLE WITNESS",
          desc: "To see the darkest depths of human cruelty and the highest levels of human courage.",
          accent: "brass"
        },
        {
          title: "✅ TO UNDERSTAND FREEDOM",
          desc: "To understand the true cost of modern freedom.",
          accent: "olive"
        }
      ],
      quote: {
        text: "I do not want to go back in time to fight. I do not want to change the past. I just want to be an invisible witness — a quiet observer standing in the background.",
        author: "Presentation Thesis",
        role: "The Time Traveler's Creed"
      }
    },
    speakerNote: {
      timing: "02:00 – 03:00",
      cue: "Clarify that you travel not to glorify war or fight, but to witness courage and understand the real cost of freedom.",
      scriptSnippet: `I do not want to go back in time to fight. I do not want to change the past. I just want to be an invisible witness — a quiet observer standing in the background to see the moments that changed our world.`,
      keyVocabulary: ["Invisible witness", "Quiet observer", "Bear witness", "True cost of modern freedom"]
    }
  },
  {
    id: 4,
    title: "THE SPARK: SAVING PRIVATE RYAN",
    subtitle: "When Celluloid Shattered the Textbook Illusion",
    tag: "[ CINEMATIC AWAKENING // 1998 ]",
    layoutType: "battle",
    content: {
      lead: "Steven Spielberg's Masterpiece: The First 20 Minutes on Omaha Beach",
      points: [
        {
          title: "THE OMAHA BEACH LANDING",
          desc: "The visceral deafening roar of 88mm artillery, cold spray, machine gun crossfire, and sheer terror.",
          accent: "red"
        },
        {
          title: "THE REVELATION",
          desc: "History ceased being cold dates and lifeless statistics printed in school textbooks.",
          accent: "brass"
        },
        {
          title: "REAL HUMAN LIVES",
          desc: "It was lived, bled, and suffered by real, breathing young people — people just our age.",
          accent: "olive"
        }
      ],
      stats: [
        { label: "Opening Scene", value: "20 Mins", detail: "Omaha Beach" },
        { label: "Realization", value: "Real People", detail: "Not just numbers" }
      ]
    },
    media: {
      url: "/assets/saving-private-ryan-omaha.webp",
      caption: "'Into the Jaws of Death' — Troops of Company E, 16th Infantry, landing at Omaha Beach, June 6, 1944",
      source: "U.S. Coast Guard / Chief Photographer's Mate Robert F. Sargent"
    },
    speakerNote: {
      timing: "03:00 – 04:00",
      cue: "Describe the shock of watching the Omaha Beach scene and how it fundamentally shifted your perception of history.",
      scriptSnippet: `How did I become so interested in this war? It all started with a movie: Steven Spielberg's Saving Private Ryan.

When I watched the first twenty minutes on Omaha Beach, I was completely shocked. The loud noise of big guns, the shaking boats, and the fear in the soldiers' eyes made me understand something very important: History is not just numbers in a textbook. History was made by real, living people.

After that movie, I wanted to learn more.`,
      keyVocabulary: ["Visceral shock", "Textbook illusion", "Real living people", "Omaha Beach"]
    }
  },
  {
    id: 5,
    title: "BROTHERS IN THE AIR & ON LAND",
    subtitle: "The Golden Era of Historical Television",
    tag: "[ THE CINEMATIC TRIAD // HBO & APPLE TV ]",
    layoutType: "media-grid",
    content: {
      cards: [
        {
          title: "BAND OF BROTHERS",
          unit: "Easy Co., 506th PIR, 101st Airborne",
          theater: "European Western Theater",
          desc: "Young paratroopers trusted and protected each other through freezing winter and terrible battles in Europe.",
          imageUrl: "/assets/history/slide5-easy-company.webp"
        },
        {
          title: "THE PACIFIC",
          unit: "1st Marine Division, USMC",
          theater: "Pacific Island Theater",
          desc: "The 1st Marine Division fought on tropical islands in mud, heavy rain, and jungle heat.",
          imageUrl: "/assets/history/slide5-peleliu-marines.webp"
        },
        {
          title: "MASTERS OF THE AIR",
          unit: "100th Bomb Group, 8th Air Force",
          theater: "High-Altitude Air War",
          desc: "The 'Bloody Hundredth' flew heavy bombers in freezing skies against fighters and anti-aircraft fire.",
          imageUrl: "/assets/history/slide5-b17-formation.webp"
        }
      ]
    },
    speakerNote: {
      timing: "04:00 – 05:00",
      cue: "Highlight how each series showcased different branches (paratroopers, island marines, heavy bomber crews) and their unique struggles.",
      scriptSnippet: `I watched the famous series Band of Brothers on HBO. It tells the real story of Easy Company, from the 101st Airborne Division. I saw how these young paratroopers trusted and protected each other through freezing winter and terrible battles in Europe.

Then I watched The Pacific. This show focused on the brave men of the United States Marine Corps, especially the 1st Marine Division. It showed a completely different war on tropical islands, where soldiers fought against a fearless enemy in mud, heavy rain, and jungle heat.

Later, I watched Masters of the Air. It showed the story of the 100th Bomb Group in the U.S. Eighth Air Force — people called them the "Bloody Hundredth" because they lost so many planes. Young men flew heavy bombers high in the freezing sky, facing enemy fighter planes and anti-aircraft fire every single day.

And on the Eastern Front, I watched Enemy at the Gates, starring Jude Law. He played Vasily Zaitsev, a real Soviet sniper in the ruins of Stalingrad. That movie showed me how terrifying street fighting was, where snipers waited for hours in broken buildings just to take one single shot.`,
      keyVocabulary: ["Paratroopers", "1st Marine Division", "The Bloody Hundredth", "Mutual brotherhood"]
    }
  },
  {
    id: 6,
    title: "FROM PIXELS TO PRIMARY SOURCES",
    subtitle: "The Intellectual Journey from Gaming to Archival Research",
    tag: "[ RESEARCH METHODOLOGY & EVOLUTION ]",
    layoutType: "split-contrast",
    content: {
      leftCol: {
        header: "THE VIRTUAL HOOK: TACTICAL GAMING",
        subtitle: "Interactive Simulation of the Frontlines",
        theme: "slate",
        items: [
          "Company of Heroes, Call of Duty, and Medal of Honor.",
          "Games helped me understand battlefield tactics.",
          "The next question: What was life really like for real soldiers?"
        ]
      },
      rightCol: {
        header: "THE ARCHIVAL AWAKENING",
        subtitle: "Primary Documents & Soldier Testimonies",
        theme: "golden",
        highlight: true,
        items: [
          "Color documentaries on Netflix.",
          "The Pianist: Wladyslaw Szpilman surviving occupied Warsaw and the destruction of the Warsaw Ghetto.",
          "Real history books and Wikipedia articles.",
          "Wartime diaries written by soldiers and commanders."
        ]
      }
    },
    media: {
      url: "/assets/history/slide6-szpilman.jpg",
      caption: "Primary archives & soldier memoirs: Władysław Szpilman surviving occupied Warsaw and the horrors of the Holocaust.",
      source: "Archival Record / Polskie Radio"
    },
    speakerNote: {
      timing: "05:00 – 06:00",
      cue: "Explain how video games sparked tactical curiosity, prompting you to read authentic historical memoirs and archival documents.",
      scriptSnippet: `I also spent many hours watching color documentaries on Netflix and playing video games like Call of Duty, Medal of Honor, and Company of Heroes. Playing games helped me understand battlefield tactics. But it also made me ask: What was life really like for real soldiers?

Another film that made this question feel personal is The Pianist. It follows Wladyslaw Szpilman, a Polish-Jewish pianist, as he tries to survive occupied Warsaw and the destruction of the Warsaw Ghetto. It reminds me that World War II was not only about armies and battles; it was also about ordinary people trying to stay alive.

So I started reading real history books, Wikipedia articles, and wartime diaries written by soldiers and commanders.`,
      keyVocabulary: ["Tactical games", "Primary sources", "Soldier memoirs", "Combat diaries"]
    }
  },
  {
    id: 7,
    title: "THE TIME-TRAVEL ITINERARY: 3 FRONTS, 4 STOPS",
    subtitle: "Strategic Flight Plan Across the Decisive Theaters",
    tag: "[ GLOBAL STRATEGIC FLIGHT PLAN ]",
    layoutType: "tactical-map",
    content: {
      lead: "Our Chronological Route Across Three Continents and Four Pivotal Clashes",
      stops: [
        {
          num: 1,
          name: "PEARL HARBOR",
          date: "DEC 7, 1941",
          theater: "Pacific Ocean Theater",
          coords: "21.3493° N, 157.9438° W",
          status: "The Surprise Cataclysm: Neutrality Ended"
        },
        {
          num: 2,
          name: "BATTLE OF STALINGRAD",
          date: "WINTER 1942–43",
          theater: "Eastern Front (Volga River)",
          coords: "48.7080° N, 44.5133° E",
          status: "The Clash of Iron Wills: Nazi Spine Broken"
        },
        {
          num: 3,
          name: "D-DAY: OPERATION OVERLORD",
          date: "JUNE 6, 1944",
          theater: "Western European Front",
          coords: "49.3700° N, 0.8800° W",
          status: "The Great Amphibious Liberation"
        },
        {
          num: 4,
          name: "FALL OF BERLIN",
          date: "MAY 1945",
          theater: "European Climax",
          coords: "52.5186° N, 13.3761° E",
          status: "The Final Stand & The Victory Banner"
        }
      ]
    },
    speakerNote: {
      timing: "06:00 – 07:00",
      cue: "Give the audience an organized overview of the four key stops on three continents that you will explore next.",
      scriptSnippet: `Today, I want to take you with me on an imaginary trip to three major fronts and four unforgettable moments.`,
      keyVocabulary: ["Strategic itinerary", "Pacific Front", "Eastern Front", "Western Front"]
    }
  },
  {
    id: 8,
    title: "STOP 1: PEARL HARBOR – THE CALM BEFORE",
    subtitle: "December 7, 1941 – 07:30 AM | Oahu, Territory of Hawaii",
    tag: "[ PACIFIC THEATER // EYEWITNESS DISPATCH ]",
    date: "DECEMBER 7, 1941 - 07:30 AM",
    theater: "PACIFIC THEATER",
    layoutType: "battle",
    content: {
      lead: "Sunday Morning in Paradise: The Fragile Illusion of Absolute Safety",
      points: [
        {
          title: "THE IDYLLIC HARBOR",
          desc: "The water in the harbor is as calm as a mirror.",
          accent: "brass"
        },
        {
          title: "SUNDAY TRANQUILITY",
          desc: "Sailors are eating breakfast, talking, and writing letters to their families.",
          accent: "olive"
        },
        {
          title: "THE DECEPTIVE NORMALITY",
          desc: "It feels like the safest and most peaceful place on earth.",
          accent: "brass"
        }
      ],
      stats: [
        { label: "Time", value: "07:30 AM", detail: "Sunday morning" },
        { label: "Location", value: "Oahu", detail: "Hawaii" }
      ]
    },
    media: {
      url: "/assets/history/slide8-battleship-row-start.webp",
      caption: "Aerial survey of Pearl Harbor and Ford Island prior to hostilities.",
      source: "U.S. Navy Historical Center",
      gallery: pearlHarborGallery,
      galleryGroup: "pearl-harbor"
    },
    speakerNote: {
      timing: "07:00 – 08:00",
      cue: "Paint the vivid contrast of peaceful normal life in Hawaii minutes before the attack unfolded.",
      scriptSnippet: `Our first stop is the island of Oahu in Hawaii, early in the morning on Sunday, December 7, 1941.

Imagine we arrive at 7:30 in the morning. The weather is warm and beautiful. The water in the harbor is as calm as a mirror. American sailors on huge battleships are eating breakfast, talking, and writing letters to their families. It feels like the safest and most peaceful place on earth.`,
      keyVocabulary: ["As calm as a mirror", "Battleship Row", "Deceptive tranquility", "Sanctuary"]
    }
  },
  {
    id: 9,
    title: "PEARL HARBOR: THE TURNING POINT",
    subtitle: "07:55 AM: 'A Date Which Will Live in Infamy'",
    tag: "[ PACIFIC THEATER // HISTORIC TURNING POINT ]",
    date: "DECEMBER 7, 1941 - 07:55 AM",
    theater: "PACIFIC THEATER",
    layoutType: "battle",
    content: {
      lead: "The Surprise Strike That Awakened the Sleeping Giant",
      points: [
        {
          title: "THE AIRSTRIKE",
          desc: "Hundreds of Japanese warplanes fly in from over the mountains.",
          accent: "red"
        },
        {
          title: "THE CATACLYSM OF USS ARIZONA",
          desc: "USS Arizona is hit, explodes, and sinks in less than nine minutes.",
          accent: "red"
        },
        {
          title: "STRATEGIC TRANSFORMATION",
          desc: "Before the attack, the United States was not as interested in joining the war.",
          accent: "brass"
        },
        {
          title: "ARSENAL OF DEMOCRACY",
          desc: "America officially joined the war, changing the balance of world power forever.",
          accent: "olive"
        }
      ],
      stats: [
        { label: "Attack Begins", value: "07:55 AM", detail: "Pearl Harbor" },
        { label: "USS Arizona", value: "< 9 Mins", detail: "More than 1,000 sailors lost" }
      ]
    },
    media: {
      url: "/assets/history/slide8-battleship-row-start.webp",
      caption: "Aerial photograph of Japanese aircraft strike over Battleship Row, Pearl Harbor, Dec 7, 1941.",
      source: "U.S. Navy Historical Center / Public Domain",
      gallery: pearlHarborGallery,
      galleryGroup: "pearl-harbor"
    },
    speakerNote: {
      timing: "08:00 – 09:00",
      cue: "Explain the sudden strike, the tragedy of the Arizona, and the historic pivot from American neutrality to full mobilization.",
      scriptSnippet: `Then, suddenly, at 7:55 AM, the sky turns dark. Hundreds of Japanese warplanes fly in from over the mountains.

Within minutes, paradise turns into smoke and fire. Torpedoes hit the water. Bombs fall from the sky. Sirens scream everywhere. The giant battleship USS Arizona is hit by a heavy bomb and explodes into a ball of fire. The ship sinks in less than nine minutes, and more than one thousand sailors lose their lives inside.

If I were an invisible witness standing on the harbor, my heart would stop from shock.

Why is this moment so important? Because before this attack, the United States was not as interested in joining the war. Most Americans wanted to stay out of foreign trouble. But Pearl Harbor changed everything in one morning. President Roosevelt called it "a date which will live in infamy." America officially joined the war, and the whole balance of world power changed forever.`,
      keyVocabulary: ["Date which will live in infamy", "Not as eager to...", "Arsenal of Democracy", "Cataclysm"]
    },
    cinematicVideo: {
      src: "/pearlhabor.mp4",
      title: "PEARL HARBOR: THE TURNING POINT (07:55 AM, DEC 7, 1941)",
      badge: "DECLASSIFIED NAVAL COMBAT ARCHIVE",
      caption: "Surprise air assault over Battleship Row and the catastrophic explosion of USS Arizona."
    }
  },
  {
    id: 10,
    title: "STOP 2: STALINGRAD – HELL IN THE SNOW",
    subtitle: "Winter 1942–1943 | The Frozen Ruins Along the Volga River",
    tag: "[ EASTERN FRONT // URBAN CARNAGE ]",
    date: "WINTER 1942 – FEBRUARY 1943",
    theater: "EASTERN FRONT",
    layoutType: "battle",
    content: {
      lead: "The Bloodiest and Most Brutal Battle in Recorded Human History",
      points: [
        {
          title: "THE SCALE OF SACRIFICE",
          desc: "Nearly two million people were killed, wounded, or captured.",
          accent: "red"
        },
        {
          title: "UNIMAGINABLE ARCTIC FREEZE",
          desc: "Temperatures plummeting to -30°C and -40°C — far colder than anything most of us could ever endure.",
          accent: "brass"
        },
        {
          title: "RATTENKRIEG ('RAT WAR')",
          desc: "Soldiers fought room by room, staircase by staircase, and sewer by sewer.",
          accent: "red"
        }
      ],
      stats: [
        { label: "Total Casualties", value: "~2.0M", detail: "Dead, wounded, or captured" },
        { label: "Extreme Winter", value: "-40°C", detail: "Sub-zero fighting conditions" }
      ]
    },
    media: {
      url: stalingradGallery[0].url,
      caption: "Ruins of central Stalingrad following continuous Luftwaffe carpet bombing and artillery duels, 1942.",
      source: "Archival Record / RIA Novosti",
      gallery: stalingradGallery,
      galleryGroup: "stalingrad"
    },
    speakerNote: {
      timing: "09:00 – 10:00",
      cue: "Evoke the sheer brutal scale, freezing temperatures, and claustrophobic urban destruction of Stalingrad.",
      scriptSnippet: `Now, our time machine leaves the warm island of Hawaii and takes us to the snowy banks of the Volga River in Russia. It is the winter of 1942.

Here, we witness the Battle of Stalingrad — the bloodiest and most terrible battle in human history. Nearly two million people were killed, wounded, or captured here.

First, let us talk about the cold. The winter here is colder than anything most of us can imagine. The temperature drops to minus thirty or minus forty degrees Celsius. The wind feels like ice needles on your face.

Second, the fighting was everywhere. Just like in the movie Enemy at the Gates with Jude Law, soldiers did not fight on open green fields. They fought inside ruined apartments, dark basements, factory halls, and even underground sewers. The German soldiers called it the "Rat War" because they had to fight room by room, staircase by staircase.`,
      keyVocabulary: ["Rattenkrieg (Rat War)", "Bloodiest battle", "Colder than anything...", "Volga River"]
    }
  },
  {
    id: 11,
    title: "ENEMY AT THE GATES & PAVLOV’S HOUSE",
    subtitle: "Sniper Duels in the Rubble & The 58-Day Apartment Fortress",
    tag: "[ URBAN FORTRESS // HISTORICAL HEROISM ]",
    date: "AUTUMN – WINTER 1942",
    theater: "EASTERN FRONT",
    layoutType: "battle",
    content: {
      lead: "From Cinematic Sniper Mythology to Unbelievable Historical Reality",
      points: [
        {
          title: "ENEMY AT THE GATES (JUDE LAW)",
          desc: "Vasily Zaitsev, a real Soviet sniper, fought in the ruins of Stalingrad.",
          accent: "brass"
        },
        {
          title: "PAVLOV'S HOUSE (ДОМ ПАВЛОВА)",
          desc: "One regular four-story brick building.",
          accent: "olive"
        },
        {
          title: "58 DAYS OF DEFIANCE",
          desc: "A small group of around twenty-five Soviet soldiers held it for fifty-eight days.",
          accent: "red"
        },
        {
          title: "GERMAN MAPS CLASSIFICATION",
          desc: "The enemy attacked it with tanks and airplanes day and night, but could never capture it.",
          accent: "brass"
        }
      ],
      stats: [
        { label: "Defenders", value: "~25", detail: "Soviet soldiers" },
        { label: "Days Held", value: "58", detail: "Pavlov's House" }
      ]
    },
    media: {
      url: stalingradGallery[1].url,
      caption: "Pavlov's House (Дом Павлова) in Stalingrad — an apartment fortified into an impenetrable redoubt.",
      source: "Historical Battle Documentation",
      gallery: stalingradGallery,
      galleryGroup: "stalingrad"
    },
    speakerNote: {
      timing: "10:00 – 11:00",
      cue: "Connect the sniper imagery from Enemy at the Gates to the incredible real-life defense of Pavlov's House.",
      scriptSnippet: `One famous place I want to see is Pavlov's House. It was just a regular four-story brick building. But a small group of around twenty-five Soviet soldiers held that building for fifty-eight days! The enemy attacked it with tanks and airplanes day and night, but they could never capture it.`,
      keyVocabulary: ["Vasily Zaitsev", "Pavlov's House", "58 days", "Urban fortress"]
    }
  },
  {
    id: 12,
    title: "THE UNBREAKABLE WILL OF THE SOVIET PEOPLE",
    subtitle: "'There Is No Land for Us Beyond the Volga!'",
    tag: "[ EASTERN FRONT // SOVIET RESILIENCE ]",
    date: "ORDER NO. 227 - 1942",
    theater: "EASTERN FRONT",
    layoutType: "dossier",
    content: {
      lead: "ORDER NO. 227: 'NOT ONE STEP BACK!' — RESILIENCE BEYOND IRON",
      points: [
        {
          title: "CIVILIAN HEROISM UNDER FIRE",
          desc: "Factory workers, including women and young teenagers, repaired T-34 tanks while bombs were falling.",
          accent: "olive"
        },
        {
          title: "FACTORY GATES TO THE FRONTLINE",
          desc: "As soon as a tank was fixed, it drove straight from the factory door into combat.",
          accent: "brass"
        },
        {
          title: "WOMEN IN ARMS",
          desc: "Women worked as combat nurses, anti-aircraft gunners, and snipers.",
          accent: "red"
        },
        {
          title: "THE VERDICT OF STALINGRAD",
          desc: "Stalingrad broke the back of the Nazi army.",
          accent: "brass"
        }
      ],
      quote: {
        text: "Their will was stronger than the German iron and colder than the Russian winter.",
        author: "Presentation Observation",
        role: "The Turning of the Tide"
      }
    },
    speakerNote: {
      timing: "11:00 – 12:00",
      cue: "Emphasize the stubborn willpower of both soldiers and civilians, particularly women and factory workers.",
      scriptSnippet: `What moves me the most about Stalingrad is the incredible, unbreakable will of the Soviet Red Army and the Soviet people.

The Soviet soldiers had a famous slogan: "There is no land for us beyond the Volga!" They knew that if Stalingrad fell, their entire country could be lost. Order Number 227 was given: "Not one step back!"

And it was not only the soldiers on the front lines. The ordinary Soviet people showed superhuman courage:

Inside the city, while bombs were dropping from the sky, factory workers — including women and young teenagers — kept repairing T-34 tanks inside broken factories. Often, as soon as a tank was fixed, it drove straight out the factory door and directly into combat.

Women worked as combat nurses, anti-aircraft gunners, and even deadly snipers.

Civilians had almost no food and very little warm clothing, but they refused to surrender.

Their will was stronger than the German iron and colder than the Russian winter. Stalingrad became the turning point of the war. It broke the back of the Nazi army. After Stalingrad, the German military was never as strong as before.

Standing in the snow of Stalingrad would teach me what true resilience looks like when human beings face the edge of survival.`,
      keyVocabulary: ["Order No. 227", "Not one step back!", "T-34 tanks", "Never as strong as before"]
    },
    cinematicVideo: {
      src: "/stalingrad.mp4",
      title: "THE SIEGE OF STALINGRAD: COMBAT IN THE RUINS (1942–1943)",
      badge: "DECLASSIFIED RED ARMY HISTORICAL RECORD",
      caption: "Urban combat in the frozen ruins along the Volga River and the resilience of the Soviet people."
    }
  },
  {
    id: 13,
    title: "STOP 3: D-DAY – OPERATION OVERLORD",
    subtitle: "June 6, 1944 | Breaching Hitler's Fortress Europe",
    tag: "[ WESTERN FRONT // THE GREAT INVASION ]",
    date: "JUNE 6, 1944 - H-HOUR",
    theater: "WESTERN FRONT",
    layoutType: "battle",
    content: {
      lead: "The Largest Combined Amphibious & Airborne Operation in World History",
      points: [
        {
          title: "THE INVASION FLEET",
          desc: "More than five thousand ships crossed the rough English Channel.",
          accent: "brass"
        },
        {
          title: "150,000+ TROOPS ON DAY 1",
          desc: "Over one hundred and fifty thousand American, British, and Canadian soldiers landed.",
          accent: "olive"
        },
        {
          title: "BREACHING THE ATLANTIC WALL",
          desc: "The objective was to free Western Europe.",
          accent: "red"
        }
      ],
      stats: [
        { label: "Ships", value: "5,000+", detail: "Across the Channel" },
        { label: "Troops", value: "150,000+", detail: "Allied soldiers" }
      ]
    },
    media: {
      url: "/assets/saving-private-ryan-omaha.webp",
      caption: "Allied invasion armada and barrage balloons over Normandy, June 1944.",
      source: "U.S. National Archives / Public Domain",
      gallery: normandyGallery,
      galleryGroup: "normandy"
    },
    speakerNote: {
      timing: "12:00 – 13:00",
      cue: "Convey the colossal scale, logistical miracle, and decisive objective of Operation Overlord.",
      scriptSnippet: `Next, we turn our time machine forward to June 6, 1944, on the foggy beaches of Normandy in northern France. This is D-Day, Operation Overlord.

This was the largest sea invasion in world history. More than five thousand ships carried over one hundred and fifty thousand American, British, and Canadian soldiers across the rough English Channel to free Western Europe.`,
      keyVocabulary: ["Operation Overlord", "Amphibious invasion", "Atlantic Wall", "English Channel"]
    }
  },
  {
    id: 14,
    title: "OMAHA BEACH & EASY COMPANY",
    subtitle: "Ramps Down in the Surf & The Hedgerows of Normandy",
    tag: "[ WESTERN FRONT // HUMAN COURAGE ]",
    date: "JUNE 6, 1944",
    theater: "WESTERN FRONT",
    layoutType: "battle",
    content: {
      lead: "Two Fronts on the Longest Day: The Shoreline and Behind Enemy Lines",
      points: [
        {
          title: "OMAHA BEACH: BLOOD IN THE SURF",
          desc: "Landing boats, freezing surf, landmines, steel barriers, and machine guns from concrete bunkers.",
          accent: "red"
        },
        {
          title: "INLAND: EASY COMPANY (101ST AIRBORNE)",
          desc: "Easy Company paratroopers jumped into the dark French countryside and attacked German cannons.",
          accent: "brass"
        },
        {
          title: "THE HUMAN REALITY: NOT SUPERHEROES",
          desc: "School teachers, young farmers, and store clerks who were afraid but still moved forward.",
          accent: "olive"
        }
      ],
      stats: [
        { label: "Omaha Beach", value: "06:30 AM", detail: "Landing boats in rough water" },
        { label: "Easy Company", value: "101st", detail: "Airborne Division" }
      ]
    },
    media: {
      url: "/assets/saving-private-ryan-omaha.webp",
      caption: "Allied reinforcements and supply convoys hitting the Normandy beachhead under continued observation.",
      source: "U.S. Army Signal Corps",
      gallery: normandyGallery,
      galleryGroup: "normandy"
    },
    speakerNote: {
      timing: "13:00 – 14:00",
      cue: "Contrast the beach slaughter with inland paratrooper action; emphasize that these men were ordinary humans who overcame paralyzing fear.",
      scriptSnippet: `Imagine you are standing inside a metal landing boat at 6:30 in the morning at Omaha Beach. The boat hits the waves hard. Everyone is wet, freezing, and seasick. Nobody speaks. You only hear the boat engine, the cold ocean waves, and the sound of enemy bullets hitting the front ramp.

When the ramp drops open, you step right into the scenes from Saving Private Ryan. The sand is wide, filled with water, landmines, and steel barriers, while machine guns fire down from high concrete bunkers.

At the exact same time, inland behind the beaches, the brave paratroopers of Easy Company from the 101st Airborne Division — the men from Band of Brothers — were jumping into the dark French countryside. They gathered in small teams in the bushes, attacking German cannons to protect their brothers landing on the beach.

What I admire most here is the bravery of regular people. These soldiers were not superheroes with special powers. They were school teachers, young farmers, and store clerks. They were just as afraid as anyone in this room would be. But they did not run away. They moved forward through the water. Seeing D-Day would show me what real selflessness means.`,
      keyVocabulary: ["Higgins boat", "Easy Company", "Not superheroes", "Just as afraid as anyone"]
    }
  },
  {
    id: 15,
    title: "STOP 4: THE CLIMAX – THE BATTLE OF BERLIN",
    subtitle: "April – May 1945 | The Fiery Götterdämmerung of the Third Reich",
    tag: "[ EUROPEAN THEATER // THE FINAL CLIMAX ]",
    date: "APRIL – MAY 1945",
    theater: "CENTRAL EUROPEAN THEATER",
    layoutType: "battle",
    content: {
      lead: "The Final Death Throes of Nazi Germany in a Sea of Concrete and Smoke",
      points: [
        {
          title: "ENCIRCLEMENT OF THE REICH",
          desc: "The capital city of Nazi Germany is completely surrounded by millions of Soviet soldiers.",
          accent: "red"
        },
        {
          title: "THE SOUND OF 'STALIN'S ORGANS'",
          desc: "Thousands of Soviet Katyusha rockets shoot across the sky with a screaming sound.",
          accent: "brass"
        },
        {
          title: "CIVILIANS IN THE DEPTHS",
          desc: "People hide in underground subway stations without food or electricity.",
          accent: "olive"
        },
        {
          title: "DESPERATE LAST STAND",
          desc: "The last German defenders fight desperately around the Reichstag.",
          accent: "red"
        }
      ],
      stats: [
        { label: "Final Stop", value: "Berlin", detail: "Late April 1945" },
        { label: "Civilians", value: "Shelters", detail: "Subway stations" }
      ]
    },
    media: {
      url: berlinGallery[0].url,
      caption: "BM-13 Katyusha rocket launcher imagery anchors the soundscape of Berlin's final battle.",
      source: "Wikimedia Commons",
      gallery: berlinGallery,
      galleryGroup: "berlin"
    },
    speakerNote: {
      timing: "14:00 – 15:00",
      cue: "Describe the apocalyptic atmosphere of the war's final weeks in Europe and the total ruin of the Nazi capital.",
      scriptSnippet: `Our last stop brings us to the end of the long nightmare: Berlin, in late April 1945.

The capital city of Nazi Germany is completely surrounded by millions of Soviet soldiers. The whole city is in ruins. The air is full of thick black smoke and dust. Thousands of Soviet Katyusha rockets shoot across the sky with a screaming sound that shakes your chest.

People are hiding in underground subway stations without food or electricity. The last German defenders fight desperately around the Reichstag — the famous parliament building.`,
      keyVocabulary: ["Battle of Berlin", "Katyusha rockets", "Stalin's Organs", "Apocalyptic climax"]
    }
  },
  {
    id: 16,
    title: "RAISING THE FLAG OVER THE REICHSTAG",
    subtitle: "May 2, 1945 | The Red Banner of Victory & The Ash of War",
    tag: "[ CLIMAX // THE RED BANNER OF VICTORY ]",
    date: "MAY 2, 1945",
    theater: "BERLIN, GERMANY",
    layoutType: "battle",
    content: {
      lead: "The Symbolic Death of the Nazi Empire and the Dawn of a Divided World",
      points: [
        {
          title: "THE VICTORY BANNER",
          desc: "Soviet soldiers climb to the roof of the damaged Reichstag and raise the red victory flag.",
          accent: "red"
        },
        {
          title: "THE PARADOX OF VICTORY",
          desc: "Great relief, but also deep sadness.",
          accent: "brass"
        },
        {
          title: "THE ASH OF WAR",
          desc: "War ends with tired people standing among ruins.",
          accent: "olive"
        },
        {
          title: "BIRTH OF THE COLD WAR",
          desc: "A new difficult time — the Cold War — was about to begin.",
          accent: "brass"
        }
      ],
      stats: [
        { label: "Red Flag", value: "May 2", detail: "1945" },
        { label: "Meaning", value: "End", detail: "War in Europe" }
      ]
    },
    media: {
      url: berlinGallery[1].url,
      caption: "'Raising a Flag over the Reichstag' — Iconic photograph by Yevgeny Khaldei, May 2, 1945.",
      source: "Yevgeny Khaldei / RIA Novosti / Public Domain",
      gallery: berlinGallery,
      galleryGroup: "berlin"
    },
    speakerNote: {
      timing: "15:00 – 16:00",
      cue: "Reflect on this iconic historical photograph: total victory over fascism coupled with exhaustion, grief, and the start of the Cold War.",
      scriptSnippet: `Finally, on May 2, 1945, through the gray smoke, Soviet soldiers climbed to the roof of the damaged Reichstag and raised the red victory flag. That famous moment marked the total defeat of Nazi Germany and the end of the war in Europe.

Standing there as a quiet observer, you would feel two strong emotions: great relief, but also deep sadness. It was the end of the most evil regime in modern history. But the city was completely destroyed, and a new difficult time — the Cold War — was about to begin.

Seeing Berlin in May 1945 reminds us that real war does not end with happy music like in the movies. It ends with tired people standing among ruins, faced with the huge job of rebuilding their lives.`,
      keyVocabulary: ["Reichstag", "Victory Banner", "Exhaustion and ash", "Dawn of the Cold War"]
    }
  },
  {
    id: 17,
    title: "PIXELS VS. REALITY: NO 'RESTART' BUTTON",
    subtitle: "What Interactive Entertainment Can Never Replicate",
    tag: "[ ETHICAL REFLECTION // MEDIA VS TRUTH ]",
    layoutType: "split-contrast",
    content: {
      leftCol: {
        header: "IN VIDEO GAMES & ENTERTAINMENT",
        subtitle: "The Clean Simulation of Warfare",
        theme: "slate",
        items: [
          "Make a tactical mistake? Simply hit 'Restart' or reload your latest quicksave.",
          "Build a team, win a battle, and feel proud.",
          "Media makes history exciting, visual, and easy to understand."
        ]
      },
      rightCol: {
        header: "IN AUTHENTIC HISTORICAL REALITY",
        subtitle: "The Irreversible Finality of Every Shot",
        theme: "golden",
        highlight: true,
        items: [
          "There is no restart button.",
          "Every single bullet ended a real life.",
          "It left behind an empty chair at home and a family crying forever."
        ]
      }
    },
    media: {
      url: "/assets/history/slide17-normandy-crosses.webp",
      caption: "Endless rows of crosses at Normandy: each representing an irreplaceable human life.",
      source: "U.S. Army Europe / Public Domain"
    },
    speakerNote: {
      timing: "16:00 – 17:00",
      cue: "Point out the profound moral difference between casual video game simulations and the permanent tragedy of real combat.",
      scriptSnippet: `Now, let us step back into our present time and think about what we learned.

As I said at the beginning, I love movies like Band of Brothers, The Pacific, Masters of the Air, and Enemy at the Gates. I also enjoy playing games like Company of Heroes and Call of Duty. Media is great because it makes history exciting, visual, and easy to understand. In a game, you can build a team, win a battle, and feel proud.

However, studying real history taught me one big lesson: Real war is completely different from a video game.

In a video game, if you make a mistake and get shot, you simply wait five seconds or press the "Restart" button. But in real life, there is no restart button. Every single bullet ended a real life, leaving behind an empty chair at home and a family crying forever.`,
      keyVocabulary: ["No restart button", "Empty chairs at dinner tables", "Permanent grief", "Media vs reality"]
    }
  },
  {
    id: 18,
    title: "'A BRUTISH, TERRIBLE WASTE'",
    subtitle: "The Veteran's Unvarnished Testimony on Combat",
    tag: "[ VETERAN TESTIMONY // HISTORICAL TRUTH ]",
    layoutType: "memorial-quote",
    content: {
      quote: {
        text: "War is brutish, inglorious, and a terrible waste.",
        author: "Eugene B. Sledge",
        role: "1st Marine Division, USMC",
        source: "With the Old Breed: At Peleliu and Okinawa"
      },
      lead: "The Authentic Perspective of Frontline Infantrymen",
      points: [
        {
          title: "FAR MORE MISERABLE THAN GLORIOUS",
          desc: "War was far more miserable than exciting.",
          accent: "red"
        },
        {
          title: "NOT FOR GLORY, BUT FOR BROTHERS",
          desc: "Soldiers did not fight because they loved violence.",
          accent: "brass"
        },
        {
          title: "TO SECURE FUTURE PEACE",
          desc: "They fought because they wanted to protect their homes and bring back peace.",
          accent: "olive"
        }
      ]
    },
    media: {
      url: pacificSledgeGallery[0].url,
      caption: pacificSledgeGallery[0].caption,
      source: pacificSledgeGallery[0].source,
      gallery: pacificSledgeGallery,
      galleryGroup: "pacific-sledge"
    },
    speakerNote: {
      timing: "17:00 – 18:00",
      cue: "Read Sledge's quote with quiet reverence. Emphasize that real combat veterans rejected the romanticization of war.",
      scriptSnippet: `In movies, fighting often looks exciting. But when you read real memoirs — like the book With the Old Breed by Eugene Sledge, who served in the 1st Marine Division — you learn that war was far more miserable than exciting. Sledge wrote about sitting in deep mud for weeks, smelling death, and fighting sickness and fear every minute. He wrote simply: "War is brutish, inglorious, and a terrible waste."

That is why reading real history is so important. Movies give us the pictures, but real historical books give us the truth. They show us that soldiers did not fight because they loved violence; they fought because they wanted to protect their homes and bring back peace.`,
      keyVocabulary: ["Eugene Sledge", "Brutish, inglorious, and a terrible waste", "With the Old Breed", "Far more miserable than..."]
    }
  },
  {
    id: 19,
    title: "THE FRAGILITY OF MODERN PEACE",
    subtitle: "The Ultimate Philosophical Takeaway for Our Generation",
    tag: "[ PHILOSOPHICAL CONCLUSION // LESSON FOR TODAY ]",
    layoutType: "memorial-quote",
    content: {
      quote: {
        text: "Those who cannot remember the past are condemned to repeat it.",
        author: "George Santayana",
        role: "Philosopher & Cultural Essayist",
        source: "The Life of Reason (1905)"
      },
      lead: "Why the Crucible of 1939–1945 Still Demands Our Attention Today",
      points: [
        {
          title: "PEACE IS NOT PERMANENT",
          desc: "Peace is not as permanent as we think.",
          accent: "red"
        },
        {
          title: "FAR MORE FRAGILE THAN IT LOOKS",
          desc: "Peace is much more fragile than it looks.",
          accent: "brass"
        },
        {
          title: "PURCHASED AT HIGHEST PRICE",
          desc: "Our peace, safety, and freedom were bought with blood and tears.",
          accent: "olive"
        }
      ]
    },
    media: {
      url: "/assets/history/slide17-normandy-crosses.webp",
      caption: "Rows of crosses at Normandy: peace remembered through the price paid for it.",
      source: "U.S. Army Europe / Public Domain"
    },
    speakerNote: {
      timing: "18:00 – 19:00",
      cue: "Deliver your core philosophical message: studying WWII is the most important guardrail against repeating human catastrophe.",
      scriptSnippet: `To finish my presentation, let us return to the main question: If I had a time machine, why choose World War II?

I choose this era not because I like guns or explosions. I choose it because I have a deep love and respect for peace.

In our modern life, it is very easy to take peace for granted. We wake up in warm beds, go to school or work safely, meet friends for coffee, and play video games in quiet rooms. We often think that peace is natural and will last forever.

However, looking back at 1939 to 1945 shows us that peace is not as permanent as we think; it is much more fragile. The peace, safety, and freedom we enjoy today were bought at the highest possible price — with the blood and tears of tens of millions of ordinary people around the world.

A famous philosopher named George Santayana once said:

"Those who cannot remember the past are condemned to repeat it."`,
      keyVocabulary: ["Fragility of peace", "Not as permanent as...", "George Santayana", "Highest possible price"]
    }
  },
  {
    id: 20,
    title: "CONCLUSION & OPEN FORUM",
    subtitle: "A Humbling Journey Across the Threshold of History",
    tag: "[ DEBRIEFING COMPLETE // OPEN Q&A ]",
    layoutType: "conclusion",
    content: {
      lead: "Thank You For Traveling Through History With Me",
      quote: {
        text: "Traveling back to 1939–1945 is not an entertaining vacation; it is a humbling reminder to cherish peace every single day, to reject hatred, and to treat each other with kindness.",
        author: "Closing Statement",
        role: "Speaker's Reflection"
      },
      points: [
        {
          title: "OPEN DISCUSSION",
          desc: "Thank you very much for listening. I am ready to answer your questions now.",
          accent: "brass"
        },
        {
          title: "HONORING MEMORY",
          desc: "Appreciate every day of peace, reject hatred, and treat each other with kindness.",
          accent: "olive"
        }
      ]
    },
    speakerNote: {
      timing: "19:00 – 20:00",
      cue: "Conclude with warm conviction, thank your audience, and invite open discussion and questions from the room.",
      scriptSnippet: `Traveling back to World War II as an invisible witness would not be a fun vacation. It would be a serious and humbling lesson. It would remind all of us to appreciate every single day of peace, to reject hatred, and to treat each other with kindness.

Thank you very much for listening! I am ready to answer your questions now.`,
      keyVocabulary: ["Humbling lesson", "Cherish peace", "Reject hatred", "Open discussion"]
    }
  }
];
