// script.js — JavaScript da Colinha Frontend
// ============================================================

// ============================================================
// TABS — Alterna entre painéis de conteúdo
// ============================================================

function showTab(id) {
  var paineis = document.querySelectorAll('.tab-panel');
  paineis.forEach(function(painel) { painel.classList.remove('active'); });

  var botoes = document.querySelectorAll('.tab-btn');
  botoes.forEach(function(botao) { botao.classList.remove('active'); });

  var painelAtivo = document.getElementById('tab-' + id);
  if (painelAtivo) painelAtivo.classList.add('active');

  event.target.classList.add('active');
}


// ============================================================
// CAROUSEL — Controla o slider de slides
// ============================================================

// Índice do slide atual (começa em 0)
var slideAtual = 0;
var totalSlides = 3;

/**
 * moverSlide(direcao) — -1 volta, +1 avança
 */
function moverSlide(direcao) {
  slideAtual = slideAtual + direcao;

  // Volta ao início se passar do último
  if (slideAtual >= totalSlides) slideAtual = 0;

  // Vai ao último se voltar do primeiro
  if (slideAtual < 0) slideAtual = totalSlides - 1;

  aplicarSlide();
}

/**
 * irParaSlide(indice) — Vai direto para um slide
 */
function irParaSlide(indice) {
  slideAtual = indice;
  aplicarSlide();
}

/**
 * aplicarSlide() — Move o track com translateX e atualiza as bolinhas
 */
function aplicarSlide() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;

  // Cada slide = 100% de largura → slide 2 = translateX(-200%)
  var deslocamento = slideAtual * -100;
  track.style.transform = 'translateX(' + deslocamento + '%)';

  // Atualiza bolinhas indicadoras
  var dots = document.querySelectorAll('.ex-dot');
  dots.forEach(function(dot, i) {
    dot.classList.toggle('active', i === slideAtual);
  });
}


// ============================================================
// MODAL — Abre e fecha a janela de diálogo
// ============================================================

function abrirModal() {
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
  // Trava o scroll enquanto modal está aberto
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// Fecha com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharModal();
});


// ============================================================
// TOAST — Notificação temporária na borda da tela
// ============================================================

var toastTimer = null;

/**
 * mostrarToast(tipo) — 'success', 'error' ou 'warning'
 */
function mostrarToast(tipo) {
  var toast = document.getElementById('toast');
  if (!toast) return;

  // Configurações de texto e cor por tipo
  var config = {
    success: { texto: '✅ Salvo com sucesso!',            cor: '#10b981' },
    error:   { texto: '❌ Ops! Algo deu errado.',          cor: '#ef4444' },
    warning: { texto: '⚠️ Atenção: verifique os dados.',  cor: '#f59e0b' }
  };

  var item = config[tipo] || config.success;
  toast.textContent = item.texto;
  toast.style.background = item.cor;
  toast.classList.add('visible');

  // Cancela timer anterior (evita sobreposição)
  if (toastTimer) clearTimeout(toastTimer);

  // Esconde automaticamente após 3 segundos
  toastTimer = setTimeout(function() {
    toast.classList.remove('visible');
  }, 3000);
}

// PAGINA DE EXERCICIO -- BOTÃO MOSTRAR RESPOSTA
// Toggle resposta
document.querySelectorAll(".btn-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.classList.toggle("active");
  });
});

// Tabs
document.querySelectorAll(".tabs").forEach(tabContainer => {
  const tabs = tabContainer.querySelectorAll(".tab");
  const blocks = tabContainer.parentElement.querySelectorAll(".code-block");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      blocks.forEach(b => b.classList.remove("active"));

      tab.classList.add("active");

      const target = tab.dataset.tab;
      tabContainer.parentElement
        .querySelector(`[data-content="${target}"]`)
        .classList.add("active");
    });
  });
});

// Copiar codigo
document.querySelectorAll(".copy-btn").forEach(btn => {

btn.addEventListener("click", function(){

const code = this.parentElement.querySelector(".code-block.active code").innerText;

navigator.clipboard.writeText(code);

this.innerText = "Copiado!";

setTimeout(()=>{
this.innerText = "Copiar";
},1500);
});
});
