export const title = "The Daily Routine";

export const conversation = [
  {
    speaker: "Tom",
    text: "My mornings are always hectic. I set my alarm early, but sometimes I hit snooze and end up rushing out the door without breakfast.",
  },
  {
    speaker: "Sara",
    text: "I used to do the same, but now I get up as soon as the alarm goes off and make sure to prepare everything the night before. It saves me a lot of stress.",
  },
  {
    speaker: "Tom",
    text: "That’s smart. I should try that. After my commute, it’s back-to-back meetings all day at work.",
  },
  {
    speaker: "Sara",
    text: "Same here. It’s hard to stay focused when there are so many distractions, especially with constant emails and phone calls.",
  },
  {
    speaker: "Tom",
    text: "Exactly. By the time I get off work, I’m completely wiped out and I have no energy to cook dinner.",
  },
  {
    speaker: "Sara",
    text: "That’s why I’ve started meal prepping on Sundays. It’s a lifesaver during busy weeks.",
  },
  {
    speaker: "Tom",
    text: "That sounds like a great idea. How do you unwind after such a long day and commute?",
  },
  {
    speaker: "Sara",
    text: "I usually take some time to read or go for a walk. It helps me clear my mind before bed.",
  },
  {
    speaker: "Tom",
    text: "I should try that. I tend to stay glued to my phone after I get off work, which probably doesn’t help me relax.",
  },
  {
    speaker: "Sara",
    text: "Yeah, cutting down on screen time has really improved my sleep. You should give it a shot.",
  },
  {
    speaker: "Tom",
    text: "I’ll definitely try that. Another issue I have is keeping my energy levels up throughout the day.",
  },
  {
    speaker: "Sara",
    text: "Do you snack regularly? I find small, healthy snacks during the day keep me going.",
  },
  {
    speaker: "Tom",
    text: "I don’t snack much. I usually just wait for lunch, but maybe I should try eating smaller things in between meals.",
  },
  {
    speaker: "Sara",
    text: "It could help. Also, staying hydrated is key. Drinking water regularly can make a huge difference in how you feel.",
  },
  {
    speaker: "Tom",
    text: "I think I forget to drink water during the day. I get so caught up in work that I don't realize it.",
  },
  {
    speaker: "Sara",
    text: "It happens. Try keeping a water bottle at your desk to remind yourself to drink more often.",
  },
  {
    speaker: "Tom",
    text: "That’s a good idea. I’ll give it a try. Do you usually have time for exercise during the week?",
  },
  {
    speaker: "Sara",
    text: "I try to fit in at least 30 minutes a few times a week. It’s tough with work, but I feel better when I stick to it.",
  },
  {
    speaker: "Tom",
    text: "That’s something I need to improve on. I’ll aim to start with short workouts and build from there.",
  },
  {
    speaker: "Sara",
    text: "That’s the spirit! Just remember, small steps add up over time."
  }
];

export const clickables = [
  "set my alarm early",
  "hit snooze",
  "rushing out the door",
  "alarm goes off",
  "saves me a lot of stress",
  "After my commute",
  "back-to-back meetings",
  "stay focused when there are so many distractions",
  "By the time I get off work",
  "I’m completely wiped out",
  "meal prepping on Sundays",
  "It’s a lifesaver",
  "How do you unwind",
  "glued to my phone",
  "cutting down on screen time",
  "You should give it a shot",
  "Another issue I have",
  "keep me going",
  "fit in at least 30 minutes",
  "build from there",
];

export const clickablesPl = [
  "ustawiam budzik wcześnie",
  "włączam drzemkę",
  "wybiegać z domu w pośpiechu",
  "budzik się włącza",
  "oszczędza mi dużo stresu",
  "po mojej podróży",
  "spotkania jedno po drugim",
  "utrzymać koncentrację, gdy jest tyle rozproszeń",
  "do momentu kiedy wychodzę z pracy",
  "jestem całkowicie wyczerpany",
  "przygotowywanie posiłków w niedziele",
  "to jest ratunek",
  "Jak się relaksujesz?",
  "przyklejony do telefonu",
  "ograniczenie czasu przed ekranem",
  "Powinieneś spróbować",
  "innym moim problemem jest",
  "utrzymuje mnie na chodzie",
  "wcisnąć przynajmniej 30 minut",
  "budować na tym",
];

export const definitions = [
  "setting the alarm to go off early in the morning",
  "pressing the snooze button on an alarm to delay waking up for a few more minutes",
  "leaving the house quickly and often unprepared due to time pressure",
  "the moment the alarm sounds to wake someone up",
  "reduces the amount of stress significantly, making things easier or more manageable",
  "the period after traveling from home to work or back",
  "a series of meetings scheduled right after another without breaks in between",
  "maintaining concentration despite multiple interruptions or competing stimuli",
  "when I finish work and leave for home",
  "feeling extremely tired or exhausted, with no energy left",
  "preparing meals in advance on Sunday for the upcoming week to save time during busy days",
  "it's something that provides significant help in difficult situations",
  "the process of relaxing and relieving stress after a busy day",
  "constantly using or looking at the phone, unable to put it down",
  "reducing the amount of time spent looking at screens, such as phones or computers",
  "encouraging someone to try something or make an attempt at doing it",
  "another thing I struggle with",
  "something that helps to maintain energy and motivation during the day",
  "finding time to dedicate at least 30 minutes to an activity, usually exercise",
  "starting small and gradually increasing efforts or progress based on previous success",
];

export const clickableDistractors = [
  {
    phrase: "set my alarm early",
    definition: "setting the alarm to go off early in the morning",
    distractors: [
      "set my alarm nearly",
      "set my alarm at early",
      "bet my alarm early",
    ],
  },
  {
    phrase: "hit snooze",
    definition: "pressing the snooze button on an alarm to delay waking up for a few more minutes",
    distractors: [
      "hit loose",
      "hit snooze on",
      "fit snooze",
    ],
  },
  {
    phrase: "rushing out the door",
    definition: "leaving the house quickly and often unprepared due to time pressure",
    distractors: [
      "rushing in the door",
      "rushing out on door",
      "crushing out the door",
    ],
  },
  {
    phrase: "alarm goes off",
    definition: "the moment the alarm sounds to wake someone up",
    distractors: [
      "alarm goes on",
      "alarm blows off",
      "alarm goes at",
    ],
  },
  {
    phrase: "saves me a lot of stress",
    definition: "reduces the amount of stress significantly, making things easier or more manageable",
    distractors: [
      "saves me a lot for stress",
      "shaves me a lot of stress",
      "saves me lots at stress",
    ],
  },
  {
    phrase: "After my commute",
    definition: "the period after traveling from home to work or back",
    distractors: [
      "After by commute",
      "After my compute",
      "After my commute in",
    ],
  },
  {
    phrase: "back-to-back meetings",
    definition: "a series of meetings scheduled right after another without breaks in between",
    distractors: [
      "back-for-back meetings",
      "pack-to-back meetings",
      "back-to-back seatings",
    ],
  },
  {
    phrase: "stay focused when there are so many distractions",
    definition: "maintaining concentration despite multiple interruptions or competing stimuli",
    distractors: [
      "stay focused where there are so many distractions",
      "stay focused when there are too many attractions",
      "stay focused when there are so many destructions",
    ],
  },
  {
    phrase: "By the time I get off work",
    definition: "when I finish work and leave for home",
    distractors: [
      "By the time I set off work",
      "By the time I get of work",
      "By the time I get off work in",
    ],
  },
  {
    phrase: "I’m completely wiped out",
    definition: "feeling extremely tired or exhausted, with no energy left",
    distractors: [
      "I’m completely wiped in",
      "I’m completely hyped out",
      "I’m completely piped out",
    ],
  },
  {
    phrase: "meal prepping on Sundays",
    definition: "preparing meals in advance on Sunday for the upcoming week to save time during busy days",
    distractors: [
      "meal prepping in Sundays",
      "meal prepping on Monday",
      "meal stepping on Sundays",
    ],
  },
  {
    phrase: "It’s a lifesaver",
    definition: "it's something that provides significant help in difficult situations",
    distractors: [
      "It’s a lifesever",
      "It’s in lifesaver",
      "It’s a livesaver",
    ],
  },
  {
    phrase: "How do you unwind",
    definition: "the process of relaxing and relieving stress after a busy day",
    distractors: [
      "How do you unfind",
      "How you do unwind",
      "How do you wind on",
    ],
  },
  {
    phrase: "glued to my phone",
    definition: "constantly using or looking at the phone, unable to put it down",
    distractors: [
      "glued at my phone",
      "glued to my bone",
      "flued to my phone",
    ],
  },
  {
    phrase: "cutting down on screen time",
    definition: "reducing the amount of time spent looking at screens, such as phones or computers",
    distractors: [
      "cutting down in screen time",
      "cutting crown on screen time",
      "cutting down on scream time",
    ],
  },
  {
    phrase: "You should give it a shot",
    definition: "encouraging someone to try something or make an attempt at doing it",
    distractors: [
      "You should give at a shot",
      "You should give it a slot",
      "You would give it a shot",
    ],
  },
  {
    phrase: "Another issue I have",
    definition: "another thing I struggle with",
    distractors: [
      "Another issue at have",
      "Another tissue I have",
      "Another issue I halve",
    ],
  },
  {
    phrase: "keep me going",
    definition: "something that helps to maintain energy and motivation during the day",
    distractors: [
      "keep me glowing",
      "keep me gone",
      "keep me groaning",
    ],
  },
  {
    phrase: "fit in at least 30 minutes",
    definition: "finding time to dedicate at least 30 minutes to an activity, usually exercise",
    distractors: [
      "fit on at least 30 minutes",
      "sit in at least 30 minutes",
      "fit in the least 30 minutes",
    ],
  },
  {
    phrase: "build from there",
    definition: "starting small and gradually increasing efforts or progress based on previous success",
    distractors: [
      "build on there",
      "build from here",
      "guild from there",
    ],
  },
];

