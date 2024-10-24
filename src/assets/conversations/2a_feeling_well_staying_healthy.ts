export const title = "Feeling Well and Staying Healthy";

export const conversation = [
  {
    speaker: "Tom",
    text: "I’ve been feeling a bit off lately. I think I might be coming down with something.",
  },
  {
    speaker: "Sara",
    text: "Oh no! I hope it’s nothing serious. Have you been getting enough rest?",
  },
  {
    speaker: "Tom",
    text: "Not really. I’ve been staying up late working and I haven’t been sleeping well.",
  },
  {
    speaker: "Sara",
    text: "That’s probably why you’re feeling sick. Sleep is so important for staying healthy.",
  },
  {
    speaker: "Tom",
    text: "I know, but it’s hard to sleep when I have so much on my mind.",
  },
  {
    speaker: "Sara",
    text: "Maybe try relaxing before bed, like reading a book or drinking some tea.",
  },
  {
    speaker: "Tom",
    text: "That’s a good idea. I’ve been drinking too much coffee lately, and it’s probably not helping.",
  },
  {
    speaker: "Sara",
    text: "Yeah, caffeine can mess with your sleep. You should switch to water or herbal tea in the evening.",
  },
  {
    speaker: "Tom",
    text: "I’ll try that. I really don’t want to get sick, especially with everything going on at work.",
  },
  {
    speaker: "Sara",
    text: "Work will still be there. Your health comes first. You don’t want to burn out.",
  },
  {
    speaker: "Tom",
    text: "You’re right. I need to take better care of myself. I’ve also been skipping meals.",
  },
  {
    speaker: "Sara",
    text: "Skipping meals? No wonder you’re feeling off! You need to eat regularly to keep your energy up.",
  },
  {
    speaker: "Tom",
    text: "Yeah, I’ve been so busy that I forget to eat sometimes.",
  },
  {
    speaker: "Sara",
    text: "Try preparing some easy meals ahead of time. That way you don’t have to think about it when you’re busy.",
  },
  {
    speaker: "Tom",
    text: "That’s a great idea. I’ll do that this weekend.",
  },
  {
    speaker: "Sara",
    text: "Good! And remember, it’s okay to take a break when you’re not feeling well.",
  },
  {
    speaker: "Tom",
    text: "I’ll keep that in mind. Thanks for the advice!",
  },
  {
    speaker: "Sara",
    text: "No problem. Just take care of yourself, okay?",
  },
  {
    speaker: "Tom",
    text: "Will do! I’ll try to rest and get back on track."
  },
  {
      speaker: "Sara",
      text: "That’s the spirit!"
    }
];

export const clickables = [
  "feeling a bit off",
  "coming down with something",
  "getting enough rest",
  "staying up late working",
  "so much on my mind",
  "relaxing before bed",
  "mess with your sleep",
  "Your health comes first",
  "to take better care of",
  "skipping meals",
  "keep your energy up",
  "preparing some easy meals",
  "I’ll keep that in mind",
  "get back on track",
  "That’s the spirit"
];

export const clickablesPl = [
  "czuć się nieco źle",
  "chyba się rozchoruję",
  "wystarczająco odpoczywać",
  "zostawać do późna pracując",
  "mam tyle na głowie",
  "zrelaksować się przed snem",
  "wpływać na twój sen",
  "twoje zdrowie jest najważniejsze",
  "lepiej o siebie dbać",
  "pomijać posiłki",
  "utrzymywać swoją energię",
  "przygotować proste posiłki",
  "Zapamiętam to.",
  "wrócić na właściwy tor",
  "podoba mi się twoje nastawienie"
];

export const definitions = [
  "feeling slightly unwell",
  "starting to get sick",
  "getting adequate sleep",
  "staying up late to work",
  "having too much on your mind",
  "relaxing before going to bed",
  "disrupting your sleep",
  "your health is the most important thing",
  "prioritizing your well-being",
  "missing meals",
  "maintaining your energy levels",
  "preparing simple meals in advance",
  "I will remember that",
  "getting back to a good routine",
  "that's the right attitude"
];

export const discussionQuestions = [
  "1. Do you often feel tired or unwell because of your lifestyle?",
  "2. What can you do to balance work or school with staying healthy?",
  "3. How important is rest for maintaining good health?",
  "4. What simple habits help you stay physically and mentally fit?",
  "5. How do you prioritize your health when life gets busy?"
];

export const clickableDistractors = [
  {
    phrase: "feeling a bit off",
    definition: "feeling slightly unwell",
    distractors: [
      "feeling a bit on",
      "feeling a bit out",
      "feeling a bit at",
    ],
  },
  {
    phrase: "coming down with something",
    definition: "starting to get sick",
    distractors: [
      "coming down on something",
      "coming down in something",
      "coming down by something",
    ],
  },
  {
    phrase: "getting enough rest",
    definition: "getting adequate sleep",
    distractors: [
      "setting enough rest",
      "betting enough rest",
      "getting enough best",
    ],
  },
  {
    phrase: "staying up late working",
    definition: "staying up late to work",
    distractors: [
      "staying up late walking",
      "staying up late lurking",
      "staying up late jerking",
    ],
  },
  {
    phrase: "so much on my mind",
    definition: "having too much on your mind",
    distractors: [
      "so much at my mind",
      "so much of my mind",
      "so much in my mind",
    ],
  },
  {
    phrase: "relaxing before bed",
    definition: "relaxing before going to bed",
    distractors: [
      "relaxing before head",
      "relaxing before shed",
      "relaxing before thread",
    ],
  },
  {
    phrase: "mess with your sleep",
    definition: "disrupting your sleep",
    distractors: [
      "mess at your sleep",
      "mess with your leap",
      "mess through your sleep",
    ],
  },
  {
    phrase: "Your health comes first",
    definition: "your health is the most important thing",
    distractors: [
      "Your health comes thirst",
      "Your health comes worst",
      "Your health comes burst",
    ],
  },
  {
    phrase: "to take better care of",
    definition: "prioritizing your well-being",
    distractors: [
      "to take better care in",
      "to take better care on",
      "to take better care by",
    ],
  },
  {
    phrase: "skipping meals",
    definition: "missing meals",
    distractors: [
      "skipping deals",
      "skipping seals",
      "skipping heals",
    ],
  },
  {
    phrase: "keep your energy up",
    definition: "maintaining your energy levels",
    distractors: [
      "keep your energy on",
      "keep your energy down",
      "keep your energy by",
    ],
  },
  {
    phrase: "preparing some easy meals",
    definition: "preparing simple meals in advance",
    distractors: [
      "preparing some easy seals",
      "preparing some easy deals",
      "preparing some easy heels",
    ],
  },
  {
    phrase: "I’ll keep that in mind",
    definition: "I will remember that",
    distractors: [
      "I’ll keep that on mind",
      "I’ll keep that in bind",
      "I’ll keep that in kind",
    ],
  },
  {
    phrase: "get back on track",
    definition: "getting back to a good routine",
    distractors: [
      "get back in track",
      "get back by track",
      "get back at track",
    ],
  },
  {
    phrase: "That’s the spirit",
    definition: "that's the right attitude",
    distractors: [
      "That’s the sprint",
      "That’s the spurt",
      "That’s the spur",
    ],
  },
];
