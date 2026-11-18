/* =========================================
   SOL + ÁGUA
   Projeto Integrador CEP
   JavaScript do site
========================================= */


/* =========================================
   SIMULADOR DE RADIAÇÃO
========================================= */

function atualizarSimulador(valor) {

    valor = Number(valor);

    const intensidade = document.getElementById("valor");
    const absorcao = document.getElementById("absorção");
    const reflexao = document.getElementById("reflexao");
    const transmissao = document.getElementById("transmissao");
    const raio = document.getElementById("raio");
    const temperatura = document.getElementById("temperatura");

    /*
        Modelo didático:
        70% da radiação incidente é considerada
        absorvida e 30% refletida.
    */

    const porcentagemAbsorvida =
        Math.round(valor * 0.70);

    const porcentagemRefletida =
        Math.round(valor * 0.30);

    const porcentagemTransmitida =
        100 - valor;


    /* Atualiza os textos */

    if (intensidade) {
        intensidade.textContent =
            valor + "%";
    }

    if (absorcao) {
        absorcao.textContent =
            porcentagemAbsorvida + "%";
    }

    if (reflexao) {
        reflexao.textContent =
            porcentagemRefletida + "%";
    }

    if (transmissao) {
        transmissao.textContent =
            porcentagemTransmitida + "%";
    }


    /* Atualiza a intensidade visual do raio */

    if (raio) {

        raio.style.opacity =
            Math.max(0.12, valor / 100);

        raio.style.width =
            Math.max(25, valor * 0.7) + "%";
    }


    /* Simulação da temperatura */

    if (temperatura) {

        const temperaturaBase = 24;

        const aumento =
            valor * 0.06;

        const temperaturaFinal =
            temperaturaBase + aumento;

        temperatura.textContent =
            temperaturaFinal.toFixed(1) + "°C";
    }
}


/* =========================================
   ACESSIBILIDADE
========================================= */


/*
    Aumenta ou reduz o tamanho do texto.
*/

function aumentarTexto() {

    document.body.classList.toggle(
        "texto-grande"
    );
}


/*
    Ativa ou desativa o alto contraste.
*/

function altoContraste() {

    document.body.classList.toggle(
        "alto-contraste"
    );
}


/* =========================================
   NAVEGAÇÃO SUAVE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
            Configuração inicial
            do simulador.
        */

        atualizarSimulador(70);


        /*
            Faz os links internos
            rolarem suavemente.
        */

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function (evento) {

                    const destino =
                        document.querySelector(
                            this.getAttribute("href")
                        );

                    if (destino) {

                        evento.preventDefault();

                        destino.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            );
        });


        /*
            Atualiza o estado do
            simulador quando o controle
            deslizante muda.
        */

        const controle =
            document.getElementById(
                "intensidade"
            );

        if (controle) {

            controle.addEventListener(
                "input",
                function () {

                    atualizarSimulador(
                        this.value
                    );
                }
            );
        }

    }
);


/* =========================================
   OBSERVAÇÃO DE ACESSIBILIDADE
========================================= */


/*
    Permite usar a tecla Enter ou espaço
    nos elementos interativos quando
    necessário.
*/

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Escape"
        ) {

            document.activeElement.blur();
        }

    }
);


/* =========================================
   ANIMAÇÃO DE APARECIMENTO
========================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".card, .cabecalho-secao"
    );


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(
            function (elementos) {

                elementos.forEach(
                    function (elemento) {

                        if (
                            elemento.isIntersecting
                        ) {

                            elemento.target.style.opacity =
                                "1";

                            elemento.target.style.transform =
                                "translateY(0)";

                            observador.unobserve(
                                elemento.target
                            );
                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    elementosAnimados.forEach(
        function (elemento) {

            elemento.style.opacity =
                "0";

            elemento.style.transform =
                "translateY(15px)";

            elemento.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            observador.observe(
                elemento
            );
        }
    );
}


/* =========================================
   MENSAGEM DE CONSOLE
========================================= */

console.log(
    "☀️ Sol + Água | Projeto Integrador CEP carregado com sucesso."
);
