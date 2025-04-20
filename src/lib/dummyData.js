// Sample user data
export const sampleUser = {
  name: "Anas Ibn Belal",
  student_Id: "20234103372",
  dept: "CSE",
  intake: 52,
  section: 10,
  password: "1234",
  email: "anasibnebelal400@gmail.com"
};

// Sample courses data
export const sampleCourses = [
  {
    id: '1',
    department: 'CSE',
    name: 'Computer Architecture',
    code: 'CSE 215',
    description: `Chapter 1 : Topics of Page 5 and 7 are important. Follow the attachment below.
Chapter 2 : Highlighted Topics in 2nd Page of attachments are most important.
Chapter 3 : Check all Note Books from Below , that could be common.`,
    chapters: [
      'Chapter 1: Introduction to Computer Architecture',
      'Chapter 2: Digital Logic Design',
      'Chapter 3: Memory Organization'
    ],
    attachments: [
      {
        name: 'cse_215_final.pdf',
        url: '#'
      }
    ],
    rating: 8,
    intake: 52,
    section: 10,
    examType: 'Final Exam'
  },
  {
    id: '2',
    department: 'CSE',
    name: 'Data Structures',
    code: 'CSE 207',
    description: 'Learn about fundamental data structures and algorithms. Focus on implementation and analysis.',
    chapters: [
      'Chapter 1: Arrays and Linked Lists',
      'Chapter 2: Trees and Graphs',
      'Chapter 3: Sorting and Searching'
    ],
    attachments: [
      {
        name: 'cse_207_final.pdf',
        url: '#'
      }
    ],
    rating: 9,
    intake: 52,
    section: 10,
    examType: 'Final Exam'
  }
];