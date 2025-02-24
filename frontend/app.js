document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const inputCodigo = document.getElementById("codigo");
    const listaCodigos = document.getElementById("lista-codigos");

    // Buscar códigos salvos
    fetch("http://localhost:3001/codigos")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.valor;
                listaCodigos.appendChild(li);
            });
        })
        .catch((err) => console.error("Erro ao buscar códigos:", err));

    // Enviar novo código
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const codigo = inputCodigo.value.trim();
        if (!codigo) return;

        const response = await fetch("http://localhost:3001/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ valor: codigo }),
        });

        if (response.ok) {
            const novoCodigo = await response.json();
            const li = document.createElement("li");
            li.textContent = novoCodigo.valor;
            listaCodigos.appendChild(li);
            inputCodigo.value = "";
        }
    });
});
