export const mockSessions = [
  {
    id: 1,
    title: "Equilibrio y Coordinación en Providencia",
    instructor: "Dra. María González",
    description: "Ejercicios suaves para mejorar el equilibrio y prevenir caídas en un entorno seguro.",
    date: "martes, 14 de enero de 2025",
    time: "10:00 AM (45 min)",
    location: "Parque de las Esculturas, Providencia",
    participants: "8/12 participantes",
    type: "Presencial",
    status: "Disponible",
    category: "equilibrio",
    image: "https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg"
  },
  {
    id: 2,
    title: "Yoga Suave para Seniors (Online)",
    instructor: "Prof. Carlos Ruiz",
    description: "Sesión de yoga adaptada para adultos mayores, desde la comodidad de tu hogar.",
    date: "martes, 14 de enero de 2025",
    time: "4:00 PM (60 min)",
    location: "Plataforma online",
    participants: "15/20 participantes",
    type: "Online",
    status: "Disponible",
    category: "yoga",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg"
  },
  {
    id: 3,
    title: "Aqua Aeróbicos en Las Condes",
    instructor: "Lic. Ana Martín",
    description: "Ejercicios acuáticos de bajo impacto para fortalecer músculos y articulaciones.",
    date: "miércoles, 15 de enero de 2025",
    time: "11:00 AM (50 min)",
    location: "Piscina Municipal, Las Condes",
    participants: "10/15 participantes",
    type: "Presencial",
    status: "Disponible",
    category: "acuaticos",
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg"
  },
  {
    id: 4,
    title: "Fortalecimiento Muscular en Santiago Centro",
    instructor: "Dr. Pedro López",
    description: "Ejercicios de fuerza adaptados para mantener la masa muscular y la vitalidad.",
    date: "miércoles, 15 de enero de 2025",
    time: "9:00 AM (40 min)",
    location: "Gimnasio Municipal, Santiago Centro",
    participants: "12/12 participantes",
    type: "Presencial",
    status: "Completo",
    category: "fuerza",
    image: "https://images.pexels.com/photos/6111597/pexels-photo-6111597.jpeg"
  },
  {
    id: 5,
    title: "Pilates para Flexibilidad (Online)",
    instructor: "Isidora Rojas",
    description: "Mejora tu flexibilidad y postura con esta clase de Pilates adaptada.",
    date: "jueves, 16 de enero de 2025",
    time: "3:00 PM (50 min)",
    location: "Plataforma online",
    participants: "11/20 participantes",
    type: "Online",
    status: "Disponible",
    category: "flexibilidad",
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg"
  },
  {
    id: 6,
    title: "Caminata Activa en Parque O'Higgins",
    instructor: "Benjamín Soto",
    description: "Únete a nuestro grupo de caminata para una mañana de ejercicio cardiovascular y socialización.",
    date: "viernes, 17 de enero de 2025",
    time: "9:30 AM (60 min)",
    location: "Parque O'Higgins, Santiago Centro",
    participants: "18/25 participantes",
    type: "Presencial",
    status: "Disponible",
    category: "cardio",
    image: "https://images.pexels.com/photos/6111593/pexels-photo-6111593.jpeg"
  }
];

export const mockExercises = [
  {
    id: 1,
    name: "Elevación de Brazos Sentado",
    category: "Movilidad",
    duration: "5 min",
    difficulty: "Fácil",
    description: "Ejercicio suave para mejorar la movilidad de hombros y brazos, ideal para empezar el día.",
    imageDescription: "Persona mayor sentada en una silla levantando los brazos hacia los lados.",
    image: "https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg",
    videoUrl: "https://www.youtube.com/embed/RqcOCBb4arc",
    instructions: [
      "Siéntate cómodamente en una silla con la espalda recta.",
      "Levanta los brazos lentamente hacia los lados, hasta la altura de los hombros.",
      "Mantén la posición por 3 segundos sintiendo el estiramiento.",
      "Baja los brazos lentamente a la posición inicial.",
      "Repite el movimiento 10 veces."
    ],
    benefits: ["Mejora la movilidad", "Fortalece hombros", "Reduce rigidez"]
  },
  {
    id: 2,
    name: "Marcha en el Lugar con Apoyo",
    category: "Cardio",
    duration: "3 min",
    difficulty: "Fácil",
    description: "Ejercicio cardiovascular suave para activar la circulación, usando una silla para mayor seguridad.",
    imageDescription: "Persona mayor marchando en el lugar mientras se apoya en el respaldo de una silla.",
    image: "https://images.pexels.com/photos/6111593/pexels-photo-6111593.jpeg",
    videoUrl: "https://www.youtube.com/embed/CBIonJtJGhk",
    instructions: [
      "Ponte de pie detrás de una silla firme, sujetando el respaldo.",
      "Levanta una rodilla hacia el pecho, como si marcharas.",
      "Alterna con la otra pierna a un ritmo cómodo.",
      "Mantén la espalda recta y la mirada al frente.",
      "Continúa por 3 minutos."
    ],
    benefits: ["Mejora la circulación", "Fortalece piernas", "Aumenta resistencia"]
  },
  {
    id: 3,
    name: "Rotación de Cuello Suave",
    category: "Flexibilidad",
    duration: "2 min",
    difficulty: "Muy Fácil",
    description: "Ejercicio para aliviar la tensión del cuello y mejorar la flexibilidad, perfecto para relajar.",
    imageDescription: "Primer plano de una persona mayor girando suavemente el cuello hacia un lado.",
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
    videoUrl: "https://www.youtube.com/embed/wQylqaCl8Zo",
    instructions: [
      "Siéntate con la espalda recta y los hombros relajados.",
      "Gira la cabeza lentamente hacia la derecha, hasta donde sea cómodo.",
      "Mantén la posición por 5 segundos.",
      "Regresa al centro y gira lentamente hacia la izquierda.",
      "Repite 5 veces para cada lado."
    ],
    benefits: ["Alivia tensión", "Mejora flexibilidad", "Reduce dolor de cuello"]
  },
  {
    id: 4,
    name: "Sentadilla con Silla",
    category: "Fuerza",
    duration: "5 min",
    difficulty: "Moderado",
    description: "Fortalece tus piernas y glúteos de forma segura usando una silla como guía y apoyo.",
    imageDescription: "Persona mayor realizando una sentadilla, usando una silla detrás como guía de seguridad.",
    image: "https://images.pexels.com/photos/6111597/pexels-photo-6111597.jpeg",
    videoUrl: "https://www.youtube.com/embed/YaXPRqUwItQ",
    instructions: [
      "Párate frente a una silla, con los pies separados al ancho de los hombros.",
      "Baja lentamente la cadera como si fueras a sentarte, manteniendo la espalda recta.",
      "Apenas toques la silla, vuelve a subir a la posición inicial.",
      "Usa los brazos al frente para mantener el equilibrio.",
      "Realiza de 8 a 12 repeticiones."
    ],
    benefits: ["Fortalece piernas", "Mejora el equilibrio", "Aumenta la fuerza funcional"]
  },
  {
    id: 5,
    name: "Equilibrio sobre una Pierna",
    category: "Equilibrio",
    duration: "4 min",
    difficulty: "Moderado",
    description: "Un ejercicio clave para mejorar la estabilidad y prevenir caídas.",
    imageDescription: "Persona mayor de pie sobre una pierna, con la otra rodilla levantada, manteniendo el equilibrio.",
    image: "https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg",
    videoUrl: "https://www.youtube.com/embed/sw9-DQaqNgk",
    instructions: [
      "Párate cerca de una pared o silla para apoyarte si es necesario.",
      "Levanta un pie del suelo, doblando la rodilla.",
      "Intenta mantener el equilibrio durante 15-30 segundos.",
      "Baja el pie y repite con la otra pierna.",
      "Realiza 3 repeticiones por cada pierna."
    ],
    benefits: ["Previene caídas", "Mejora la estabilidad", "Fortalece tobillos"]
  },
  {
    id: 6,
    name: "Estiramiento de Espalda",
    category: "Flexibilidad",
    duration: "6 min",
    difficulty: "Fácil",
    description: "Ejercicio para aliviar la tensión en la espalda y mejorar la postura.",
    imageDescription: "Persona mayor realizando estiramiento de espalda sentada.",
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
    videoUrl: "https://www.youtube.com/embed/4BOTvaRaDjI",
    instructions: [
      "Siéntate en el borde de una silla con los pies en el suelo.",
      "Entrelaza los dedos y estira los brazos hacia adelante.",
      "Redondea la espalda y siente el estiramiento entre los omóplatos.",
      "Mantén por 15-20 segundos.",
      "Repite 3-4 veces."
    ],
    benefits: ["Alivia tensión", "Mejora postura", "Reduce dolor de espalda"]
  }
];

export const mockUser = {
  id: 1,
  name: "Nuevo Usuario",
  age: 0,
  email: "",
  phone: "",
  address: "Santiago, Chile",
  emergencyContact: "",
  memberSince: new Date().toLocaleDateString('es-CL'),
  isPremium: false,
  healthMetrics: {
    weight: "70 kg",
    height: "1.70 m",
    bloodPressure: "120/80",
    heartRate: "75 bpm"
  },
  preferences: {
    notifications: true,
    privateMode: false,
    medicationReminders: true,
    shareProgress: true
  },
  weeklyProgress: {
    sessionsCompleted: 0,
    totalSessions: 4,
    exerciseMinutes: 0,
    weeklyGoal: 240
  },
  progressHistory: []
};

export const defaultUser = {
  id: 2,
  name: "Carlos Ruiz",
  age: 72,
  email: "carlos.ruiz@3m.cl",
  phone: "+56 9 8765 4321",
  address: "Av. Providencia 123, Santiago",
  emergencyContact: "Ana Ruiz - +56 9 1234 5678",
  memberSince: "15/01/2024",
  isPremium: true,
  healthMetrics: {
    weight: "78 kg",
    height: "1.75 m",
    bloodPressure: "130/85",
    heartRate: "70 bpm"
  },
  preferences: {
    notifications: true,
    privateMode: false,
    medicationReminders: false,
    shareProgress: true
  },
  weeklyProgress: {
    sessionsCompleted: 3,
    totalSessions: 5,
    exerciseMinutes: 135,
    weeklyGoal: 180
  },
  progressHistory: [
    { week: "Semana Pasada", sessions: 4, minutes: 160 },
    { week: "Hace 2 semanas", sessions: 3, minutes: 120 },
    { week: "Hace 3 semanas", sessions: 4, minutes: 155 },
  ]
};

export const locations = [
  "Todas las ubicaciones",
  "Parque de las Esculturas, Providencia",
  "Piscina Municipal, Las Condes",
  "Gimnasio Municipal, Santiago Centro",
  "Parque O'Higgins, Santiago Centro",
  "Plataforma online"
];

export const sessionTypes = [
  "Todos los tipos",
  "Presencial",
  "Online"
];

export const categories = [
  "Todas",
  "Movilidad",
  "Cardio",
  "Flexibilidad",
  "Fuerza",
  "Equilibrio",
  "Yoga",
  "Pilates"
];