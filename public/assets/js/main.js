/* DesentopeJÁ — scripts do site */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Scroll automático para o topo ao trocar de página.
     O navegador costuma "lembrar" a posição da rolagem; aqui desligamos
     isso e sempre abrimos a página no começo (ou na âncora, se houver).
     ------------------------------------------------------------------ */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function goTop() {
    var hash = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
    var target = hash && document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }
  goTop();
  document.addEventListener('DOMContentLoaded', goTop);
  // pageshow cobre o botão "voltar" (cache do navegador)
  window.addEventListener('pageshow', goTop);

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;

    /* Menu mobile */
    var toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = body.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    /* Dropdowns (clique no mobile / teclado) */
    document.querySelectorAll('.has-dd .dd-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var li = btn.closest('.has-dd');
        var isOpen = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.querySelectorAll('.has-dd.open').forEach(function (other) {
          if (other !== li) other.classList.remove('open');
        });
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.has-dd')) {
        document.querySelectorAll('.has-dd.open').forEach(function (li) { li.classList.remove('open'); });
      }
    });

    /* Âncoras na mesma página: rolagem suave e fecha o menu */
    document.querySelectorAll('a[href*="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var url = new URL(a.href, location.href);
        if (url.pathname !== location.pathname || !url.hash) return;
        var el = document.getElementById(url.hash.slice(1));
        if (!el) return;
        e.preventDefault();
        body.classList.remove('nav-open');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', url.hash);
      });
    });

    /* Botão voltar ao topo */
    var topBtn = document.querySelector('.to-top');
    if (topBtn) {
      topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      var onScroll = function () { topBtn.classList.toggle('show', window.scrollY > 600); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Animação de entrada */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -60px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('in'); });
    }

    /* Formulário de orçamento -> WhatsApp */
    var form = document.getElementById('form-orcamento');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var f = form.elements;
        var msg = 'Olá, DesentopeJÁ! Gostaria de um orçamento.' +
          '\n\nNome: ' + f.nome.value +
          '\nTelefone: ' + f.telefone.value +
          '\nServiço: ' + f.servico.value +
          '\nCidade: ' + f.cidade.value +
          (f.bairro.value ? '\nBairro: ' + f.bairro.value : '') +
          (f.mensagem.value ? '\n\n' + f.mensagem.value : '');
        var num = form.getAttribute('data-wa');
        window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    }

    /* Ano no rodapé */
    var y = document.getElementById('ano');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
