document.getElementById("form-contato").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const status = document.getElementById("statusMensagem");

    status.textContent = "Enviando...";
    status.style.color = "#1e90ff";

  
    const data = new FormData(form);

    const endpoint = "https://formspree.io/f/mzzyzjbv"; 

    fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                status.textContent = "✅ Mensagem enviada com sucesso! Obrigado.";
                status.style.color = "green";
                form.reset(); 
            } else {
                return response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.textContent = data["errors"]
                            .map(error => error["message"])
                            .join(", ");
                    } else {
                        status.textContent = "⚠️ Ops! Algo deu errado.";
                    }
                    status.style.color = "red";
                });
            }
        })
        .catch(error => {
            status.textContent = "❌ Erro de conexão. Tente novamente mais tarde.";
            status.style.color = "red";
            console.error(error);
        });
});
