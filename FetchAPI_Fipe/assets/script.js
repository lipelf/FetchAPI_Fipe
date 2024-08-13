const selectbox = document.getElementById("cars");
const selectbox2 = document.getElementById("cars2");
const selectbox3 = document.getElementById("cars3");

carregarCarros();

selectbox.addEventListener('change', () => {
    carregarMarcas();
    carregarAnos();
});

selectbox2.addEventListener('change', carregarAnos);

function carregarCarros() {
    fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas/")
        .then(resposta => resposta.json())
        .then(dado => {
            dado.forEach((item) => {
                const opt = document.createElement("option");
                opt.value = item.codigo;
                opt.text = item.nome;
                selectbox.add(opt);
            }
            );
        })
        .catch(error => console.error('Erro ao carregar marcas:', error));
}

function carregarMarcas() {
    const marcaId = selectbox.value;
    if (marcaId == 0) {
        selectbox2.innerHTML = '';
        const opt = document.createElement("option");
        opt.value = 0;
        opt.text = "Selecione uma Marca";
        selectbox2.add(opt);
        return;
    }
    else {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`)
            .then(resposta => resposta.json())
            .then(dado => {

                selectbox2.innerHTML = '';

                dado.modelos.forEach(item => {
                    const opt = document.createElement("option");
                    opt.value = item.codigo;
                    opt.text = item.nome;
                    selectbox2.add(opt);
                });
                carregarAnos();
            })
            .catch(error => console.error('Erro ao carregar modelos:', error));
    }

}


function carregarAnos() {
    const marcaId = selectbox.value;
    const modeloId = selectbox2.value;
    if (modeloId == 0) {

        return;
    } else {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos`)
            .then(resposta => resposta.json())
            .then(dado => {
                selectbox3.innerHTML = '';
                if (dado.length === undefined) {
                    const opt = document.createElement("option");
                    opt.value = 0;
                    opt.text = "Modelo não possui anos disponíveis";
                    selectbox3.add(opt);
                } else {
                    dado.forEach(item => {
                        const opt = document.createElement("option");
                        opt.value = item.codigo;
                        opt.text = item.nome;
                        selectbox3.add(opt);
                    });
                }
            })
            .catch(error => console.error('Erro ao carregar anos:', error));
    }
}


function mostrarCarro() {
    if (selectbox3.value == 0) {
        return;
    }
    var novoElemento = document.createElement("p");
    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectbox.value}/modelos/${selectbox2.value}/anos/${selectbox3.value}`)
        .then(resposta => resposta.json())
        .then(dado => {
            novoElemento.innerHTML = "Valor: " + dado.Valor + "<br> Marca: " + dado.Marca + "<br> Modelo: " + dado.Modelo + "<br> Ano do Modelo: " + dado.AnoModelo;

            const elementosExistentes = document.querySelectorAll("p.resultado-carro");
            elementosExistentes.forEach(el => el.remove());

            novoElemento.classList.add("resultado-carro");
            document.body.append(novoElemento);
        })
        .catch(error => console.error('Erro ao carregar anos:', error));

        
}	