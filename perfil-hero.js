// Hero animado do Diagnóstico de Perfil: reproduz a análise real de um perfil (case @dramarianavilasboas).
// Cada item: [views, curtidas por mil views, gancho, estrutura, abertura]. Capas em cases/analise-capas.webp (sprite 10×4).
const LAB_DATA = [[5242,26.1,"Curiosidade","Opinião","A gente falou dos primeiros sete anos de vida."],[12331,33.8,"Curiosidade","Passo a passo","E como que eu recomendo, que eu oriento a você estar introduzindo o ovo na introdução…"],[13807,18.1,"Direto","Problema-solução","Parasitas intestinais, tá?"],[10179,21.7,"Erro comum","Explicação","O açúcar que o seu filho consome hoje pode aumentar o risco de demência quando ele for mais…"],[7300,35.8,"Direto","Problema-solução","Crianças com proteínas baixas no organismo, tá?"],[15753,34.4,"Reconhecimento","Problema-solução","Fazer lancheira da escola é o terror das mães."],[10556,26.2,"Contradição","História","Essa pediatra definitivamente não teve medo de te falar que o seu filho não deve tomar…"],[23586,28.3,"Direto","Problema-solução","E quando eu falo em romper ciclos, eu acredito muito que essa geração atual de pais é uma…"],[38617,29.7,"Direto","Passo a passo","Refrigerante."],[20153,36.2,"Contradição","Passo a passo","Cinco coisas que são taxadas como normais, mas não são."],[61345,27.5,"Direto","Passo a passo","Gente, eu tô aqui escolhendo manteiga."],[11012,25.7,"Curiosidade","Explicação","E o que é que a sua criança interior tá te falando?"],[137480,51.9,"Direto","Passo a passo","5 melhores carnes para o seu filho e toda a sua família consumirem no dia a dia."],[38905,42.1,"Direto","Passo a passo","Iogurte grego."],[8995,28.5,"Reconhecimento","Explicação","Outra criança com o intestino inflamado, ela vai ter sintoma de TDAH."],[526366,47.5,"Reconhecimento","História","Não é normal uma criança todo mês tomar antialérgico, antibiótico, corticoide, viver com…"],[100466,44.4,"Contradição","Ranking","manteiga quarto lugar manteiga gui terceiro lugar manteiga aqui diferente da manteiga…"],[9566,28.6,"Direto","Explicação","É muito importante avaliarmos a tireoide das nossas crianças."],[10462,41.3,"Contradição","Opinião","Porque tudo que eles chamam de evolução do trigo, na realidade foi um aumento da…"],[22321,22.8,"Curiosidade","Pergunta e resposta","O exame de fezes nem sempre vai mostrar que o seu filho está com parasitas intestinais."],[15284,22.6,"Reconhecimento","Passo a passo","Dados essenciais, então, que vocês têm que ter diante de bebês, principalmente bebês…"],[117152,54.9,"Curiosidade","Opinião","Os Estados Unidos acabaram de fazer uma das maiores mudanças no calendário vacinal infantil…"],[23276,28.6,"Erro comum","Problema-solução","A criança que dorme tarde, ela não vive uma infância só cansada."],[22494,14,"Contradição","Explicação","Gente, não é prejudicial esse álcool, tá?"],[223665,55.2,"Erro comum","Explicação","O número de câncer infantil só está aumentando de uma velocidade abrupta."],[23661,52.8,"Curiosidade","Passo a passo","Se eu recomeçasse do zero a saúde do meu filho, hoje eu faria essas três coisas."],[23233,27.1,"Erro comum","Problema-solução","o micro-ondas, ele não deve ser utilizado ali na sua rotina não, tá?"],[200634,31.2,"Direto","Passo a passo","4 alimentos inflamatórios que devem ser evitados ao máximo."],[17692,13.3,"Curiosidade","Explicação","TDAH, controle com suplementos ou fármacos, tá?"],[17872,13.7,"Curiosidade","Passo a passo","Sabe como esse produto tão consumido é feito?"],[49426,12.4,"Direto","Opinião","Iogurte natural é feito de leite de vaca."],[8524,15.5,"Resultado","Explicação","Então vamos lá, eu costumo falar o seguinte, que depois que eu me tornei mãe, eu me tornei…"],[28734,39.4,"Direto","Explicação","O seu filho vai aprender com o que você faz, não com o que você fala."],[452078,58.1,"Reconhecimento","Explicação","o filho foi desejado ou não?"],[263605,49.7,"Curiosidade","Passo a passo","Ei mãe, se seu filho tem esses sinais, ele pode estar com parasitas."],[12157920,52.1,"Direto","Passo a passo","Xarope Viking, oitavo lugar."],[587711,59.3,"Direto","Problema-solução","Quadros virais."],[1089397,46.2,"Erro comum","Passo a passo","Banana."],[744907,41,"Curiosidade","Ranking","Panela de tríplo inóxido."],[585544,20.5,"Erro comum","Problema-solução","Você sabe escolher feijão?"]];

(() => {
  const root = document.getElementById('lab');
  if (!root) return;
  const COLS = 10, ROWS = 4, N = LAB_DATA.length, STEP = 380, HOLD = 5200;
  const $ = s => root.querySelector(s);
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' mi' : n >= 1e3 ? Math.round(n / 1e3) + ' mil' : String(n);
  const views = LAB_DATA.map(d => d[0]).sort((a, b) => a - b), med = views[N >> 1];
  const likes = LAB_DATA.map(d => d[1]).sort((a, b) => a - b), medL = likes[N >> 1];
  const sprite = i => `background-position:${(i % COLS) / (COLS - 1) * 100}% ${Math.floor(i / COLS) / (ROWS - 1) * 100}%`;
  const X = v => Math.min(98, Math.max(2, (Math.log10(v) - 3) / 5 * 100));
  const Y = l => Math.min(94, Math.max(6, l / 60 * 100));

  const wall = $('#labWall'), map = $('#labMap');
  wall.innerHTML = LAB_DATA.map((_, i) => `<i style="${sprite(i)}"></i>`).join('');
  map.insertAdjacentHTML('beforeend', `<i class="mx" style="left:${X(med)}%"></i><i class="my" style="bottom:${Y(medL)}%"></i>`);
  const cells = [...wall.children];

  const show = i => {
    const [v, l, gancho, estrutura, hook] = LAB_DATA[i];
    cells.forEach((c, k) => c.classList.toggle('scan', k === i));
    cells[i].classList.add('on');
    const dot = document.createElement('i');
    dot.className = 'dot' + (v >= med * 5 ? ' hot' : '');
    dot.style.cssText = `${sprite(i)};left:${X(v)}%;bottom:${Y(l)}%`;
    map.appendChild(dot);
    $('#labN').textContent = i + 1;
    $('#labProg').style.width = ((i + 1) / N * 100) + '%';
    const mult = v / med;
    $('#labNow').innerHTML = `<div class="th" style="${sprite(i)}"></div><div><div class="tags"><span>${gancho}</span><span>${estrutura}</span></div><p>“${hook}”</p><small><b>${fmt(v)} views</b> · ${mult >= 10 ? Math.round(mult) : mult.toFixed(1).replace('.', ',')}× a mediana</small></div>`;
  };

  const reset = () => {
    root.classList.remove('done');
    cells.forEach(c => c.classList.remove('on', 'scan'));
    map.querySelectorAll('.dot').forEach(d => d.remove());
    $('#labN').textContent = 0; $('#labProg').style.width = '0';
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    LAB_DATA.forEach((_, i) => show(i));
    cells.forEach(c => c.classList.remove('scan'));
    root.classList.add('done');
    return;
  }

  let i = 0, timer = null;
  const tick = () => {
    if (i < N) { show(i++); timer = setTimeout(tick, STEP); return; }
    cells.forEach(c => c.classList.remove('scan'));
    root.classList.add('done');
    timer = setTimeout(() => { reset(); i = 0; timer = setTimeout(tick, 600); }, HOLD);
  };
  // Só anima quando o card está na tela (economiza bateria no celular).
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer) timer = setTimeout(tick, 500);
    else if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
  }).observe(root);
})();
