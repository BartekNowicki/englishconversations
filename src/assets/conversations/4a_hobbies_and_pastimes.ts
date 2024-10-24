export const title = "Hobbies and Pastimes";

export const conversation = [
  {
    speaker: "Tom",
    text: "It's funny how our pastimes change over the years. When I was younger, I used to play video games every day, but now I barely play them.",
  },
  {
    speaker: "Sara",
    text: "I know what you mean! I used to love painting, but these days I’m more into yoga. It’s interesting how our interests shift as we get older.",
  },
  {
    speaker: "Tom",
    text: "Yeah, and some hobbies stick with us, while others just disappear over time.",
  },
  {
    speaker: "Sara",
    text: "Exactly. I picked up baking during the lockdown, and now it’s something I really enjoy.",
  },
  {
    speaker: "Tom",
    text: "That's awesome! Sometimes hobbies even turn into something more than just fun.",
  },
  {
    speaker: "Sara",
    text: "Definitely. I know people who turned their hobby into a full-time job.",
  },
  {
    speaker: "Tom",
    text: "It’s great when that happens. But even if it doesn’t, hobbies are still an ideal way to recharge.",
  },
  {
    speaker: "Sara",
    text: "And to make new friends! I joined a running group recently, and it’s been so nice connecting with others who enjoy it too.",
  },
  {
    speaker: "Tom",
    text: "Hobbies really do bring people together. I have friends who get together every week for board game nights, and it’s always a blast.",
  },
  {
    speaker: "Sara",
    text: "That sounds fun! It’s amazing how hobbies create these little communities.",
  },
  {
    speaker: "Tom",
    text: "Yeah, and they give us something to enjoy outside of work or other responsibilities.",
  },
  {
    speaker: "Sara",
    text: "True. Hobbies are important for keeping life balanced.",
  },
  {
    speaker: "Tom",
    text: "Exactly. We should always set aside time for our passions, even when we’re busy.",
  },
  {
    speaker: "Sara",
    text: "I agree. Hobbies help ease the tension and keep us happy.",
  },
  {
    speaker: "Tom",
    text: "Definitely. I’ve been trying to get back into cycling, and it really helps me clear my mind.",
  },
  {
    speaker: "Sara",
    text: "That’s great! It’s important to find hobbies that make us feel good.",
  },
  {
    speaker: "Tom",
    text: "Yeah, it’s not always about being good at something. It’s more about enjoying the process.",
  },
  {
    speaker: "Sara",
    text: "Exactly! Whether it's painting, running, or reading a good book, our pastimes make life richer.",
  },
  {
    speaker: "Tom",
    text: "I couldn’t agree more. Hobbies are the perfect way to relax and recharge after a busy day.",
  },
  {
    speaker: "Sara",
    text: "Absolutely. They help us stay grounded, especially when life gets hectic.",
  }
];

export const clickables = [
  "barely play them",
  "I’m more into",
  "our interests shift",
  "stick with us",
  "I picked up baking",
  "turned their hobby into a full-time job",
  "an ideal way to recharge",
  "to make new friends",
  "connecting with others",
  "bring people together",
  "create these little communities",
  "enjoy outside of work",
  "set aside time for",
  "ease the tension",
  "I couldn’t agree more",
];

export const clickablesPl = [
  "prawie w nie nie gram",
  "bardziej interesuję się",
  "nasze zainteresowania się zmieniają",
  "zostają z nami",
  "zajęłam się pieczeniem",
  "zamienili swoje hobby w pracę na pełen etat",
  "idealny sposób na regenerację",
  "poznać nowych znajomych",
  "nawiązywać kontakty z innymi",
  "zbliżają ludzi",
  "tworzyć takie małe społeczności",
  "cieszyć się poza pracą",
  "zarezerwować czas na",
  "zmniejszyć napięcie",
  "całkowicie się zgadzam"
];

export const definitions = [
  "play them very rarely or infrequently",
  "I’m more interested in something else",
  "our preferences or hobbies change over time",
  "they remain with us for a long period",
  "I started baking as a new hobby",
  "turned what they love into a full-time career",
  "a perfect way to relax and gain energy",
  "meet new people and make friendships",
  "engaging socially with others",
  "help people connect and unite",
  "form small groups or communities with common interests",
  "something to enjoy during free time, outside of work responsibilities",
  "reserve time specifically for certain activities",
  "reduce or lessen the stress or pressure",
  "I completely agree with what you’re saying"
];

export const discussionQuestions = [
  "1. How have your pastimes or hobbies changed as you’ve grown older?",
  "2. Have you ever thought about turning a hobby into a career?",
  "3. How can hobbies help people meet and connect with others?",
  "4. Why is it important to make time for hobbies in our daily lives?",
  "5. What are some hobbies that help you relax and feel good?"
];

export const clickableDistractors = [
  {
    phrase: "barely play them",
    definition: "play them very rarely or infrequently",
    distractors: [
      "barely plays them",
      "rarely play them",
      "barely play at them",
    ],
  },
  {
    phrase: "I’m more into",
    definition: "I’m more interested in something else",
    distractors: [
      "I’m more onto",
      "I’m bore into",
      "I’m more in to",
    ],
  },
  {
    phrase: "our interests shift",
    definition: "our preferences or hobbies change over time",
    distractors: [
      "your interests shift",
      "our interests lifts",
      "our interests shifts",
    ],
  },
  {
    phrase: "stick with us",
    definition: "they remain with us for a long period",
    distractors: [
      "stick on us",
      "stack with us",
      "stick in us",
    ],
  },
  {
    phrase: "I picked up baking",
    definition: "I started baking as a new hobby",
    distractors: [
      "I picked on baking",
      "I ticked up baking",
      "I picked up backing",
    ],
  },
  {
    phrase: "turned their hobby into a full-time job",
    definition: "turned what they love into a full-time career",
    distractors: [
      "turned their hobby at a full-time job",
      "turned their lobby into a full-time job",
      "burned their hobby into a full-time job",
    ],
  },
  {
    phrase: "an ideal way to recharge",
    definition: "a perfect way to relax and gain energy",
    distractors: [
      "an ideal way on recharge",
      "an ideal way to retake",
      "an ideal way in recharge",
    ],
  },
  {
    phrase: "to make new friends",
    definition: "meet new people and make friendships",
    distractors: [
      "to make new friend",
      "to bake new friends",
      "to make on new friends",
    ],
  },
  {
    phrase: "connecting with others",
    definition: "engaging socially with others",
    distractors: [
      "connecting at others",
      "collecting with others",
      "connecting with bothers",
    ],
  },
  {
    phrase: "bring people together",
    definition: "help people connect and unite",
    distractors: [
      "bring people on together",
      "bring peoples together",
      "bring people apart",
    ],
  },
  {
    phrase: "create these little communities",
    definition: "form small groups or communities with common interests",
    distractors: [
      "create these little commodities",
      "create those little communities",
      "create these little communists",
    ],
  },
  {
    phrase: "enjoy outside of work",
    definition: "something to enjoy during free time, outside of work responsibilities",
    distractors: [
      "enjoy outside at work",
      "enjoy outside of walk",
      "enjoy inside of work",
    ],
  },
  {
    phrase: "set aside time for",
    definition: "reserve time specifically for certain activities",
    distractors: [
      "set aside time on",
      "set a side time for",
      "sat aside time for",
    ],
  },
  {
    phrase: "ease the tension",
    definition: "reduce or lessen the stress or pressure",
    distractors: [
      "ease on the tension",
      "please the tension",
      "ease the detention",
    ],
  },
  {
    phrase: "I couldn’t agree more",
    definition: "I completely agree with what you’re saying",
    distractors: [
      "I wouldn’t agree more",
      "I couldn’t agree on more",
      "I couldn’t agree bore",
    ],
  },
];

