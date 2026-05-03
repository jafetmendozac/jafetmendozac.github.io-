// Registrar plugins aquí garantiza que estén listos antes de cualquier animación
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const M = {
  ease:   'expo.out',
  easeIn: 'expo.in',
  spring: 'elastic.out(1,.45)',
  snap:   'back.out(1.8)',
  d: { xs:.35, sm:.55, md:.85, lg:1.1, xl:1.4 },
  s: { sm:.04, md:.07, lg:.11 }
};
