export const title = "Writing Business Emails";

export const conversation = [
  {
    speaker: "Tom",
    text: "I wanted to confirm if you received the last email I sent regarding the changes in our policy.",
  },
  {
    speaker: "Sara",
    text: "Yes, I got it. I’m just reviewing everything before sending a final response.",
  },
  {
    speaker: "Tom",
    text: "Great, because we need to make sure we’re all set before the new regulations come into effect.",
  },
  {
    speaker: "Sara",
    text: "Absolutely. Due to the recent updates, there will be a few new requirements we need to address.",
  },
  {
    speaker: "Tom",
    text: "I’ll make sure to adjust our proposal accordingly. Can you confirm when you’ll be available for a follow-up meeting?",
  },
  {
    speaker: "Sara",
    text: "I’m available on Friday. Let’s go ahead and finalize everything then.",
  },
  {
    speaker: "Tom",
    text: "Perfect. I’ll send over a calendar invite for Friday morning.",
  },
  {
    speaker: "Sara",
    text: "Sounds good. Also, just a quick note—our legal team mentioned we’ll need a new contract based on the updated guidelines.",
  },
  {
    speaker: "Tom",
    text: "Thanks for the heads-up. I’ll get that drafted and sent over for review.",
  },
  {
    speaker: "Sara",
    text: "No problem. I’ll follow up with my team and ensure we’re aligned before we move forward.",
  },
  {
    speaker: "Tom",
    text: "In the meantime, if anything else comes up, feel free to reach out.",
  },
  {
    speaker: "Sara",
    text: "Sure, I’ll keep you updated with any further developments."
  },
  {
    speaker: "Tom",
    text: "Great, let’s make sure everything is ready for the final meeting."
  },
  {
    speaker: "Sara",
    text: "By the way, can you please include the legal team in your email? They’ll need to review it."
  },
  {
    speaker: "Tom",
    text: "Of course. I’ll copy them when I send the next draft."
  },
  {
    speaker: "Sara",
    text: "Thanks. Also, it’s important we double-check the new compliance requirements."
  },
  {
    speaker: "Tom",
    text: "Agreed. It’s better to be thorough than miss something critical."
  },
  {
    speaker: "Sara",
    text: "Exactly. It might take a little extra time, but it’s worth it to avoid issues later."
  },
  {
    speaker: "Tom",
    text: "Thanks for your attention to detail. I’ll follow up by the end of the day."
  },
  {
    speaker: "Sara",
    text: "No problem. I look forward to seeing the final draft."
  },
];

export const clickables = [
  "confirm if you received",
  "regarding the changes",
  "the new regulations come into effect",
  "Due to",
  "new requirements we need to address",
  "adjust our proposal",
  "follow-up meeting",
  "finalize everything",
  "send over a calendar invite",
  "based on the updated guidelines",
  "heads-up",
  "drafted and sent over for review",
  "we’re aligned",
  "feel free to reach out",
  "double-check",
];

export const clickablesPl = [
  "potwierdzić, czy otrzymałeś",
  "w związku ze zmianami",
  "nowe przepisy wchodzą w życie",
  "Ze względu na",
  "nowe wymagania, które musimy rozwiązać",
  "dostosować naszą propozycję",
  "spotkanie kontrolne",
  "sfinalizować wszystko",
  "wysłać zaproszenie w kalendarzu",
  "zgodnie z zaktualizowanymi wytycznymi",
  "informacja",
  "przygotowane i wysłane do przeglądu",
  "jesteśmy zgrani",
  "śmiało skontaktuj się",
  "sprawdzić jeszcze raz",
];


export const definitions = [
  "to check if someone received your email",
  "concerning the updates or modifications in policy",
  "when the new rules or laws start to apply",
  "because of a specific reason",
  "new conditions or rules that must be dealt with",
  "to modify or change our proposal to fit the new requirements",
  "a meeting to review progress or discuss details",
  "to complete and bring everything to a conclusion",
  "send a digital invitation for a meeting in a calendar app",
  "according to the updated rules or instructions",
  "an advance notice or warning",
  "prepared and sent to be reviewed",
  "everyone agrees and is on the same page",
  "you are welcome to contact if needed",
  "to check something again to ensure accuracy",
];

export const discussionQuestions = [
  "1. Why is it important to confirm if someone received your email?",
  "2. How do you handle changes in regulations that affect your work?",
  "3. What are some strategies for preparing and finalizing business agreements?",
  "4. How can you ensure your team is aligned on important tasks?",
  "5. Why is it important to double-check details in business communication?",
];

export const clickableDistractors = [
  {
    phrase: "confirm if you received",
    definition: "to check if someone received your email",
    distractors: [
      "confirm if you deceived",
      "confirm at you received",
      "conform if you received",
    ],
  },
  {
    phrase: "regarding the changes",
    definition: "concerning the updates or modifications in policy",
    distractors: [
      "regarding the ranges",
      "regarding at the changes",
      "regarding on changes",
    ],
  },
  {
    phrase: "the new regulations come into effect",
    definition: "when the new rules or laws start to apply",
    distractors: [
      "the new regulations come onto effect",
      "the new regulations come in effect",
      "the new regulations come out of effect",
    ],
  },
  {
    phrase: "Due to",
    definition: "because of a specific reason",
    distractors: [
      "Due on",
      "Dew to",
      "Due at",
    ],
  },
  {
    phrase: "new requirements we need to address",
    definition: "new conditions or rules that must be dealt with",
    distractors: [
      "new requirements we need at address",
      "new requirements we knead to address",
      "new requirements we need to undress",
    ],
  },
  {
    phrase: "adjust our proposal",
    definition: "to modify or change our proposal to fit the new requirements",
    distractors: [
      "adjust on proposal",
      "adjust their proposal",
      "adjust our proposel",
    ],
  },
  {
    phrase: "follow-up meeting",
    definition: "a meeting to review progress or discuss details",
    distractors: [
      "follow-up on meeting",
      "follow-up seating",
      "hollow-up meeting",
    ],
  },
  {
    phrase: "finalize everything",
    definition: "to complete and bring everything to a conclusion",
    distractors: [
      "finalize anything",
      "finalize everything at",
      "minimize everything",
    ],
  },
  {
    phrase: "send over a calendar invite",
    definition: "send a digital invitation for a meeting in a calendar app",
    distractors: [
      "send under a calendar invite",
      "send over at calendar invite",
      "send over a calendar incite",
    ],
  },
  {
    phrase: "based on the updated guidelines",
    definition: "according to the updated rules or instructions",
    distractors: [
      "based in the updated guidelines",
      "based up the updated guidelines",
      "basted on the updated guidelines",
    ],
  },
  {
    phrase: "heads-up",
    definition: "an advance notice or warning",
    distractors: [
      "heads-in",
      "heads-down",
      "leads-up",
    ],
  },
  {
    phrase: "drafted and sent over for review",
    definition: "prepared and sent to be reviewed",
    distractors: [
      "crafted and sent over for review",
      "drafted and sent in for review",
      "drafted and sent over for preview",
    ],
  },
  {
    phrase: "we’re aligned",
    definition: "everyone agrees and is on the same page",
    distractors: [
      "we’re aligned in",
      "we’re aligned at",
      "we’re aligned with",
    ],
  },
  {
    phrase: "feel free to reach out",
    definition: "you are welcome to contact if needed",
    distractors: [
      "feel free to teach out",
      "feel free to reach in",
      "feel fee to reach out",
    ],
  },
  {
    phrase: "double-check",
    definition: "to check something again to ensure accuracy",
    distractors: [
      "double-track",
      "double-check at",
      "double-stack",
    ],
  },
];

