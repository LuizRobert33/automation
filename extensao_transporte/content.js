function criarBotoes() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.background = 'white';
    container.style.padding = '10px';
    container.style.border = '1px solid #ccc';
    container.style.zIndex = 9999;
    container.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.2)';
    container.style.borderRadius = '8px';

    const btnPreencher = document.createElement('button');
    btnPreencher.innerText = 'Preencher Dados Fixos';
    btnPreencher.style.marginRight = '5px';
    btnPreencher.onclick = preencherCampos;

    const btnEditar = document.createElement('button');
    btnEditar.innerText = 'Editar Dados Fixos';
    btnEditar.onclick = editarDados;

    container.appendChild(btnPreencher);
    container.appendChild(btnEditar);

    document.body.appendChild(container);
}

function preencherCampos() {
    chrome.storage.local.get(['dadosFixos'], (result) => {
        const dados = result.dadosFixos || {};

        // Finalidade do Transporte
        const campoFinalidade = document.querySelector('#LGrendeneTheme_wt17_block_wtMainContent_WebPatterns_wt265_block_wtContent_wtRDT_Transportado_DescricaoBagagem');
        if (campoFinalidade) {
            campoFinalidade.value = dados.finalidade || '';
        }

        // Endereço de Origem
        const campoEnderecoOrigem = document.querySelector('#LGrendeneTheme_wt17_block_wtMainContent_WebPatterns_wt265_block_wtContent_wtRDT_EnderecoOrigem');
        if (campoEnderecoOrigem) {
            campoEnderecoOrigem.value = dados.enderecoOrigem || '';
        }

        // Endereço de Destino
        const campoEnderecoDestino = document.querySelector('#LGrendeneTheme_wt17_block_wtMainContent_WebPatterns_wt265_block_wtContent_wtRDT_EnderecoDestino');
        if (campoEnderecoDestino) {
            campoEnderecoDestino.value = dados.enderecoDestino || '';
        }

        // Centro de Custo (digitável)
        const campoCentroCusto = document.querySelector('.select2-search__field');
        if (campoCentroCusto) {
            campoCentroCusto.focus();
            campoCentroCusto.value = dados.centroCusto || '';
            campoCentroCusto.dispatchEvent(new Event('input', { bubbles: true }));
            campoCentroCusto.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        }

        // Cidade de Origem (select)
        const campoCidadeOrigem = document.querySelector('#LGrendeneTheme_wt17_block_wtMainContent_WebPatterns_wt265_block_wtContent_wtRDT_CidadeOrigem');
        if (campoCidadeOrigem) {
            const opcao = Array.from(campoCidadeOrigem.options).find(opt => opt.text.trim().toLowerCase() === (dados.cidadeOrigem || '').trim().toLowerCase());
            if (opcao) {
                campoCidadeOrigem.value = opcao.value;
                campoCidadeOrigem.dispatchEvent(new Event('change'));
            }
        }

        // Cidade de Destino (select)
        const campoCidadeDestino = document.querySelector('#LGrendeneTheme_wt17_block_wtMainContent_WebPatterns_wt265_block_wtContent_wtRDT_CidadeDestino');
        if (campoCidadeDestino) {
            const opcao = Array.from(campoCidadeDestino.options).find(opt => opt.text.trim().toLowerCase() === (dados.cidadeDestino || '').trim().toLowerCase());
            if (opcao) {
                campoCidadeDestino.value = opcao.value;
                campoCidadeDestino.dispatchEvent(new Event('change'));
            }
        }
    });
}

function editarDados() {
    const finalidade = prompt('Finalidade do Transporte:');
    const centroCusto = prompt('Centro de Custo:');
    const cidadeOrigem = prompt('Cidade de Origem:');
    const enderecoOrigem = prompt('Endereço de Origem:');
    const cidadeDestino = prompt('Cidade de Destino:');
    const enderecoDestino = prompt('Endereço de Destino:');

    const dados = {
        finalidade,
        centroCusto,
        cidadeOrigem,
        enderecoOrigem,
        cidadeDestino,
        enderecoDestino
    };

    chrome.storage.local.set({ dadosFixos: dados }, () => {
        alert('Dados fixos salvos!');
    });
}

window.addEventListener('load', criarBotoes);
