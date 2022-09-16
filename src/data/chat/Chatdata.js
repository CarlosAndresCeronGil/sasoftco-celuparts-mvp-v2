import mock from '../mock';
import user1 from '../../assets/images/users/user1.jpg';
import user2 from '../../assets/images/users/user2.jpg';
import user3 from '../../assets/images/users/user3.jpg';
import user4 from '../../assets/images/users/user4.jpg';
import user5 from '../../assets/images/users/user5.jpg';

const ChatData = [
  {
    id: 1,
    name: 'James Johnson',
    status: 'online',
    thumb: user1,
    recent: false,
    excerpt: 'Theme Developer',
    chatHistory: [
      {
        0: {
          from: ['Tom got a small piece of pie.'],
          to: [
            "I'd rather be a bird than a fish.",
            'They got there early, and they got really good seats.',
          ],
        },
        1: {
          from: [
            'If I don’t like something, I’ll stay away from it.',
            'I want more detailed information.',
          ],
          to: ['We need to rent a room for our party.'],
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Maria Hernandez',
    status: 'away',
    thumb: user2,
    recent: true,
    excerpt: 'Doctor',
    chatHistory: [
      {
        0: {
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.'],
        },
        1: {
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.',
          ],
          to: ['Please wait outside of the house.'],
        },
      },
    ],
  },
  {
    id: 3,
    name: 'David Smith',
    status: 'busy',
    thumb: user3,
    recent: false,
    excerpt: 'Hacker',
    chatHistory: [
      {
        0: {
          from: ['Tom got a small piece of pie.'],
          to: [
            "I'd rather be a bird than a fish.",
            'They got there early, and they got really good seats.',
          ],
        },
        1: {
          from: [
            'If I don’t like something, I’ll stay away from it.',
            'I want more detailed information.',
          ],
          to: ['We need to rent a room for our party.'],
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    status: 'offline',
    thumb: user4,
    recent: true,
    excerpt: 'Accountant',
    chatHistory: [
      {
        0: {
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.'],
        },
        1: {
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.',
          ],
          to: ['Please wait outside of the house.'],
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Robert Smith',
    status: 'online',
    thumb: user5,
    recent: true,
    excerpt: 'Front End Developer',
    chatHistory: [
      {
        0: {
          from: ['Tom got a small piece of pie.'],
          to: [
            "I'd rather be a bird than a fish.",
            'They got there early, and they got really good seats.',
          ],
        },
        1: {
          from: [
            'If I don’t like something, I’ll stay away from it.',
            'I want more detailed information.',
          ],
          to: ['We need to rent a room for our party.'],
        },
      },
    ],
  },
  {
    id: 6,
    name: 'Joseph Sarah',
    status: 'busy',
    thumb: user1,
    recent: false,
    excerpt: 'Graphics Designer',
    chatHistory: [
      {
        0: {
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.'],
        },
        1: {
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.',
          ],
          to: ['Please wait outside of the house.'],
        },
      },
    ],
  },
  {
    id: 7,
    name: 'Thomas Smith',
    status: 'away',
    thumb: user2,
    recent: true,
    excerpt: 'Back End Developer',
    chatHistory: [
      {
        0: {
          from: ['Tom got a small piece of pie.'],
          to: [
            "I'd rather be a bird than a fish.",
            'They got there early, and they got really good seats.',
          ],
        },
        1: {
          from: [
            'If I don’t like something, I’ll stay away from it.',
            'I want more detailed information.',
          ],
          to: ['We need to rent a room for our party.'],
        },
      },
    ],
  },
  {
    id: 8,
    name: 'David Elizabeth',
    status: 'offline',
    thumb: user3,
    recent: false,
    excerpt: 'Theme Developer',
    chatHistory: [
      {
        0: {
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.'],
        },
        1: {
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.',
          ],
          to: ['Please wait outside of the house.'],
        },
      },
    ],
  },
  {
    id: 9,
    name: 'Charles Martha',
    status: 'online',
    thumb: user4,
    recent: false,
    excerpt: 'Administrator',
    chatHistory: [
      {
        0: {
          from: ['Tom got a small piece of pie.'],
          to: [
            "I'd rather be a bird than a fish.",
            'They got there early, and they got really good seats.',
          ],
        },
        1: {
          from: [
            'If I don’t like something, I’ll stay away from it.',
            'I want more detailed information.',
          ],
          to: ['We need to rent a room for our party.'],
        },
      },
    ],
  },
  {
    id: 10,
    name: 'Samuel Eliza',
    status: 'online',
    thumb: user5,
    recent: false,
    excerpt: 'Doctor',
    chatHistory: [
      {
        0: {
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.'],
        },
        1: {
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.',
          ],
          to: ['Please wait outside of the house.'],
        },
      },
    ],
  },
];
/*
mock.onGet("/api/data/chat/Chatdata").reply(() => {
  const chats = ChatData;
  return [200, JSON.parse(JSON.stringify(chats))];
});*/

mock.onGet('/api/data/chat/ChatData').reply(() => {
  return [200, ChatData];
});

export default ChatData;
