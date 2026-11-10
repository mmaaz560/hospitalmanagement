export const patientsData = [
  {
    id: 'P-001',
    name: 'Muhammad Ali',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '0300-1234567',
    email: 'ali@email.com',
    address: 'House 12, Street 1, Lahore',
    status: 'Active',
    medicalHistory: {
      allergies: 'Penicillin, Dust',
      conditions: 'Hypertension, Mild Asthma',
      pastSurgeries: 'Appendectomy (2018)'
    },
    recentAppointments: [
      { id: 'A-101', doctor: 'Dr. Sarah Ahmed', date: '12 Nov 2026', time: '10:00 AM', status: 'Completed' },
      { id: 'A-102', doctor: 'Dr. Ahmed Khan', date: '05 Oct 2026', time: '02:30 PM', status: 'Completed' },
    ]
  },
  {
    id: 'P-002',
    name: 'Ayesha Khan',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '0301-9876543',
    email: 'ayesha.k@email.com',
    address: 'Flat 4B, Clifton, Karachi',
    status: 'Active',
    medicalHistory: {
      allergies: 'None',
      conditions: 'Migraine',
      pastSurgeries: 'None'
    },
    recentAppointments: [
      { id: 'A-103', doctor: 'Dr. Fatima Zafar', date: '15 Nov 2026', time: '11:00 AM', status: 'Confirmed' },
    ]
  },
  {
    id: 'P-003',
    name: 'Hassan Raza',
    age: 42,
    gender: 'Male',
    bloodGroup: 'B-',
    phone: '0321-4567890',
    email: 'hassan.raza@email.com',
    address: 'House 89, F-10, Islamabad',
    status: 'Discharged',
    medicalHistory: {
      allergies: 'Sulfa Drugs',
      conditions: 'Type 2 Diabetes',
      pastSurgeries: 'Knee Replacement (2020)'
    },
    recentAppointments: [
      { id: 'A-104', doctor: 'Dr. Usman Ali', date: '01 Nov 2026', time: '09:00 AM', status: 'Completed' },
    ]
  },
  {
    id: 'P-004',
    name: 'Fatima Noor',
    age: 31,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '0333-1122334',
    email: 'fatima.noor@email.com',
    address: 'House 45, Model Town, Lahore',
    status: 'Active',
    medicalHistory: {
      allergies: 'Peanuts',
      conditions: 'Anemia',
      pastSurgeries: 'C-Section (2022)'
    },
    recentAppointments: [
      { id: 'A-105', doctor: 'Dr. Ayesha Malik', date: '18 Nov 2026', time: '03:00 PM', status: 'Pending' },
    ]
  },
  {
    id: 'P-005',
    name: 'Usman Tariq',
    age: 39,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '0345-6677889',
    email: 'usman.t@email.com',
    address: 'House 7, Satellite Town, Rawalpindi',
    status: 'Critical',
    medicalHistory: {
      allergies: 'None',
      conditions: 'Coronary Artery Disease',
      pastSurgeries: 'Angioplasty (2021)'
    },
    recentAppointments: [
      { id: 'A-106', doctor: 'Dr. Sarah Ahmed', date: '20 Nov 2026', time: '08:30 AM', status: 'Confirmed' },
    ]
  },
  {
    id: 'P-006',
    name: 'Zainab Bibi',
    age: 55,
    gender: 'Female',
    bloodGroup: 'A-',
    phone: '0312-5556667',
    email: 'zainab.b@email.com',
    address: 'House 23, Gulshan Iqbal, Karachi',
    status: 'Active',
    medicalHistory: {
      allergies: 'Dust, Pollen',
      conditions: 'Arthritis, High Cholesterol',
      pastSurgeries: 'None'
    },
    recentAppointments: [
      { id: 'A-107', doctor: 'Dr. Ahmed Khan', date: '22 Nov 2026', time: '10:30 AM', status: 'Pending' },
    ]
  },
  {
    id: 'P-007',
    name: 'Bilal Ahmed',
    age: 22,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '0334-7778889',
    email: 'bilal.a@email.com',
    address: 'Hostel Room 12, University Road, Peshawar',
    status: 'Discharged',
    medicalHistory: {
      allergies: 'None',
      conditions: 'None',
      pastSurgeries: 'Fracture Surgery (2023)'
    },
    recentAppointments: [
      { id: 'A-108', doctor: 'Dr. Usman Ali', date: '10 Oct 2026', time: '04:00 PM', status: 'Completed' },
    ]
  },
  {
    id: 'P-008',
    name: 'Sana Malik',
    age: 45,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '0302-3334445',
    email: 'sana.malik@email.com',
    address: 'House 101, DHA Phase 5, Lahore',
    status: 'Active',
    medicalHistory: {
      allergies: 'Latex',
      conditions: 'Hypothyroidism',
      pastSurgeries: 'None'
    },
    recentAppointments: [
      { id: 'A-109', doctor: 'Dr. Fatima Zafar', date: '25 Nov 2026', time: '11:15 AM', status: 'Confirmed' },
    ]
  },
  {
    id: 'P-009',
    name: 'Kamran Akmal',
    age: 30,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '0341-2223334',
    email: 'kamran.a@email.com',
    address: 'House 56, Johar Town, Lahore',
    status: 'Active',
    medicalHistory: {
      allergies: 'Aspirin',
      conditions: 'Asthma',
      pastSurgeries: 'None'
    },
    recentAppointments: [
      { id: 'A-110', doctor: 'Dr. Sarah Ahmed', date: '26 Nov 2026', time: '09:45 AM', status: 'Pending' },
    ]
  },
  {
    id: 'P-010',
    name: 'Hina Dilpazeer',
    age: 60,
    gender: 'Female',
    bloodGroup: 'AB-',
    phone: '0322-9998887',
    email: 'hina.d@email.com',
    address: 'House 3, F-7/1, Islamabad',
    status: 'Critical',
    medicalHistory: {
      allergies: 'Penicillin',
      conditions: 'Pneumonia, COPD',
      pastSurgeries: 'Gallbladder Removal (2015)'
    },
    recentAppointments: [
      { id: 'A-111', doctor: 'Dr. Ahmed Khan', date: '27 Nov 2026', time: '01:00 PM', status: 'Confirmed' },
    ]
  }
];