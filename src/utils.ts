export const scrollToSection = (id: string, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, offset: number = 20) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    setIsOpen(false);
  }
};