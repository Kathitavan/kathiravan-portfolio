export const CONTACT_DATA = {
  github:    'https://github.com/Kathitavan',
  linkedin:  'https://www.linkedin.com/in/kathiravan-kumar/',
  instagram: 'https://www.instagram.com/k_kathiravan_x',
  whatsapp:  'https://wa.me/916380201679',
  email:     'kathiravan15x@gmail.com',
  mobile:    '+91 6380201679',
  resume:    'https://docs.google.com/document/d/1NifX5dvg0tNe6W0-AVIJmdLyhiiglpHV/edit?usp=sharing&ouid=110035353411638183006&rtpof=true&sd=true',
};

// Template methods for links
export const getMailto = () => `mailto:${CONTACT_DATA.email}`;
export const getWhatsApp = () => CONTACT_DATA.whatsapp;
export const getResume = () => CONTACT_DATA.resume;
