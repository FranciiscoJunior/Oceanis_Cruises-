const cidadesPorEstado = {
    SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
    RJ: ["Rio de Janeiro", "Niterói", "Petropolis", "Volta Redonda"],
    MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem"]
};

function atualizarCidades() {
    const estadoSelect = document.getElementById("estado");
    const cidadeSelect = document.getElementById("cidade");
    const estadoSelecionado = estadoSelect.value;

    cidadeSelect.innerHTML = '<option value="">-- Selecione uma cidade --</option>';

    if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
        cidadesPorEstado[estadoSelecionado].forEach(function(cidade) {
        const option = document.createElement("option");
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
        });
    }
}