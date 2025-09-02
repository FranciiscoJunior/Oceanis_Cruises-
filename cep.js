function limparCamposEndereco() {
    document.getElementById('inputAddress').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('inputState').value = '';
}

function buscarEnderecoPorCep() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');

if (cep.length !== 8) {
    alert('CEP inválido! Digite um CEP com 8 dígitos.');
    limparCamposEndereco();
    return;
}

const url = `https://viacep.com.br/ws/${cep}/json/`;

fetch(url)
    .then(response => {
    if (!response.ok) throw new Error('Erro ao consultar o CEP.');
    return response.json();
})

.then(data => {
    if (data.erro) {
        alert('CEP não encontrado.');
        limparCamposEndereco();
        return;
}

    document.getElementById('inputAddress').value = data.logradouro || '';
    document.getElementById('cidade').value = data.localidade || '';
    document.getElementById('inputState').value = data.uf || '';
})

.catch(error => {
    console.error('Erro na consulta do CEP:', error);
    limparCamposEndereco();
    });
}