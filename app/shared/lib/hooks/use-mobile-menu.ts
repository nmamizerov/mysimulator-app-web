import { useState, useEffect } from "react";

/**
 * Хук для управления мобильным меню
 *
 * @returns {Object} - Объект с состоянием и методами управления меню
 * @returns {boolean} isOpen - Открыто ли меню
 * @returns {() => void} open - Функция открытия меню
 * @returns {() => void} close - Функция закрытия меню
 * @returns {() => void} toggle - Функция переключения меню
 *
 * @example
 * const { isOpen, open, close, toggle } = useMobileMenu();
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрываем меню при изменении размера экрана на desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};
