const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

textInput.addEventListener("input", () => {
    const text = textInput.value;
    const words = text.trim().split(/\s+/)
    .filter(word => word.length > 0);
    
    wordCount.textContent = words.length;
    charCount.textContent = text.length; // Corrigido
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = 
    document.body.classList.contains("dark") ? "☺" : "☻";
});
