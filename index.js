const tableFuncionarios = document.querySelector('#table_funcionarios');

        const cadastraFuncionario = (event, form) => {
            event.preventDefault();
            let chave = retornaUltimaChaveStorage();

            if (form.chave.value) {
                chave = form.chave.value;
                form.chave.value = '';
            }

            const nome = form.nome.value;
            const funcao = form.funcao.value;
            let acoesFuncionario = "";
            let funcionarioObjeto = { chave, nome, funcao, acoesFuncionario }

            localStorage.setItem(chave, JSON.stringify(funcionarioObjeto))
            form.reset()
            montaListaFuncionarios();
            alert('Funcionario cadastrado com sucesso!')
        }
        const montaListaFuncionarios = () => {
            tableFuncionarios.tBodies[0].innerHTML = '';
            let items = obterTodosOsItensStorage();
            items.sort((a, b) => a.chave - b.chave);
            items.forEach(element => {
                criaLinha(element.chave)
            });
        }
        const criaLinha = (chave_item) => {
            let item = JSON.parse(localStorage.getItem(chave_item))
            let novaLinha = document.createElement('tr');

            Object.keys(item).forEach(chave_objeto => {
                let novaColuna = document.createElement('td');
                novaColuna.innerHTML = item[chave_objeto];
                novaLinha.setAttribute('key', item['chave'])

                if (chave_objeto == 'acoesFuncionario') {
                    novaColuna.appendChild(criaBotaoRemocaoLinha(item['chave']));
                    novaColuna.appendChild(criaBotaoEdicaoLinha(item['chave']));
                }

                novaLinha.appendChild(novaColuna);
                tableFuncionarios.tBodies[0].appendChild(novaLinha);
            });
        }
        const removerFuncionariosCadastrados = () => {
            localStorage.clear();
            tableFuncionarios.tBodies[0].innerHTML = '';
        }
        const obterTodosOsItensStorage = () => {
            let itens = [];
            for (let i = 0; i < localStorage.length; i++) {
                let chave = localStorage.key(i);
                let valor = localStorage.getItem(chave);
                let objeto = JSON.parse(valor);
                itens.push(objeto);
            }
            return itens;
        }
        const retornaUltimaChaveStorage = () => {
            let maiorChave = 0;

            // Vasculha todas as chaves no Local Storage
            for (let i = 0; i < localStorage.length; i++) {
                // Obtém a chave atual
                let chaveAtual = localStorage.key(i);

                // Verifica se a chave atual é um número
                if (!isNaN(chaveAtual)) {
                    // Converte a chave para um número
                    let chaveNumerica = Number(chaveAtual);

                    // Se a chave numérica for maior que a maior chave atual, atualiza a maior chave
                    if (chaveNumerica > maiorChave) {
                        maiorChave = chaveNumerica;
                    }
                }
            }

            // Incrementa a maior chave
            maiorChave++;
            return maiorChave;
        }
        const criaBotaoRemocaoLinha = (chave) => {
            let botao = document.createElement('button');

            botao.setAttribute('class', 'btn btn-danger');
            botao.setAttribute('type', 'button');
            botao.setAttribute('title', 'Remover Funcionário');
            botao.setAttribute('onclick', 'deletaFuncionario(' + chave + ')');

            botao.innerHTML = "<i class='fa fa-trash'></i>";
            return botao;
        }
        const criaBotaoEdicaoLinha = (chave) => {
            let botao = document.createElement('button');

            botao.setAttribute('class', 'btn btn-primary');
            botao.setAttribute('title', 'Editar Funcionário');
            botao.setAttribute('type', 'button');
            botao.setAttribute('onclick', 'editaFuncionario(' + chave + ')');

            botao.innerHTML = "<i class='fa fa-edit'></i>";
            return botao;
        }
        const deletaFuncionario = (chave) => {
            if (window.confirm('Deseja realmente deletar este funcionário ?')) {
                let data = JSON.parse(localStorage.getItem(chave));
                localStorage.removeItem(data.chave);
                montaListaFuncionarios();
            }
        }
        const editaFuncionario = (chave) => {
            let data = JSON.parse(localStorage.getItem(chave));

            if (data !== null) {
                let form = document.getElementById("form_funcionarios");
                form.nome.value = data.nome;
                form.funcao.value = data.funcao;
                form.chave.value = data.chave;
            }
        }

        montaListaFuncionarios();
