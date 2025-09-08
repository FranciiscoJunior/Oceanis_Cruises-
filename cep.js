function limparCamposEndereco() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('sugestoes-logradouro').innerHTML = '';
}

// Consulta o CEP e preenche os campos
async function consultarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        limparCamposEndereco();
        return;
    }

try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await resposta.json();

    if ('erro' in dados) {
        alert('CEP não encontrado.');
        limparCamposEndereco();
        return;
    }

    document.getElementById('endereco').value = dados.endereco || '';
    document.getElementById('complemento').value = dados.complemento || '';
    document.getElementById('cidade').value = dados.localidade || '';
    document.getElementById('estado').value = dados.estados || '';

    // Ativa autocomplete se endereço não estiver preenchido
    if (!dados.endereco) {
        ativarSugestoesDeLogradouroOnline(dados.localidade, dados.estados);
    }

    } catch (erro) {
        console.error('Erro ao buscar o CEP:', erro);
        alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        limparCamposEndereco();
    }
}

//Busca endereços online via Nominatim (OpenStreetMap)
async function buscarEnderecosOnline(termo, cidades = '', estados = '') {
    if (termo.length < 3) return;

    const datalist = document.getElementById('sugestoes-endereco');
    datalist.innerHTML = '';

    const query = encodeURIComponent(`${termo}, ${cidades}, ${estados}, Brasil`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${query}`;

try {
    const resposta = await fetch(url, {
        headers: {
            'Accept-Language': 'pt-BR',
            'User-Agent': 'FormEndereco/1.0 (seuemail@exemplo.com)' // obrigatório para Nominatim
        }
    });

    const resultados = await resposta.json();

    resultados.forEach(resultado => {
        const option = document.createElement('option');
        option.value = resultado.display_name;
        datalist.appendChild(option);
    });

    } catch (erro) {
        console.error('Erro ao buscar logradouros online:', erro);
    }
}

// Ativa autocomplete quando cidade/estado estão disponíveis
function ativarSugestoesDeEnderecoOnline(cidades, estados) {
    const inputEndereco = document.getElementById('endereco');
    inputEndereco.removeAttribute('readonly'); // permite digitar

    inputEndereco.addEventListener('input', () => {
        const termo = inputEndereco.value;
        buscarEnderecosOnline(termo, cidades, estados);
    });
}

// Evento ao sair do campo de CEP
document.getElementById('cep').addEventListener('blur', function () {
    consultarCep(this.value);
});