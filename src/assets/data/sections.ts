import { paragraph1_1, paragraph1_2, paragraph1_3, paragraph1_4, paragraph1_5, paragraph1_6, paragraph1_7 } from './section1';
import { paragraph2a_1, paragraph2a_2, paragraph2a_3, paragraph2a_4, paragraph2a_5 } from './section2a';
import { paragraph2b_1, paragraph2b_2, paragraph2b_3, paragraph2b_4, paragraph2b_5 } from './section2b';
import { paragraph3_1, paragraph3_2, paragraph3_3, paragraph3_4, paragraph3_5, paragraph3_6, paragraph3_7, paragraph3_8, paragraph3_9} from './section3';
import { paragraph4_1, paragraph4_2, paragraph4_3, paragraph4_4, paragraph4_5 } from './section4';
import { paragraph5_1, paragraph5_2, paragraph5_3, paragraph5_4, paragraph5_5, paragraph5_6, paragraph5_7, paragraph5_8, paragraph5_9, paragraph5_10 } from './section5';
import { paragraph6_1, paragraph6_2, paragraph6_3, paragraph6_4, paragraph6_5, paragraph6_6 } from './section6';
import { paragraph7_1, paragraph7_2, paragraph7_3, paragraph7_4, paragraph7_5, paragraph7_6 } from './section7';

import konwersacje from '../konwersacje.jpg';
import rozwiazanie from '../rozwiazanie.jpg';
import warsztaty from '../warsztaty_angielski.jpg';
import bartek from '../Bartek.jpg';
import metodologia from '../metodologia.jpg';
import zapisy from '../zapisy.jpg';
import cennik from '../cennik.jpg';
import lokalizacja from '../lokalizacja.jpg';
import english_in_movement from '../english_in_movement.jpg';
import english_in_psychology from '../english_in_psychology.jpg';
import english_in_it from '../english_in_it.jpg';
import english_general from '../english_general.jpg';

const sections = [
  {
    id: "section1",
    header: "Konwersacje - na co zwrócić uwagę?",
    text: [paragraph1_1, paragraph1_2, paragraph1_3, paragraph1_4, paragraph1_5, paragraph1_6, paragraph1_7],
    image: konwersacje
  },
  {
    id: "section2a",
    header: "Lekcje konwersacyjne",
    text: [paragraph2a_1, paragraph2a_2, paragraph2a_3, paragraph2a_4, paragraph2a_5],
    image: rozwiazanie
  },
  {
      id: "courseList",
      header: 'Oferta lekcji konwersacyjnych',
      courses: [
        {
          id: 'course1',
          title: 'Konwersacje ogólne',
          description: 'Join our General English Conversation class, designed for anyone looking to improve their fluency and confidence in everyday English. Whether you’re preparing for travel, work, or simply want to enhance your communication skills, this class provides a friendly, relaxed environment to practice speaking. You’ll engage in discussions on various topics, expand your vocabulary, and improve your pronunciation while receiving personalized feedback. Perfect for learners of all levels who want to speak English more naturally and confidently.',
          image: english_general,
        },
        {
          id: 'course2',
          title: 'English in Sports and Movement',
          description: 'Are you a yoga teacher, Pilates instructor, fitness coach, or dance trainer teaching in English? English In Movement is a unique conversation class designed to help you accurately describe movements, postures, and adjustments with confidence. Practice giving clear instructions, refine your language skills, and learn to express corrections effectively, all in the context of teaching physical activities. This class is perfect for movement professionals who want to improve their communication while leading classes in English.',
          image: english_in_movement,
        },
        {
          id: 'course3',
          title: 'English in Psychology and Psychotherapy',
          description: 'Enhance your ability to communicate effectively in English within the field of psychology and psychotherapy. This course is designed for professionals who want to improve their language skills when discussing psychological concepts, client interactions, and therapeutic practices. You’ll practice key terminology, engage in role-playing sessions, and learn how to articulate complex psychological ideas clearly and empathetically in English. Ideal for psychologists, therapists, and counselors working in international or English-speaking environments.',
          image: english_in_psychology,
        },
        {
          id: 'course4',
          title: 'English in IT',
          description: 'Boost your professional communication skills with English tailored for the IT industry. This course is perfect for IT professionals who need to discuss technical concepts, collaborate with international teams, or present ideas clearly in English. You’ll focus on industry-specific terminology, technical writing, and effective communication during meetings or presentations. Whether you’re a developer, project manager, or IT support specialist, this course will help you excel in an English-speaking tech environment.',
          image: english_in_it,
        },
      ],
    },
  {
    id: "section2b",
    header: "Warsztaty",
    text: [paragraph2b_1, paragraph2b_2, paragraph2b_3, paragraph2b_4, paragraph2b_5],
    image: warsztaty
  },
  {
    id: "section3",
    header: "Garść informacji o mnie",
    text: [paragraph3_1, paragraph3_2, paragraph3_3, paragraph3_4, paragraph3_5, paragraph3_6, paragraph3_7, paragraph3_8, paragraph3_9],
    image: bartek
  },
  {
    id: "section4",
    header: "Metodologia podejścia leksykalnego",
    text: [paragraph4_1, paragraph4_2, paragraph4_3, paragraph4_4, paragraph4_5],
    image: metodologia
  },
  {
    id: "section5",
    header: "Zapisy",
    text: [paragraph5_1, paragraph5_2, paragraph5_3, paragraph5_4, paragraph5_5, paragraph5_6, paragraph5_7, paragraph5_8, paragraph5_9, paragraph5_10],
    image: zapisy
  },
  {
      id: "section6",
      header: "Cennik",
      text: [paragraph6_1, paragraph6_2, paragraph6_3, paragraph6_4, paragraph6_5, paragraph6_6],
      image: cennik
  },
  {
      id: "section7",
      header: "Lokalizacja",
      text: [paragraph7_1, paragraph7_2, paragraph7_3, paragraph7_4, paragraph7_5, paragraph7_6],
      image: lokalizacja
    }
];

export default sections;