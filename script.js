function atualizarCidadesPorEstado() {
    const estadoSelect = document.getElementById('inputState');
    const cidadeSelect = document.getElementById('cidade');
    const estadoSelecionado = estadoSelect.value;

cidadeSelect.innerHTML = '<option value="">--Selecione a Cidade--</option>';

if (!estadoSelecionado) return;

fetch('estados_cidades.json')

.then(response => {
    if (!response.ok) throw new Error('Erro ao carregar o JSON de estados e cidades.');
    return response.json();
})

.then(estados => {
    const estadoEncontrado = estados.find(e => e.estado === estadoSelecionado);

    if (!estadoEncontrado) {
        console.warn(`Estado "${estadoSelecionado}" não encontrado no JSON.`);
        return;
    }

    estadoEncontrado.municipios.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
    });
})

    .catch(error => {
        console.error('Erro ao buscar cidades:', error);
    });
}