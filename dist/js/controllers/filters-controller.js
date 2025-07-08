var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Renderer } from "../views/render-data.js";
import { consumeAPI } from "../services/request-services.js";
export class FiltersController {
  constructor(container, tipoAtual) {
    this.tipoAtual = tipoAtual;
    this.offset = 0;
    this.carregando = false;
    this.fimDosDados = false;
    this.resultadosPorPagina = 10;
    this.termoAtual = "";
    this.renderer = new Renderer(container, tipoAtual);
  }
  inicializar() {
    this.adicionarEventos();
    this.atualizarConteudo(this.tipoAtual, "");
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        this.atualizarConteudo(this.tipoAtual, this.termoAtual);
      }
    });
  }
  adicionarEventos() {
    const filtros = document.querySelectorAll(".filtro");
    filtros.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        const target = e.currentTarget;
        filtros.forEach((btn) => btn.classList.remove("ativo"));
        target.classList.add("ativo");
        const tipo = target.dataset.tipo;
        if (tipo) {
          this.tipoAtual = tipo;
          this.renderer.mudarTipo(tipo);
        }
      });
    });
    const btnBuscar = document.querySelector("#buscar");
    const inputBusca = document.querySelector("#search");
    btnBuscar === null || btnBuscar === void 0
      ? void 0
      : btnBuscar.addEventListener("click", () => {
          if (inputBusca) {
            this.termoAtual = inputBusca.value.trim();
            this.atualizarConteudo(this.tipoAtual, this.termoAtual);
          }
        });
  }
  atualizarConteudo(tipo_1, termo_1) {
    return __awaiter(
      this,
      arguments,
      void 0,
      function* (tipo, termo, limpar = false) {
        if (this.carregando || this.fimDosDados) return;
        this.carregando = true;
        if (limpar) {
          this.renderer.limpar();
          this.offset = 0;
          this.fimDosDados = false;
        }
        try {
          yield consumeAPI(tipo, termo, 0, 10, "", this.renderer);
          const total = yield consumeAPI(
            tipo,
            termo,
            this.offset,
            this.resultadosPorPagina,
            "",
            this.renderer,
          );
          this.offset += this.resultadosPorPagina;
          if (this.offset >= total) {
            this.fimDosDados = true;
          }
        } catch (error) {
          console.error("Erro ao atualizar conteúdo:", error);
        } finally {
          this.carregando = false;
        }
      },
    );
  }
}
