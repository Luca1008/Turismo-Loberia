import React, { useState } from 'react';
import { IoAccessibility } from "react-icons/io5";
import '../../styles/stickyButton.css';

const AccessibilityButtton = () => {
    const [fontSize, setFontSize] = useState(1); // 1 = 1rem = 16px
    const [menuOpen, setMenuOpen] = useState(false);
    const [reading, setReading] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isUnderlineLinks, setIsUnderlineLinks] = useState(false);
    const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);

    // Cambia el tamaño de fuente usando rem
    const changeFontSize = (size) => {
        const mainContent = document.getElementById('main-content');
        // Limitar entre 0.8rem y 1.5rem
        const newSize = Math.max(0.8, Math.min(size, 1.5));
        if (mainContent) {
            mainContent.style.fontSize = `${newSize}rem`;
            setFontSize(newSize);
        }
    };

    // Contraste alto
    const toggleContrast = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('high-contrast');
            setIsHighContrast(!isHighContrast);
        }
    };

    // Modo oscuro
    const toggleDarkMode = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dark-mode');
            setIsDarkMode(!isDarkMode);
        }
    };

    // Subrayado de enlaces
    const toggleUnderlineLinks = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('underline-links');
            setIsUnderlineLinks(!isUnderlineLinks);
        }
    };

    // Fuente dislexia
    const toggleDyslexiaFont = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.toggle('dyslexia-font');
            setIsDyslexiaFont(!isDyslexiaFont);
        }
    };

    // Leer texto principal
    const readText = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent && mainContent.innerText.trim()) {
            window.speechSynthesis.cancel();
            const speech = new window.SpeechSynthesisUtterance();
            speech.text = mainContent.innerText;
            speech.lang = "es-ES";
            setReading(true);
            speech.onend = () => setReading(false);
            window.speechSynthesis.speak(speech);
        } else {
            alert("No se encontró contenido para leer.");
        }
    };

    // Pausar/continuar lectura
    const pauseOrResume = () => {
        if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.pause();
            }
        }
    };

    // Detener lectura
    const stopReading = () => {
        window.speechSynthesis.cancel();
        setReading(false);
    };

    // Restablecer todo
    const resetAccessibility = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.fontSize = '1rem';
            setFontSize(1);
            mainContent.classList.remove('high-contrast', 'dark-mode', 'underline-links', 'dyslexia-font');
            stopReading();
            setIsHighContrast(false);
            setIsDarkMode(false);
            setIsUnderlineLinks(false);
            setIsDyslexiaFont(false);
        }
    };

  return (
        <div className="accessibility-wrapper" role="region" aria-label="Menú de accesibilidad">
                <button
                    className="accessibility-trigger"
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                    aria-controls="accessibility-menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <IoAccessibility />
                </button>

                {menuOpen && (
                    <div
                        className="accessibility-menu"
                        id="accessibility-menu"
                        role="menu"
                        tabIndex={-1}
                    >
                        <button onClick={() => changeFontSize(fontSize + 0.1)} aria-label="Aumentar texto" role="menuitem">A+</button>
                        <button onClick={() => changeFontSize(fontSize - 0.1)} aria-label="Disminuir texto" role="menuitem">A-</button>
                        <button onClick={toggleContrast} aria-label="Alto contraste" role="menuitem">Alto contraste</button>
                        <button onClick={toggleDarkMode} aria-label="Modo oscuro" role="menuitem">Modo oscuro</button>
                        <button onClick={toggleUnderlineLinks} aria-label="Subrayar enlaces" role="menuitem">Subrayar enlaces</button>
                        <button onClick={toggleDyslexiaFont} aria-label="Fuente dislexia" role="menuitem">Fuente dislexia</button>
                        <button onClick={readText} aria-label="Leer contenido" role="menuitem" disabled={reading}>Leer contenido</button>
                        <button onClick={pauseOrResume} aria-label="Pausar/Continuar" role="menuitem">Pausar/Continuar</button>
                        <button onClick={stopReading} aria-label="Detener lectura" role="menuitem">Detener lectura</button>
                        <button onClick={resetAccessibility} aria-label="Restablecer" role="menuitem">Restablecer</button>
                    </div>
                )}
            </div>
  )
}

export default AccessibilityButtton