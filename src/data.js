/* ==========================================================
   DADOS DO SITE — edite aqui textos, telefone, domínio etc.
   Depois rode:  npm run build   (gera a pasta /public)
   ========================================================== */

const site = {
  name: 'DesentopeJÁ',
  fullName: 'DesentopeJÁ Hidráulica 24h',
  // >>> TROQUE pelo domínio definitivo (sem barra no final) <<<
  url: 'https://www.desentopeja.com.br',
  // Telefone exibido no site
  phoneDisplay: '11 94541-6519',
  // Telefone exibido nos botões de ligação
  phoneCallDisplay: '011 94541-6519',
  // Link de ligação (formato internacional funciona em qualquer celular)
  phoneHref: 'tel:+5511945416519',
  phoneSchema: '+55-11-94541-6519',
  whatsapp: '5511945416519',
  whatsappMsg: 'Olá, DesentopeJÁ! Vim pelo site e gostaria de um orçamento.',
  instagram: '', // ex.: 'https://www.instagram.com/desentopeja' (vazio = esconde o ícone)
  cnpj: '', // ex.: '00.000.000/0000-00' (vazio = não aparece no rodapé)
  region: 'ABC Paulista',
};

/* ---------------- SERVIÇOS ---------------- */
const services = [
  {
    slug: 'desentupimento-de-pia',
    name: 'Desentupimento de Pia',
    short: 'Desentupimento de pias',
    icon: 'sink',
    img: 'desentupimento-pia.webp',
    title: 'Desentupimento de Pia 24h no ABC | DesentopeJÁ',
    description: 'Desentupimento de pia de cozinha, banheiro e tanque no ABC Paulista 24h. Sem quebrar, com garantia e orçamento grátis. Ligue 11 94541-6519.',
    h1: ['Desentupimento de Pia', 'no ABC Paulista 24h'],
    lead: 'Pia de cozinha, banheiro ou tanque entupida? Chegamos rápido, desentupimos sem quebra-quebra e deixamos tudo limpo.',
    cardDesc: 'Cozinha, banheiro, tanque e caixa de gordura.',
    intro: [
      'A pia entupida é um dos problemas mais comuns em casas, apartamentos, restaurantes e comércios do ABC. Gordura, restos de comida, borra de café, cabelo e sabão vão se acumulando no sifão e na tubulação até que a água simplesmente para de descer — e normalmente isso acontece na hora mais inconveniente.',
      'A equipe da <b>DesentopeJÁ</b> faz o <b>desentupimento de pia</b> com máquinas rotativas e equipamentos profissionais, sem precisar quebrar azulejo ou parede. Atendemos pias de cozinha, lavatórios de banheiro, tanques de lavanderia, cubas de inox e caixas de gordura ligadas à rede.',
    ],
    signs: [
      'Água demorando para descer ou parada na cuba',
      'Barulho de “gorgolejo” quando a água escoa',
      'Mau cheiro saindo do ralo da pia',
      'Água voltando pelo ralo do tanque ou da máquina de lavar',
      'Caixa de gordura transbordando',
    ],
    causes: [
      ['Gordura e óleo de cozinha', 'Solidificam dentro do cano e formam uma crosta que retém tudo o que passa.'],
      ['Restos de alimentos', 'Arroz, borra de café, cascas e farinhas se acumulam no sifão.'],
      ['Cabelo e resíduos de sabão', 'Muito comum em pias de banheiro: formam uma massa que trava o escoamento.'],
      ['Caixa de gordura cheia', 'Sem limpeza periódica, a gordura volta para a tubulação da cozinha.'],
    ],
    steps: [
      ['Diagnóstico', 'Identificamos se o entupimento está no sifão, no ramal da parede ou na caixa de gordura.'],
      ['Desmontagem do sifão', 'Limpeza do sifão e da válvula, onde fica a maior parte dos resíduos.'],
      ['Máquina rotativa (cabo de aço)', 'Removemos a obstrução dentro da tubulação, sem quebrar nada.'],
      ['Teste e limpeza final', 'Testamos o escoamento com bastante água e deixamos o local limpo.'],
    ],
    prevention: [
      'Nunca descarte óleo de cozinha na pia — guarde em garrafa PET e leve a um ponto de coleta.',
      'Use ralo com peneira para segurar restos de comida.',
      'Jogue água quente uma vez por semana para ajudar a dissolver a gordura.',
      'Faça a limpeza da caixa de gordura pelo menos a cada 6 meses.',
    ],
    faq: [
      ['Vocês quebram a parede para desentupir a pia?', 'Não. Em praticamente todos os casos o desentupimento é feito pelo sifão ou pela caixa de gordura, com máquina rotativa e cabos de aço, sem quebra-quebra.'],
      ['Quanto tempo demora para desentupir uma pia?', 'Na maioria dos atendimentos o serviço leva entre 30 minutos e 1 hora, dependendo da distância e da quantidade de gordura acumulada.'],
      ['Soda cáustica resolve o entupimento da pia?', 'Pode até aliviar um entupimento leve, mas danifica canos de PVC, é perigosa e não remove a gordura endurecida. O ideal é a remoção mecânica feita por profissional.'],
      ['Atendem pia de restaurante e comércio?', 'Sim. Atendemos residências, condomínios, restaurantes, lanchonetes e indústrias em todo o ABC Paulista, 24 horas.'],
    ],
  },
  {
    slug: 'desentupimento-de-ralo',
    name: 'Desentupimento de Ralo',
    short: 'Desentupimento de ralos',
    icon: 'drain',
    img: null,
    title: 'Desentupimento de Ralo 24h no ABC | DesentopeJÁ',
    description: 'Ralo de banheiro, box, área de serviço ou quintal entupido? Desentupimento de ralo 24h em todo o ABC Paulista, sem quebrar. Ligue 11 94541-6519.',
    h1: ['Desentupimento de Ralo', 'no ABC Paulista 24h'],
    lead: 'Ralo do box, banheiro, área de serviço, quintal ou garagem entupido? Resolvemos rápido e sem quebrar o piso.',
    cardDesc: 'Box, banheiro, lavanderia, quintal e garagem.',
    intro: [
      'Ralo entupido causa alagamento no box, mau cheiro, aparecimento de insetos e até infiltração no andar de baixo. O problema costuma começar devagar — a água demora um pouco mais para descer — até que o ralo para de escoar de vez.',
      'A <b>DesentopeJÁ</b> realiza <b>desentupimento de ralo</b> de banheiro, box, lavanderia, área externa, quintal, garagem e ralos lineares. Usamos máquinas desentupidoras e hidrojateamento quando necessário, sem quebrar o piso e com garantia do serviço.',
    ],
    signs: [
      'Água acumulando no box durante o banho',
      'Mau cheiro de esgoto vindo do ralo',
      'Baratas e pequenos insetos saindo do ralo',
      'Ralo da área externa transbordando quando chove',
      'Água subindo por um ralo quando outro é usado',
    ],
    causes: [
      ['Cabelo e pelos', 'O principal vilão do ralo do box: se enrola e forma um tampão.'],
      ['Sabão e resíduos de produtos', 'Criam uma camada pegajosa que prende sujeira.'],
      ['Terra, folhas e areia', 'Comum em ralos de quintal, garagem e áreas externas.'],
      ['Caixa sifonada suja', 'A caixa sifonada acumula resíduos e precisa de limpeza periódica.'],
    ],
    steps: [
      ['Avaliação do ralo', 'Verificamos ralo, caixa sifonada e a tubulação que liga ao esgoto.'],
      ['Limpeza da caixa sifonada', 'Retiramos cabelos, sabão e sujeira acumulada.'],
      ['Desobstrução mecânica', 'Máquina com cabo de aço ou hidrojateamento para limpar a tubulação.'],
      ['Teste de vazão', 'Conferimos o escoamento e orientamos sobre a manutenção.'],
    ],
    prevention: [
      'Use protetor (grelha) de ralo para segurar cabelos no box.',
      'Limpe a caixa sifonada a cada 2 ou 3 meses.',
      'Evite lavar o quintal jogando terra e folhas no ralo.',
      'Mantenha o ralo sempre com água para evitar mau cheiro (fecho hídrico).',
    ],
    faq: [
      ['Por que o ralo do banheiro fica com cheiro de esgoto?', 'Normalmente é falta de água no fecho hídrico da caixa sifonada, sujeira acumulada ou problema na ventilação do esgoto. Fazemos o diagnóstico e a limpeza no mesmo atendimento.'],
      ['Precisa quebrar o piso para desentupir o ralo?', 'Não. O desentupimento é feito pelo próprio ralo e pela caixa sifonada com máquinas profissionais, sem quebrar o piso.'],
      ['Desentopem ralo de área externa e garagem?', 'Sim. Atendemos ralos de quintal, garagem, calçada, ralos lineares e grelhas de drenagem.'],
      ['Atendem ralo entupido de madrugada ou no fim de semana?', 'Sim, o atendimento é 24 horas, inclusive sábados, domingos e feriados.'],
    ],
  },
  {
    slug: 'desentupimento-de-vaso-sanitario',
    name: 'Desentupimento de Vaso Sanitário',
    short: 'Desentupimento de vasos sanitários',
    icon: 'toilet',
    img: null,
    title: 'Desentupimento de Vaso Sanitário 24h no ABC | DesentopeJÁ',
    description: 'Vaso sanitário entupido? Desentupimento de privada 24h no ABC Paulista sem quebrar e sem retirar o vaso. Orçamento grátis: 11 94541-6519.',
    h1: ['Desentupimento de Vaso Sanitário', 'no ABC Paulista 24h'],
    lead: 'Vaso sanitário entupido ou transbordando? Atendimento de emergência 24h, sem retirar o vaso e sem quebra-quebra.',
    cardDesc: 'Privada entupida, transbordando ou com retorno.',
    intro: [
      'Vaso sanitário entupido é uma emergência: além do incômodo, há risco de transbordamento, contaminação e mau cheiro por toda a casa. Tentar resolver com cabide, produtos químicos ou excesso de descarga normalmente piora a situação.',
      'A <b>DesentopeJÁ</b> faz o <b>desentupimento de vaso sanitário</b> com equipamentos próprios para louças, que não riscam nem trincam a peça. Na grande maioria dos casos resolvemos sem retirar o vaso do lugar, de forma rápida e higiênica.',
    ],
    signs: [
      'A água sobe e demora para descer após a descarga',
      'Vaso transbordando ou com retorno de água',
      'Borbulhas e barulho na descarga',
      'Mau cheiro forte no banheiro',
      'Ralo do banheiro voltando água quando dá descarga',
    ],
    causes: [
      ['Papel higiênico em excesso', 'Grandes quantidades de uma vez formam um bloco que trava a saída.'],
      ['Objetos e itens indevidos', 'Absorventes, fio dental, lenços umedecidos, fraldas e brinquedos.'],
      ['Gordura e resíduos no esgoto', 'Quando a obstrução está na rede, o vaso é o primeiro a dar sinal.'],
      ['Problemas na ventilação', 'Tubulação sem respiro adequado deixa a descarga fraca.'],
    ],
    steps: [
      ['Avaliação', 'Verificamos se o entupimento está no vaso, no ramal ou na rede de esgoto.'],
      ['Desentupidor e sonda própria para louça', 'Removemos a obstrução sem danificar o esmalte do vaso.'],
      ['Máquina rotativa no ramal', 'Se necessário, limpamos a tubulação até a caixa de inspeção.'],
      ['Teste de descarga e higienização', 'Testamos várias descargas e deixamos o banheiro limpo.'],
    ],
    prevention: [
      'Tenha sempre um cesto de lixo no banheiro.',
      'Nunca jogue lenço umedecido, absorvente, fio dental ou cotonete no vaso.',
      'Evite dar descarga com muito papel de uma vez.',
      'Verifique periodicamente a caixa de inspeção do esgoto.',
    ],
    faq: [
      ['Precisa tirar o vaso do lugar para desentupir?', 'Na grande maioria dos casos não. Usamos sondas e equipamentos específicos que desentopem o vaso sem retirá-lo. Só removemos a peça quando há um objeto preso que não sai de outra forma.'],
      ['Lenço umedecido entope o vaso?', 'Sim. Diferente do papel higiênico, o lenço umedecido não se desfaz na água e é uma das principais causas de entupimento.'],
      ['Vocês atendem vaso entupido de madrugada?', 'Sim. Nosso atendimento é 24 horas em todo o ABC Paulista, inclusive em feriados.'],
      ['O serviço tem garantia?', 'Sim. Todo desentupimento realizado pela DesentopeJÁ tem garantia do serviço executado.'],
    ],
  },
  {
    slug: 'desentupimento-de-esgoto',
    name: 'Desentupimento de Esgoto',
    short: 'Desentupimento de esgoto',
    icon: 'sewer',
    img: 'encanamento.webp',
    title: 'Desentupimento de Esgoto 24h no ABC | DesentopeJÁ',
    description: 'Desentupimento de esgoto, caixa de inspeção e rede coletora no ABC Paulista. Hidrojateamento e máquinas profissionais 24h. Ligue 11 94541-6519.',
    h1: ['Desentupimento de Esgoto', 'no ABC Paulista 24h'],
    lead: 'Esgoto voltando, caixa de inspeção transbordando ou mau cheiro? Desentupimento de rede de esgoto com equipamentos profissionais.',
    cardDesc: 'Rede de esgoto, caixa de inspeção e coluna.',
    intro: [
      'Quando o esgoto entope, o problema aparece em vários pontos ao mesmo tempo: ralos voltando água, vaso que não desce, caixa de inspeção transbordando no quintal e mau cheiro forte. É uma situação que exige atendimento rápido para evitar contaminação e danos ao imóvel.',
      'A <b>DesentopeJÁ</b> realiza <b>desentupimento de esgoto</b> residencial, comercial, de condomínios e indústrias, incluindo redes coletoras, colunas de prédio e caixas de inspeção. Trabalhamos com máquinas rotativas de alta potência e hidrojateamento, que limpam toda a parede interna da tubulação.',
    ],
    signs: [
      'Vários ralos e vasos entupidos ao mesmo tempo',
      'Caixa de inspeção cheia ou transbordando',
      'Retorno de esgoto pelo ralo mais baixo da casa',
      'Mau cheiro constante no imóvel ou no quintal',
      'Barulho de borbulhas nos ralos e vasos',
    ],
    causes: [
      ['Acúmulo de gordura na rede', 'Ao longo dos anos a gordura reduz o diâmetro útil do cano.'],
      ['Raízes de árvores', 'Raízes entram pelas juntas da tubulação em busca de água.'],
      ['Objetos e resíduos sólidos', 'Lenços, fraldas, absorventes e entulho de obra.'],
      ['Tubulação antiga ou com caimento errado', 'Favorece o acúmulo de sedimentos e entupimentos frequentes.'],
    ],
    steps: [
      ['Localização do ponto de obstrução', 'Abertura das caixas de inspeção e análise do trajeto da rede.'],
      ['Desobstrução com máquina rotativa', 'Cabos de aço de alta potência rompem a obstrução.'],
      ['Hidrojateamento (quando necessário)', 'Água em alta pressão remove gordura, raízes e sedimentos das paredes do cano.'],
      ['Teste e orientação', 'Testamos todo o sistema e indicamos a manutenção preventiva ideal.'],
    ],
    prevention: [
      'Faça a limpeza preventiva da rede de esgoto e das caixas de inspeção anualmente.',
      'Não descarte gordura, lenço umedecido ou fio dental no esgoto.',
      'Em condomínios, programe hidrojateamento preventivo das colunas.',
      'Fique atento a árvores próximas à tubulação.',
    ],
    faq: [
      ['O que é hidrojateamento?', 'É a limpeza da tubulação com jato de água em alta pressão. Ele remove gordura, raízes e sedimentos grudados nas paredes do cano, deixando a rede como nova, sem produtos químicos.'],
      ['Atendem condomínios e prédios?', 'Sim. Fazemos desentupimento de colunas, prumadas, redes coletoras e caixas de inspeção em condomínios de todo o ABC Paulista.'],
      ['O esgoto está voltando pelo ralo. O que fazer?', 'Evite usar pias, chuveiros e descargas até o atendimento, pois isso aumenta o retorno. Chame a DesentopeJÁ pelo WhatsApp ou telefone que enviamos um técnico o mais rápido possível.'],
      ['Vocês fazem limpeza de caixa de inspeção?', 'Sim. A limpeza da caixa de inspeção faz parte do desentupimento de esgoto e também pode ser feita de forma preventiva.'],
    ],
  },
  {
    slug: 'encanador',
    name: 'Encanador 24h',
    short: 'Encanador e encanamento',
    icon: 'pipes',
    img: 'vazamento.webp',
    title: 'Encanador 24h no ABC Paulista | Serviços de Encanamento',
    description: 'Encanador 24h no ABC Paulista: vazamentos, troca de registros e torneiras, instalações e reparos hidráulicos. Orçamento grátis: 11 94541-6519.',
    h1: ['Encanador 24h', 'no ABC Paulista'],
    lead: 'Vazamentos, troca de registros e torneiras, instalações e reparos hidráulicos em geral, com encanadores experientes.',
    cardDesc: 'Vazamentos, registros, torneiras e instalações.',
    intro: [
      'Um bom encanador faz toda a diferença: um reparo malfeito no encanamento pode gerar infiltração, conta de água alta e retrabalho. Por isso, a <b>DesentopeJÁ</b> conta com encanadores experientes para cuidar de toda a parte hidráulica da sua casa, apartamento, comércio ou condomínio.',
      'Nosso <b>serviço de encanador</b> cobre desde pequenos reparos — como trocar uma torneira ou um reparo de descarga — até instalações completas de água fria e quente, troca de tubulação e conserto de vazamentos em geral.',
    ],
    signs: [
      'Conta de água subindo sem motivo',
      'Manchas de umidade ou mofo em paredes e tetos',
      'Torneira ou registro pingando',
      'Barulho de água correndo com tudo fechado',
      'Pressão de água fraca nos chuveiros e torneiras',
    ],
    causes: [
      ['Vazamentos em geral', 'Conserto de vazamentos em tubulações, conexões, flexíveis e sifões.'],
      ['Troca de registros e torneiras', 'Substituição de registros de gaveta, pressão, torneiras e misturadores.'],
      ['Instalações hidráulicas', 'Instalação de pias, tanques, chuveiros, filtros, máquinas de lavar e aquecedores.'],
      ['Reparos de descarga', 'Caixa acoplada, válvula de descarga (Hydra) e boia de caixa d’água.'],
    ],
    steps: [
      ['Atendimento e diagnóstico', 'O encanador identifica a origem do problema antes de qualquer reparo.'],
      ['Orçamento sem compromisso', 'Você aprova o valor antes de começarmos o serviço.'],
      ['Execução com material de qualidade', 'Utilizamos conexões e peças de marcas reconhecidas.'],
      ['Teste e garantia', 'Testamos pressão e estanqueidade e entregamos o serviço com garantia.'],
    ],
    prevention: [
      'Faça uma revisão hidráulica anual, principalmente em imóveis antigos.',
      'Troque os flexíveis de pia e vaso a cada 5 anos.',
      'Feche o registro geral ao viajar por muitos dias.',
      'Fique atento ao hidrômetro: se girar com tudo fechado, há vazamento.',
    ],
    faq: [
      ['Vocês têm encanador 24 horas?', 'Sim. A DesentopeJÁ atende 24 horas por dia, 7 dias por semana, em todas as cidades do ABC Paulista.'],
      ['O encanador cobra para fazer o orçamento?', 'Não cobramos orçamento. O valor é passado e aprovado por você antes do início do serviço.'],
      ['Fazem troca de registro e torneira?', 'Sim. Trocamos registros de gaveta e pressão, torneiras, misturadores, reparos de descarga, flexíveis e sifões.'],
      ['Como saber se tenho um vazamento escondido?', 'Feche todas as torneiras e observe o hidrômetro: se ele continuar girando, existe vazamento. Nosso encanador localiza e conserta o problema.'],
    ],
  },
];

/* ---------------- CIDADES DO ABC PAULISTA ---------------- */
const cities = [
  {
    slug: 'desentupidora-santo-andre',
    name: 'Santo André',
    short: 'Santo André',
    title: 'Desentupidora em Santo André 24h | DesentopeJÁ',
    description: 'Desentupidora em Santo André 24h: pia, ralo, vaso sanitário, esgoto e encanador. Chegamos rápido em todos os bairros. Ligue 11 94541-6519.',
    neighborhoods: ['Centro', 'Vila Assunção', 'Jardim', 'Campestre', 'Vila Bastos', 'Utinga', 'Vila Pires', 'Parque das Nações', 'Camilópolis', 'Vila Luzita', 'Parque Capuava', 'Jardim Santo André', 'Bangú', 'Parque Novo Oratório', 'Paraíso'],
    intro: 'Santo André é uma das maiores cidades do ABC Paulista e reúne desde casas térreas e sobrados antigos até grandes condomínios residenciais e um comércio muito ativo no Centro e na região da Avenida Industrial. Essa diversidade exige uma desentupidora preparada para tudo: da pia entupida de um apartamento na Vila Bastos ao esgoto de um restaurante no Centro.',
    detail: 'Em bairros com imóveis mais antigos, como Vila Pires, Utinga e Camilópolis, é comum encontrar tubulações com décadas de uso, acúmulo de gordura e caixas de inspeção que precisam de limpeza. Já nos condomínios da Vila Assunção, Jardim e Campestre, os chamados mais frequentes são de colunas de esgoto e ralos de apartamentos. A DesentopeJÁ atende todos esses cenários 24 horas.',
    faq: ['Vocês atendem em todos os bairros de Santo André?', 'Sim. Atendemos todos os bairros de Santo André, incluindo Centro, Vila Assunção, Jardim, Utinga, Vila Luzita, Parque Capuava e região do Paranapiacaba, com agendamento.'],
  },
  {
    slug: 'desentupidora-sao-bernardo-do-campo',
    name: 'São Bernardo do Campo',
    short: 'São Bernardo',
    title: 'Desentupidora em São Bernardo do Campo 24h | DesentopeJÁ',
    description: 'Desentupidora em São Bernardo do Campo 24h: pia, ralo, vaso, esgoto e encanador. Atendimento rápido em todos os bairros. Ligue 11 94541-6519.',
    neighborhoods: ['Centro', 'Rudge Ramos', 'Baeta Neves', 'Nova Petrópolis', 'Assunção', 'Jardim do Mar', 'Planalto', 'Demarchi', 'Ferrazópolis', 'Taboão', 'Paulicéia', 'Anchieta', 'Independência', 'Alves Dias', 'Riacho Grande'],
    intro: 'São Bernardo do Campo é a maior cidade do ABC em área e população, com bairros residenciais consolidados, muitos prédios na região central e em Rudge Ramos e um polo industrial importante. Por isso, a procura por desentupidora em São Bernardo é constante — de residências a indústrias e condomínios.',
    detail: 'Atendemos desde os bairros mais centrais, como Centro, Jardim do Mar, Nova Petrópolis e Baeta Neves, até regiões mais afastadas como Demarchi, Alves Dias e Riacho Grande. Em condomínios verticais realizamos desentupimento de colunas e hidrojateamento preventivo; em casas e comércios, desentupimento de pia, ralo, vaso sanitário e esgoto com rapidez e garantia.',
    faq: ['Atendem o Riacho Grande e regiões mais afastadas de São Bernardo?', 'Sim. Atendemos toda São Bernardo do Campo, inclusive Riacho Grande, Alves Dias e Demarchi. O tempo de chegada pode variar conforme a distância, e informamos a previsão no momento do contato.'],
  },
  {
    slug: 'desentupidora-sao-caetano-do-sul',
    name: 'São Caetano do Sul',
    short: 'São Caetano',
    title: 'Desentupidora em São Caetano do Sul 24h | DesentopeJÁ',
    description: 'Desentupidora em São Caetano do Sul 24h: desentupimento de pia, ralo, vaso, esgoto e encanador. Rápido e com garantia. Ligue 11 94541-6519.',
    neighborhoods: ['Centro', 'Santa Paula', 'Barcelona', 'Santa Maria', 'Cerâmica', 'Fundação', 'Nova Gerty', 'Olímpico', 'Oswaldo Cruz', 'Prosperidade', 'Santo Antônio', 'São José', 'Boa Vista', 'Mauá'],
    intro: 'São Caetano do Sul é uma cidade compacta, muito verticalizada e com grande quantidade de prédios residenciais e comerciais. Essa característica faz com que entupimentos em colunas de esgoto, ralos de apartamentos e pias de cozinha sejam chamados bastante frequentes por aqui.',
    detail: 'Por ser uma cidade menor em extensão, conseguimos chegar rapidamente a qualquer bairro de São Caetano — Santa Paula, Barcelona, Cerâmica, Fundação, Olímpico ou Centro. Trabalhamos com cuidado redobrado em apartamentos e áreas comuns de condomínio, protegendo pisos e deixando tudo limpo ao final do serviço.',
    faq: ['Atendem prédios e condomínios em São Caetano?', 'Sim. Atendemos apartamentos, áreas comuns e colunas de esgoto de condomínios em todos os bairros de São Caetano do Sul, com hidrojateamento quando necessário.'],
  },
  {
    slug: 'desentupidora-diadema',
    name: 'Diadema',
    short: 'Diadema',
    title: 'Desentupidora em Diadema 24h | DesentopeJÁ',
    description: 'Desentupidora em Diadema 24h: pia, ralo, vaso sanitário, esgoto e serviços de encanador. Atendimento rápido em todos os bairros. 11 94541-6519.',
    neighborhoods: ['Centro', 'Eldorado', 'Serraria', 'Taboão', 'Piraporinha', 'Canhema', 'Conceição', 'Campanário', 'Vila Nogueira', 'Casa Grande', 'Inamar'],
    intro: 'Diadema é uma cidade densamente povoada, com muitas casas, sobrados e pequenos comércios, além de um forte polo industrial. Em imóveis residenciais, os entupimentos de pia, ralo e vaso sanitário são os mais comuns; em comércios e indústrias, o desentupimento de esgoto e de caixas de gordura é essencial para manter a operação funcionando.',
    detail: 'Atendemos todos os bairros de Diadema — Centro, Eldorado, Serraria, Taboão, Piraporinha, Canhema, Conceição e demais regiões — com equipe preparada e equipamentos profissionais. Também realizamos serviços de encanador, como conserto de vazamentos e troca de registros e torneiras.',
    faq: ['Fazem desentupimento em comércios e indústrias de Diadema?', 'Sim. Atendemos comércios, restaurantes, galpões e indústrias de Diadema, inclusive com limpeza de caixa de gordura e hidrojateamento da rede de esgoto.'],
  },
  {
    slug: 'desentupidora-maua',
    name: 'Mauá',
    short: 'Mauá',
    title: 'Desentupidora em Mauá 24h | DesentopeJÁ',
    description: 'Desentupidora em Mauá 24h: desentupimento de pia, ralo, vaso, esgoto e encanador em todos os bairros. Orçamento grátis: 11 94541-6519.',
    neighborhoods: ['Centro', 'Matriz', 'Jardim Zaíra', 'Parque São Vicente', 'Vila Assis Brasil', 'Jardim Itapeva', 'Jardim Rosina', 'Parque das Américas', 'Vila Bocaina', 'Jardim Primavera', 'Sertãozinho', 'Feital'],
    intro: 'Mauá tem uma ocupação bastante residencial, com muitas casas, sobrados e conjuntos habitacionais espalhados por bairros como Jardim Zaíra, Parque São Vicente e Vila Assis Brasil. Nessas residências, entupimentos de pia de cozinha, ralo de banheiro e vaso sanitário estão entre os chamados mais frequentes.',
    detail: 'A DesentopeJÁ atende Mauá 24 horas, do Centro e Matriz até bairros como Jardim Itapeva, Parque das Américas, Sertãozinho e Feital. Além do desentupimento, nossos encanadores resolvem vazamentos, trocam registros e torneiras e fazem reparos hidráulicos em geral.',
    faq: ['Vocês atendem Mauá de madrugada?', 'Sim. Nosso atendimento em Mauá é 24 horas, inclusive de madrugada, finais de semana e feriados.'],
  },
  {
    slug: 'desentupidora-ribeirao-pires',
    name: 'Ribeirão Pires',
    short: 'Ribeirão Pires',
    title: 'Desentupidora em Ribeirão Pires 24h | DesentopeJÁ',
    description: 'Desentupidora em Ribeirão Pires 24h: pia, ralo, vaso sanitário, esgoto e encanador. Atendimento em toda a cidade. Ligue 11 94541-6519.',
    neighborhoods: ['Centro', 'Ouro Fino Paulista', 'Santa Luzia', 'Quarta Divisão', 'Pastoril', 'Jardim Caçula', 'Barro Branco', 'Jardim Valentina', 'Vila Suíssa', 'Estância Noblesse'],
    intro: 'Ribeirão Pires é conhecida pelas áreas verdes e por estar em região de mananciais. Muitos imóveis contam com fossa, caixas de inspeção em quintais amplos e tubulações próximas a árvores — fatores que tornam comuns os entupimentos de esgoto causados por raízes, terra e folhas.',
    detail: 'Atendemos todos os bairros de Ribeirão Pires, como Centro, Ouro Fino Paulista, Santa Luzia, Quarta Divisão, Pastoril e Jardim Caçula. Fazemos desentupimento de pia, ralo, vaso sanitário, esgoto e ralos de área externa, além de serviços de encanador para vazamentos e instalações hidráulicas.',
    faq: ['Raízes de árvore podem entupir o esgoto?', 'Sim. Em cidades arborizadas como Ribeirão Pires, raízes entram pelas juntas dos canos e causam entupimentos recorrentes. Usamos máquinas rotativas com lâminas e hidrojateamento para removê-las.'],
  },
  {
    slug: 'desentupidora-rio-grande-da-serra',
    name: 'Rio Grande da Serra',
    short: 'Rio Grande da Serra',
    title: 'Desentupidora em Rio Grande da Serra 24h | DesentopeJÁ',
    description: 'Desentupidora em Rio Grande da Serra 24h: pia, ralo, vaso, esgoto e encanador. Atendimento rápido e orçamento grátis. Ligue 11 94541-6519.',
    neighborhoods: ['Centro', 'Jardim Santa Tereza', 'Parque América', 'Vila Lopes', 'Jardim Encantado', 'Pedreira'],
    intro: 'Rio Grande da Serra é a menor cidade do ABC Paulista em população e fica em plena área de proteção de mananciais. Muitas residências possuem quintais, ralos externos e caixas de inspeção que acumulam terra e folhas, principalmente em épocas de chuva.',
    detail: 'Mesmo sendo a cidade mais afastada do ABC, a DesentopeJÁ atende Rio Grande da Serra 24 horas, com desentupimento de pia, ralo, vaso sanitário e esgoto, além de serviços de encanador. Informamos a previsão de chegada no primeiro contato para você se programar.',
    faq: ['Vocês realmente atendem em Rio Grande da Serra?', 'Sim. Atendemos Rio Grande da Serra e todo o ABC Paulista. Chame no WhatsApp ou ligue e informamos a previsão de chegada do técnico.'],
  },
];

/* ---------------- DEPOIMENTOS ----------------
   IMPORTANTE: substitua pelos depoimentos REAIS dos seus clientes
   (por exemplo, copiados das avaliações do Google Meu Negócio).        */
const testimonials = [
  { text: 'Serviço rápido, bem feito e sem enrolação! Super recomendo!', name: 'Fernanda S.', city: 'Santo André - SP' },
  { text: 'Chegaram no horário, resolveram o problema e ainda explicaram tudo. Excelente equipe!', name: 'Carlos M.', city: 'São Caetano do Sul - SP' },
  { text: 'Atendimento nota 10! Profissionais educados, competentes e com preço justo.', name: 'Juliana T.', city: 'Mauá - SP' },
];

/* ---------------- PERGUNTAS FREQUENTES (home) ---------------- */
const homeFaq = [
  ['A DesentopeJÁ atende 24 horas?', 'Sim. Atendemos 24 horas por dia, 7 dias por semana, incluindo finais de semana e feriados, em todas as cidades do ABC Paulista.'],
  ['Quais cidades vocês atendem?', 'Atendemos Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra.'],
  ['Vocês cobram pelo orçamento?', 'Não. O orçamento é sem compromisso, e você só aprova o serviço depois de saber o valor.'],
  ['Precisa quebrar piso ou parede para desentupir?', 'Na grande maioria dos casos não. Trabalhamos com máquinas rotativas e hidrojateamento, que desentopem sem quebra-quebra.'],
  ['Como faço para chamar um técnico?', 'É só chamar no WhatsApp ou ligar para 11 94541-6519. Informamos a previsão de chegada na hora.'],
];

module.exports = { site, services, cities, testimonials, homeFaq };
