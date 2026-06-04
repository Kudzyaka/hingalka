export interface WordCard {
  id: number;
  russian: string;
  southHangul: string;
  southTranscript: string;
  northHangul: string;
  northTranscript: string;
  explanation?: string;
  category: 'similarities' | 'differences' | 'ladybug' | 'docx' | 'custom';
  emoji?: string;
}

export const INITIAL_WORDS: WordCard[] = [
  // ==========================================
  // SET 1: БАЗОВЫЕ СЛОВА (Сходства)
  // ==========================================
  {
    id: 101,
    russian: "Вода",
    southHangul: "물",
    southTranscript: "муль",
    northHangul: "물",
    northTranscript: "муль",
    explanation: "Абсолютно идентичные слова. Фундаментальная лексика осталась неизменной.",
    category: "similarities",
    emoji: "💧"
  },
  {
    id: 102,
    russian: "Хлеб",
    southHangul: "빵",
    southTranscript: "ппан",
    northHangul: "빵",
    northTranscript: "ппан",
    explanation: "Слово происходит от португальского 'pão' и прижилось одинаково в обеих частях полуострова.",
    category: "similarities",
    emoji: "🍞"
  },
  {
    id: 103,
    russian: "Рис",
    southHangul: "쌀",
    southTranscript: "ссаль",
    northHangul: "쌀",
    northTranscript: "ссаль",
    explanation: "Главный злак Кореи. Название сырого риса одинаково на Севере и на Юге.",
    category: "similarities",
    emoji: "🍚"
  },
  {
    id: 104,
    russian: "Мясо",
    southHangul: "고기",
    southTranscript: "коги",
    northHangul: "고기",
    northTranscript: "коги",
    explanation: "Одинаковое слово для мяса в целом.",
    category: "similarities",
    emoji: "🥩"
  },
  {
    id: 105,
    russian: "Яблоко",
    southHangul: "사과",
    southTranscript: "сагва",
    northHangul: "사과",
    northTranscript: "сагва",
    explanation: "Традиционное корейское название яблока совпадает.",
    category: "similarities",
    emoji: "🍎"
  },
  {
    id: 106,
    russian: "Молоко",
    southHangul: "우유",
    southTranscript: "ую",
    northHangul: "우유",
    northTranscript: "ую",
    explanation: "Совпадающее слово, записываемое одинаковыми иероглифами (牛乳).",
    category: "similarities",
    emoji: "🥛"
  },
  {
    id: 107,
    russian: "Кофе",
    southHangul: "커피",
    southTranscript: "кхопхи",
    northHangul: "커피",
    northTranscript: "кхопхи",
    explanation: "Англицизм 'coffee' заимствован одинаково через транслитерацию.",
    category: "similarities",
    emoji: "☕"
  },
  {
    id: 108,
    russian: "Чай",
    southHangul: "차",
    southTranscript: "чха",
    northHangul: "차",
    northTranscript: "чха",
    explanation: "Традиционное слово восточноазиатского происхождения.",
    category: "similarities",
    emoji: "🍵"
  },
  {
    id: 109,
    russian: "Автомобиль",
    southHangul: "자동차",
    southTranscript: "чадончха",
    northHangul: "자동차",
    northTranscript: "чадончха",
    explanation: "Общее научно-техническое слово, означающее буквально 'самодвижущаяся телега'.",
    category: "similarities",
    emoji: "🚗"
  },
  {
    id: 110,
    russian: "Поезд",
    southHangul: "기차",
    southTranscript: "кичха",
    northHangul: "기차",
    northTranscript: "кичха",
    explanation: "Буквально 'паровая телега'. Общекорейский термин.",
    category: "similarities",
    emoji: "🚂"
  },
  {
    id: 111,
    russian: "Самолёт",
    southHangul: "비행기",
    southTranscript: "пихэнги",
    northHangul: "비행기",
    northTranscript: "пихэнги",
    explanation: "Буквально 'летящая машина'. Слово полностью совпадает.",
    category: "similarities",
    emoji: "✈️"
  },
  {
    id: 112,
    russian: "Корабль",
    southHangul: "배",
    southTranscript: "пэ",
    northHangul: "배",
    northTranscript: "пэ",
    explanation: "Исконно корейское короткое слово для судна или лодки.",
    category: "similarities",
    emoji: "🚢"
  },
  {
    id: 113,
    russian: "Дом",
    southHangul: "집",
    southTranscript: "чип",
    northHangul: "집",
    northTranscript: "чип",
    explanation: "Исконно корейское слово для дома и очага.",
    category: "similarities",
    emoji: "🏠"
  },
  {
    id: 114,
    russian: "Школа",
    southHangul: "학교",
    southTranscript: "хаккё",
    northHangul: "학교",
    northTranscript: "хаккё",
    explanation: "В базовом значении учебного заведения используется одно и то же слово китайского происхождения (學校).",
    category: "similarities",
    emoji: "🏫"
  },
  {
    id: 115,
    russian: "Больница",
    southHangul: "병원",
    southTranscript: "пёнвон",
    northHangul: "병원",
    northTranscript: "пёнвон",
    explanation: "Общий медицинский термин для больниц и клиник.",
    category: "similarities",
    emoji: "🏥"
  },
  {
    id: 116,
    russian: "Полиция",
    southHangul: "경찰",
    southTranscript: "кёнчхаль",
    northHangul: "경찰",
    northTranscript: "кёнчхаль",
    explanation: "Органы правопорядка называются одинаково.",
    category: "similarities",
    emoji: "👮"
  },

  // ==========================================
  // SET 2: РАЗГОВОРНЫЙ КОНТРАСТ (Различия)
  // ==========================================
  {
    id: 201,
    russian: "Человек",
    southHangul: "사람",
    southTranscript: "сарам",
    northHangul: "사람",
    northTranscript: "сарам",
    explanation: "Хотя слово совпадает, оно подчеркивает единое начало корейской нации.",
    category: "differences",
    emoji: "🧑"
  },
  {
    id: 202,
    russian: "Еда",
    southHangul: "음식",
    southTranscript: "сик",
    northHangul: "밥",
    northTranscript: "пап",
    explanation: "В Южной Корее чаще используют официальное '음식' (пища), а на Севере в значении 'еда' употребляют слово '밥' (приготовленный рис/обед).",
    category: "differences",
    emoji: "🍲"
  },
  {
    id: 203,
    russian: "Школа (учебное заведение)",
    southHangul: "학교",
    southTranscript: "хаккё",
    northHangul: "학원",
    northTranscript: "хагвон",
    explanation: "В Южной Корее '학원' — это коммерческая частная академия (хагвон). В КНДР же '학원' используется для обозначения некоторых специализированных государственных школ.",
    category: "differences",
    emoji: "🏫"
  },
  {
    id: 204,
    russian: "Учитель",
    southHangul: "선생님",
    southTranscript: "сонсэнним",
    northHangul: "교원",
    northTranscript: "кёвон",
    explanation: "На Юге обращаются уважительно '선생님' (господин/учитель). На Севере используют более официальный термин '교원' (педагогический работник/преподаватель).",
    category: "differences",
    emoji: "👨‍🏫"
  },
  {
    id: 205,
    russian: "Телевизор",
    southHangul: "텔레비전",
    southTranscript: "тхэллебичжон",
    northHangul: "텔레비죤",
    northTranscript: "тхэллебичжон",
    explanation: "Разница в орфографии. Юг следует современным правилам транскрипции с английского (전), а Север сохранил старый вариант записи (죤).",
    category: "differences",
    emoji: "📺"
  },
  {
    id: 206,
    russian: "Мобильный телефон",
    southHangul: "휴대전화",
    southTranscript: "хюдэджонхва",
    northHangul: "손전화",
    northTranscript: "сонджонхва",
    explanation: "Юг использует слово '휴대전화' (портативный телефон) или англицизм '핸드폰'. На Севере принято описательное корейское название '손전화' (ручной телефон).",
    category: "differences",
    emoji: "📱"
  },
  {
    id: 207,
    russian: "Автомобиль (легковой)",
    southHangul: "자동차",
    southTranscript: "чадончха",
    northHangul: "승용차",
    northTranscript: "сынъёнчха",
    explanation: "В разговорной речи на Севере легковой автомобиль часто называют '승용차' (машина для катания пассажиров), в то время как на Юге чаще говорят в целом '자동차' или '차'.",
    category: "differences",
    emoji: "🚗"
  },
  {
    id: 208,
    russian: "Город",
    southHangul: "도시",
    southTranscript: "доси",
    northHangul: "시(市)",
    northTranscript: "си",
    explanation: "Южане говорят полное слово '도시' (городская местность). Северяне часто сокращают до одного иероглифического слога '시' (город).",
    category: "differences",
    emoji: "🏙️"
  },
  {
    id: 209,
    russian: "Леденец / Конфета",
    southHangul: "사탕",
    southTranscript: "сатхан",
    northHangul: "엿",
    northTranscript: "ёт",
    explanation: "На Севере леденцы называют словом '엿', которое на Юге означает традиционную тягучую сладость (ёот). На Юге конфеты — это '사탕' (сахарные сладости).",
    category: "differences",
    emoji: "🍭"
  },
  {
    id: 210,
    russian: "Картофель",
    southHangul: "감자",
    southTranscript: "камджа",
    northHangul: "감자알",
    northTranscript: "камджааль",
    explanation: "Буквально на Севере говорят '감자알' (картофельное яйцо / картофелина) для обозначения отдельных клубней.",
    category: "differences",
    emoji: "🥔"
  },
  {
    id: 211,
    russian: "Туалет",
    southHangul: "화장실",
    southTranscript: "хваджансиль",
    northHangul: "변소",
    northTranscript: "пёнсо",
    explanation: "Южный термин '화장실' буквально переводится как 'комната для макияжа/приведения себя в порядок'. На Севере сохранился традиционный иероглифический термин '변소' (уборная).",
    category: "differences",
    emoji: "🚽"
  },
  {
    id: 212,
    russian: "Жевательная резинка",
    southHangul: "껌",
    southTranscript: "кком",
    northHangul: "풍선껌",
    northTranscript: "пхунсонкком",
    explanation: "В Южной Корее используют заимствованное '껌' (gum). В Северной Корее принято говорить '풍선껌' (надувная жвачка / жвачка-шар).",
    category: "differences",
    emoji: "🍬"
  },
  {
    id: 213,
    russian: "Университет",
    southHangul: "대학교",
    southTranscript: "тэхаккё",
    northHangul: "종합대학",
    northTranscript: "чонхаптэхак",
    explanation: "На Юге вуз называют '대학교'. На Севере крупные вузы называют '종합대학' (комплексный/универсальный университет).",
    category: "differences",
    emoji: "🎓"
  },
  {
    id: 214,
    russian: "Футбол",
    southHangul: "축구",
    southTranscript: "чхукку",
    northHangul: "축구",
    northTranscript: "чхукку",
    explanation: "Название любимого вида спорта полностью совпадает в обеих странах.",
    category: "differences",
    emoji: "⚽"
  },
  {
    id: 215,
    russian: "Праздник",
    southHangul: "명절",
    southTranscript: "мёнчжоль",
    northHangul: "명절날",
    northTranscript: "мёнчжольнал",
    explanation: "Северный вариант добавляет суффикс '날' (день), подчеркивая, что это праздничный день.",
    category: "differences",
    emoji: "🎁"
  },

  // ==========================================
  // SET 3: МИР ЛЕДИ БАГ (Спецвыпуск)
  // ==========================================
  {
    id: 301,
    russian: "Герой / Героиня",
    southHangul: "영웅",
    southTranscript: "ёнун",
    northHangul: "영웅",
    northTranscript: "ёнун",
    explanation: "Одинаковое слово китайского происхождения (英雄) для отважных защитников.",
    category: "ladybug",
    emoji: "🦸‍♂️"
  },
  {
    id: 302,
    russian: "Превращение",
    southHangul: "변신",
    southTranscript: "пёнсин",
    northHangul: "변신",
    northTranscript: "пёнсин",
    explanation: "Слово, означающее трансформацию облика супергероев перед боем.",
    category: "ladybug",
    emoji: "✨"
  },
  {
    id: 303,
    russian: "Чудесная Божья Коровка",
    southHangul: "레이디버그",
    southTranscript: "рэйдибогы",
    northHangul: "무당벌레",
    northTranscript: "муданболле",
    explanation: "Юг транслитерирует английское название 'Ladybug'. Север использует исконное корейское слово '무당벌레' (божья коровка).",
    category: "ladybug",
    emoji: "🐞"
  },
  {
    id: 304,
    russian: "Чёрный кот (Супер-Кот)",
    southHangul: "블랙캣",
    southTranscript: "быллеккэт",
    northHangul: "검은고양이",
    northTranscript: "комынкояни",
    explanation: "Юг использует английское заимствование 'Black Cat'. Север переводит дословно: '검은고양이' (черная кошка).",
    category: "ladybug",
    emoji: "🐈‍⬛"
  },
  {
    id: 305,
    russian: "Акуматизация",
    southHangul: "아크마지화",
    southTranscript: "акхымаджихва",
    northHangul: "아크마화",
    northTranscript: "акхымахва",
    explanation: "Игровые гибридные неологизмы. На Севере слово звучит короче.",
    category: "ladybug",
    emoji: "🦋"
  },
  {
    id: 306,
    russian: "Талисман",
    southHangul: "부적",
    southTranscript: "пуджок",
    northHangul: "부적",
    northTranscript: "пуджок",
    explanation: "Традиционное слово для оберегов и амулетов одинаково на всем полуострове.",
    category: "ladybug",
    emoji: "🧿"
  },
  {
    id: 307,
    russian: "Сила",
    southHangul: "힘",
    southTranscript: "хим",
    northHangul: "힘",
    northTranscript: "хим",
    explanation: "Исконно корейское слово для физической и магической энергии.",
    category: "ladybug",
    emoji: "⭐"
  },
  {
    id: 308,
    russian: "Злодей",
    southHangul: "악당",
    southTranscript: "актан",
    northHangul: "악당",
    northTranscript: "актан",
    explanation: "Злые персонажи и антагонисты называются одинаково.",
    category: "ladybug",
    emoji: "🦹"
  },
  {
    id: 309,
    russian: "Чудеса (Миракулюсы)",
    southHangul: "미라클러스",
    southTranscript: "миракхыллосы",
    northHangul: "신기한 힘",
    northTranscript: "сингихан хим",
    explanation: "На Юге транслитерируют 'Miraculous'. На Севере описывают корейскими словами: '신기한 힘' (чудесная/таинственная сила).",
    category: "ladybug",
    emoji: "💖"
  },
  {
    id: 310,
    russian: "Квами",
    southHangul: "크와미",
    southTranscript: "кхывами",
    northHangul: "꼬마정령",
    northTranscript: "ккомаджонрён",
    explanation: "Существа-помощники. Юг заимствует имя 'Kwami'. Север поэтично описывает: '꼬마정령' (маленький дух).",
    category: "ladybug",
    emoji: "🦊"
  },
  {
    id: 311,
    russian: "Любовь",
    southHangul: "사랑",
    southTranscript: "саран",
    northHangul: "사랑",
    northTranscript: "саран",
    explanation: "Главное чувство, связывающее героев, называется одинаково.",
    category: "ladybug",
    emoji: "❤️"
  },
  {
    id: 312,
    russian: "Дружба",
    southHangul: "우정",
    southTranscript: "уджон",
    northHangul: "친선",
    northTranscript: "чхинсон",
    explanation: "На Юге используют '우정' (дружба между людьми). На Севере чаще звучит слово '친선' (дружественные отношения/солидарность).",
    category: "ladybug",
    emoji: "🤝"
  },
  {
    id: 313,
    russian: "Париж",
    southHangul: "파리",
    southTranscript: "пхари",
    northHangul: "빠리",
    northTranscript: "ппари",
    explanation: "Фонетическая разница. На Севере зарубежные названия транскрибируют жестче, ближе к оригинальному французскому произношению (с двойной согласной ㅃ).",
    category: "ladybug",
    emoji: "🗼"
  },
  {
    id: 314,
    russian: "Школа (где учатся герои)",
    southHangul: "학교",
    southTranscript: "хаккё",
    northHangul: "학원",
    northTranscript: "хагвон",
    explanation: "Повторение лексического контраста школа/академия.",
    category: "ladybug",
    emoji: "🏫"
  },
  {
    id: 315,
    russian: "Защита",
    southHangul: "수호",
    southTranscript: "сухо",
    northHangul: "보호",
    northTranscript: "похо",
    explanation: "Юг использует '수호' (охрана/покровительство), Север использует '보호' (защита/оберегание).",
    category: "ladybug",
    emoji: "🛡️"
  },
  {
    id: 316,
    russian: "Надежда",
    southHangul: "희망",
    southTranscript: "хыйманг",
    northHangul: "희망",
    northTranscript: "хыйманг",
    explanation: "Одинаковое слово для веры в лучшее будущее.",
    category: "ladybug",
    emoji: "🌸"
  },

  // ==========================================
  // SET 4: ЗАИМСТВОВАНИЯ VS ИСКОННЫЕ
  // ==========================================
  {
    id: 401,
    russian: "Сок",
    southHangul: "주스",
    southTranscript: "чжусы",
    northHangul: "단물",
    northTranscript: "танмуль",
    explanation: "Яркий пример пуризма. Южная Корея заимствовала английское 'juice'. Север заменил его исконным словом '단물', что переводится как 'сладкая вода'.",
    category: "docx",
    emoji: "🍹"
  },
  {
    id: 402,
    russian: "Шампунь",
    southHangul: "샴푸",
    southTranscript: "сямпху",
    northHangul: "머리물비누",
    northTranscript: "моримульбину",
    explanation: "В Южной Корее — английское 'shampoo'. В Северной — корейское слово-описание '머리물비누', означающее буквально 'жидкое мыло для головы'.",
    category: "docx",
    emoji: "🧴"
  },
  {
    id: 403,
    russian: "Лосьон для тела",
    southHangul: "스킨로션",
    southTranscript: "сыкхинросён",
    northHangul: "살결물",
    northTranscript: "сальгёльмуль",
    explanation: "В Южной Корее — 'skin lotion'. На Севере — исконно корейское '살결물' (буквально 'вода для текстуры кожи').",
    category: "docx",
    emoji: "🧴"
  },
  {
    id: 404,
    russian: "Обед / Ланч-бокс",
    southHangul: "도시락",
    southTranscript: "тосирак",
    northHangul: "곽밥",
    northTranscript: "квакпап",
    explanation: "На Юге используют историческое слово '도시락'. На Севере придумали термин '곽밥' (буквально 'коробочный рис').",
    category: "docx",
    emoji: "🍱"
  },
  {
    id: 405,
    russian: "Мюзикл",
    southHangul: "뮤지컬",
    southTranscript: "мючжикхоль",
    northHangul: "가무이야기",
    northTranscript: "камуияги",
    explanation: "Юг использует англицизм 'musical'. Север переводит описательно: '가무이야기' (история с песнями и танцами).",
    category: "docx",
    emoji: "🎭"
  },
  {
    id: 406,
    russian: "Мобильный телефон",
    southHangul: "핸드폰 / 휴대폰",
    southTranscript: "хэндпхон / хюдэпхон",
    northHangul: "손전화",
    northTranscript: "сонджонхва",
    explanation: "Южное разговорное '핸드폰' (hand phone) или официальное '휴대폰' против северного '손전화' (ручной телефон).",
    category: "docx",
    emoji: "📱"
  },
  {
    id: 407,
    russian: "Платье",
    southHangul: "드레스",
    southTranscript: "тырэсы",
    northHangul: "나리옷",
    northTranscript: "нариот",
    explanation: "Юг заимствовал слово 'dress'. На Севере используют красивое корейское слово '나리옷' (нарядное платье / праздничная одежда).",
    category: "docx",
    emoji: "👗"
  },
  {
    id: 408,
    russian: "Траурная церемония",
    southHangul: "장례식",
    southTranscript: "чангнэсик",
    northHangul: "애도식",
    northTranscript: "эдосик",
    explanation: "Юг использует '장례식' (ритуал похорон), Север использует государственное '애도식' (ритуал выражения скорби).",
    category: "docx",
    emoji: "🕯️"
  },
  {
    id: 409,
    russian: "Женщина",
    southHangul: "여성",
    southTranscript: "ёсон",
    northHangul: "녀성",
    northTranscript: "нёсон",
    explanation: "Фонетическая разница. В Южной Корее действует правило начального звука (두음법칙), убирающее согласную 'н' (н-ёсон -> ёсон). В Северной Корее закон не применяется, буква пишется и читается (녀성).",
    category: "docx",
    emoji: "👩"
  },
  {
    id: 410,
    russian: "Завтра",
    southHangul: "내일",
    southTranscript: "нэиль",
    northHangul: "래일",
    northTranscript: "рэиль",
    explanation: "Аналогичное фонетическое расхождение. На Юге начальная 'р' переходит в 'н' (рэиль -> нэиль), на Севере произносится исторический вариант (래일).",
    category: "docx",
    emoji: "📅"
  }
];
