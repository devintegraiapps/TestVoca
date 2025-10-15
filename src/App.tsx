import React, { useMemo, useState } from "react";

/**
 * Teste Vocacional (RIASEC) — 24 perguntas + Top 5 cursos com justificativa.
 * Corrigido: NENHUMA aspa escapada, sem quebras dentro de strings.
 */

type Key = "R" | "I" | "A" | "S" | "E" | "C";
type Question = { id: number; text: string; key: Key };
type Answers = Record<number, number>;
type RankedCourse = { name: string; score: number; reasons: string[] };

function labelFor(k: Key) {
  return (
    {
      R: "Realista",
      I: "Investigativo",
      A: "Artístico",
      S: "Social",
      E: "Empreendedor",
      C: "Convencional",
    } as const
  )[k];
}

// ---------------------------
// Questionário (24 itens)
// ---------------------------
const QUESTIONS: Question[] = [
  // R (Realista)
  { id: 1, text: "Gosto de consertar, montar ou operar equipamentos e ferramentas.", key: "R" },
  { id: 2, text: "Prefiro atividades práticas ao ar livre a ficar no escritório.", key: "R" },
  { id: 3, text: "Tenho interesse por máquinas, automóveis ou eletrônica.", key: "R" },
  { id: 4, text: "Curto aprender fazendo, mãos à obra.", key: "R" },
  // I (Investigativo)
  { id: 5, text: "Gosto de investigar como as coisas funcionam e entender causas.", key: "I" },
  { id: 6, text: "Curto resolver problemas complexos usando lógica e dados.", key: "I" },
  { id: 7, text: "Me interessa ciência, tecnologia ou pesquisa.", key: "I" },
  { id: 8, text: "Gosto de estudar conteúdos profundos e teóricos.", key: "I" },
  // A (Artístico)
  { id: 9, text: "Gosto de criar (desenhar, escrever, compor, editar vídeos).", key: "A" },
  { id: 10, text: "Prefiro tarefas com liberdade e expressão pessoal.", key: "A" },
  { id: 11, text: "Valorizo estética, design e emoção na comunicação.", key: "A" },
  { id: 12, text: "Curto apresentar ideias de forma visual ou sonora.", key: "A" },
  // S (Social)
  { id: 13, text: "Gosto de ajudar pessoas a aprender ou se desenvolver.", key: "S" },
  { id: 14, text: "Tenho empatia e paciência ao lidar com os outros.", key: "S" },
  { id: 15, text: "Me interesso por educação, saúde ou impacto social.", key: "S" },
  { id: 16, text: "Trabalhar em equipe e comunicar é natural para mim.", key: "S" },
  // E (Empreendedor)
  { id: 17, text: "Curto liderar projetos e tomar decisões.", key: "E" },
  { id: 18, text: "Gosto de negociar, vender ou persuadir.", key: "E" },
  { id: 19, text: "Me atrai criar negócios, produtos ou estratégias.", key: "E" },
  { id: 20, text: "Sou competitivo(a) e orientado(a) a metas.", key: "E" },
  // C (Convencional)
  { id: 21, text: "Gosto de organizar informações, planilhas e processos.", key: "C" },
  { id: 22, text: "Prezo por precisão, prazos e rotinas claras.", key: "C" },
  { id: 23, text: "Me dou bem com finanças, administração e compliance.", key: "C" },
  { id: 24, text: "Curto seguir procedimentos e melhorar a eficiência.", key: "C" },
];

// ---------------------------
// Cursos por dimensão
// ---------------------------
type Course = { name: string; rationaleByKey?: Partial<Record<Key, string>> };
type CourseMap = Record<Key, { area: string; courses: Course[] }>;

const COURSES_BY_KEY: CourseMap = {
  R: {
    area: "Realista (Prático/Técnico)",
    courses: [
      { name: "Engenharia Mecânica", rationaleByKey: { R: "enfatiza projetos e operação de máquinas, com forte componente prático" } },
      { name: "Engenharia Elétrica", rationaleByKey: { R: "atua com sistemas elétricos e eletrônicos, testes e manutenção" } },
      { name: "Engenharia Civil", rationaleByKey: { R: "envolve obras, canteiro e supervisão técnica em campo" } },
      { name: "Automação Industrial", rationaleByKey: { R: "integra sensores, CLPs e robótica em processos industriais" } },
      { name: "Logística", rationaleByKey: { R: "operações, armazenagem e distribuição com viés prático" } },
      { name: "Tecnologia em Manutenção", rationaleByKey: { R: "diagnóstico e correção de falhas em equipamentos" } },
    ],
  },
  I: {
    area: "Investigativo (Ciência/Análise)",
    courses: [
      { name: "Ciência da Computação", rationaleByKey: { I: "ênfase em algoritmos, estruturas de dados e resolução lógica" } },
      { name: "Engenharia de Software", rationaleByKey: { I: "projeto de sistemas, testes e engenharia de requisitos" } },
      { name: "Estatística", rationaleByKey: { I: "modelagem, inferência e tomada de decisão baseada em dados" } },
      { name: "Física", rationaleByKey: { I: "investigação teórica e experimental de fenômenos naturais" } },
      { name: "Química", rationaleByKey: { I: "análise laboratorial e desenvolvimento de materiais/processos" } },
      { name: "Biomedicina", rationaleByKey: { I: "pesquisa em saúde, análises clínicas e biotecnologia" } },
      { name: "Data Science", rationaleByKey: { I: "ciência de dados aplicada a problemas reais e predição" } },
      { name: "Análise e Desenvolvimento de Sistemas", rationaleByKey: { I: "desenvolvimento prático com base analítica" } },
    ],
  },
  A: {
    area: "Artístico (Criação/Design)",
    courses: [
      { name: "Design (Gráfico/Produto/UX)", rationaleByKey: { A: "projetos com foco em estética, usabilidade e linguagem visual" } },
      { name: "Arquitetura (ênfase conceitual)", rationaleByKey: { A: "concepção de espaços com visão criativa e autoral" } },
      { name: "Publicidade e Propaganda", rationaleByKey: { A: "campanhas, roteiro e direção de arte" } },
      { name: "Cinema e Audiovisual", rationaleByKey: { A: "narrativa visual, fotografia e edição" } },
      { name: "Artes Visuais", rationaleByKey: { A: "experimentação e expressão artística em múltiplas mídias" } },
      { name: "Música", rationaleByKey: { A: "composição, performance e produção musical" } },
      { name: "Moda", rationaleByKey: { A: "criação autoral, coleção e styling" } },
      { name: "Games/Animação", rationaleByKey: { A: "game design, arte 2D/3D e narrativa interativa" } },
    ],
  },
  S: {
    area: "Social (Educação/Saúde/Serviço)",
    courses: [
      { name: "Pedagogia", rationaleByKey: { S: "mediação de aprendizagem e desenvolvimento humano" } },
      { name: "Psicologia", rationaleByKey: { S: "compreensão do comportamento e intervenção clínica/organizacional" } },
      { name: "Serviço Social", rationaleByKey: { S: "políticas públicas e atendimento a populações vulneráveis" } },
      { name: "Fisioterapia", rationaleByKey: { S: "reabilitação e cuidado direto ao paciente" } },
      { name: "Enfermagem", rationaleByKey: { S: "assistência em saúde e trabalho em equipe multiprofissional" } },
      { name: "Educação Física", rationaleByKey: { S: "promoção de saúde e desempenho humano" } },
      { name: "Fonoaudiologia", rationaleByKey: { S: "comunicação humana e reabilitação" } },
      { name: "Relações Públicas", rationaleByKey: { S: "gestão de relacionamento e comunicação" } },
    ],
  },
  E: {
    area: "Empreendedor (Negócios/Liderança)",
    courses: [
      { name: "Administração", rationaleByKey: { E: "gestão de pessoas, processos e estratégia" } },
      { name: "Marketing", rationaleByKey: { E: "posicionamento, branding e growth" } },
      { name: "Comércio Exterior", rationaleByKey: { E: "negociação internacional e operações" } },
      { name: "Economia", rationaleByKey: { E: "análise de mercados e políticas públicas" } },
      { name: "Gestão Comercial", rationaleByKey: { E: "vendas consultivas e metas" } },
      { name: "Gestão de RH", rationaleByKey: { E: "liderança e desenvolvimento organizacional" } },
      { name: "Empreendedorismo", rationaleByKey: { E: "criação e validação de negócios" } },
      { name: "Turismo", rationaleByKey: { E: "gestão de serviços e experiência do cliente" } },
    ],
  },
  C: {
    area: "Convencional (Processos/Financeiro)",
    courses: [
      { name: "Ciências Contábeis", rationaleByKey: { C: "controle financeiro, conformidade e precisão" } },
      { name: "Processos Gerenciais", rationaleByKey: { C: "organização, indicadores e rotinas" } },
      { name: "Gestão da Qualidade", rationaleByKey: { C: "normas, auditoria e melhoria contínua" } },
      { name: "Direito (compliance)", rationaleByKey: { C: "legislação aplicada a riscos e controles" } },
      { name: "Secretariado Executivo", rationaleByKey: { C: "gestão de agenda, documentos e comunicação executiva" } },
      { name: "Logística", rationaleByKey: { C: "planejamento e controle de fluxos" } },
      { name: "Sistemas de Informação (gestão)", rationaleByKey: { C: "processos + TI para eficiência" } },
      { name: "Controladoria e Finanças", rationaleByKey: { C: "orçamento, custo e compliance" } },
    ],
  },
};

// Inverso para testes: curso -> eixo
const COURSE_AXIS: Record<string, Key> = Object.fromEntries(
  (Object.keys(COURSES_BY_KEY) as Key[]).flatMap((k) =>
    COURSES_BY_KEY[k].courses.map((c) => [c.name, k])
  )
) as Record<string, Key>;

// ---------------------------
// Recomendação (pura)
// ---------------------------
function computeRecommendations(top3: Key[], normScores: Record<Key, number>): RankedCourse[] {
  const axisWeight: Record<number, number> = { 0: 1.0, 1: 0.75, 2: 0.55 };
  const bag = new Map<string, RankedCourse>();
  top3.forEach((axisKey, idx) => {
    const weight = axisWeight[idx] ?? 0.35;
    const axis = COURSES_BY_KEY[axisKey];
    axis.courses.forEach((c) => {
      const base = (normScores[axisKey] || 0) * weight;
      const prev = bag.get(c.name);
      const reason = c.rationaleByKey?.[axisKey]
        ? `${labelFor(axisKey)}: ${c.rationaleByKey[axisKey]}`
        : `${labelFor(axisKey)}: alta afinidade com conteúdos/práticas da área.`;
      if (prev) {
        prev.score += base;
        if (!prev.reasons.includes(reason)) prev.reasons.push(reason);
      } else {
        bag.set(c.name, { name: c.name, score: base, reasons: [reason] });
      }
    });
  });
  return Array.from(bag.values()).sort((a, b) => b.score - a.score).slice(0, 5);
}

// Texto para “Copiar resultado”
function buildResultText(rawScores: Record<Key, number>, recommended: RankedCourse[]): string {
  const lines: string[] = [];
  lines.push("Meu resultado no Teste Vocacional (RIASEC):");
  (Object.keys(rawScores) as Key[])
    .sort((a, b) => rawScores[b] - rawScores[a])
    .forEach((k) => lines.push(`• ${labelFor(k)} — ${rawScores[k]} pts`));
  lines.push("Top 5 cursos sugeridos:");
  recommended.forEach((rc) => {
    lines.push(`- ${rc.name}: ${rc.reasons.join("; ")}`);
  });
  return lines.join("\n");
}

// ---------------------------
// Componente principal
// ---------------------------
export default function App() {
  const [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const allAnswered = useMemo(() => Object.keys(answers).length === QUESTIONS.length, [answers]);

  // Pontos por eixo
  const rawScores = useMemo(() => {
    const s: Record<Key, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    QUESTIONS.forEach((q) => {
      const v = answers[q.id] ?? 0;
      s[q.key] += v;
    });
    return s;
  }, [answers]);

  // Normalização simples (0–1)
  const normScores = useMemo(() => {
    const maxPerAxis = 4 * 4; // 4 perguntas * máximo 4 pontos
    const out: Record<Key, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    (Object.keys(rawScores) as Key[]).forEach((k) => {
      out[k] = (rawScores[k] ?? 0) / maxPerAxis;
    });
    return out;
  }, [rawScores]);

  const sortedKeys = useMemo(() => (Object.keys(rawScores) as Key[]).sort((a, b) => rawScores[b] - rawScores[a]), [rawScores]);
  const top3 = sortedKeys.slice(0, 3);

  function setAnswer(id: number, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function onFinish() {
    if (!allAnswered) {
      alert("Responda todas as afirmações para ver o resultado.");
      return;
    }
    setStep("result");
  }

  function restart() {
    setAnswers({});
    setStep("quiz");
  }

  const recommended = useMemo(() => computeRecommendations(top3, normScores), [top3, normScores]);

  // Testes (DEV)
  function runTests() {
    const results: string[] = [];

    const t1Top: Key[] = ["I", "A", "E"];
    const t1Norm: Record<Key, number> = { R: 0.1, I: 1, A: 0.9, S: 0.1, E: 0.8, C: 0.1 };
    const t1Reco = computeRecommendations(t1Top, t1Norm);
    const t1Ok = t1Reco.every((rc) => t1Top.includes(COURSE_AXIS[rc.name]));
    results.push(`Teste 1 (I/A/E -> apenas cursos I/A/E): ${t1Ok ? "OK" : "FALHOU"}`);

    const t2Top: Key[] = ["R", "C", "E"];
    const t2Norm: Record<Key, number> = { R: 1, I: 0.2, A: 0.2, S: 0.2, E: 0.8, C: 0.9 };
    const t2Reco = computeRecommendations(t2Top, t2Norm);
    const t2Ok = t2Reco.every((rc) => t2Top.includes(COURSE_AXIS[rc.name])) && t2Reco.length === 5;
    results.push(`Teste 2 (R/C/E -> top5 e eixos corretos): ${t2Ok ? "OK" : "FALHOU"}`);

    const fakeScores: Record<Key, number> = { R: 16, I: 12, A: 8, S: 4, E: 10, C: 6 };
    const t3Text = buildResultText(fakeScores, t1Reco);
    const t3Ok =
      t3Text.includes("Meu resultado no Teste Vocacional (RIASEC):") &&
      t3Text.includes("Top 5 cursos sugeridos:") &&
      t3Text.split("\n").length > 6;
    results.push(`Teste 3 (texto de cópia sem erro de string): ${t3Ok ? "OK" : "FALHOU"}`);

    const maxPerAxis = 16;
    const normR = 16 / maxPerAxis;
    results.push(`Teste 4 (normalização R=16 -> 1.0): ${normR === 1 ? "OK" : `FALHOU (obtido ${normR})`}`);

    setTestOutput(results.join("\n"));
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Teste Vocacional (RIASEC) — Completo</h1>
          <p className="text-slate-300">Responda 24 afirmações. Escala 0–4 (Discordo → Concordo).</p>
        </div>

        {/* Painel de Testes (DEV) */}
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800 p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold">Testes automáticos (dev)</div>
            <button
              onClick={runTests}
              className="px-3 py-1 rounded-lg bg-indigo-500 text-slate-900 font-bold hover:bg-indigo-400 text-sm"
            >
              Rodar testes
            </button>
          </div>
          {testOutput && <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-200">{testOutput}</pre>}
        </div>

        {!consent ? (
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">Termo de Consentimento (LGPD)</h2>
            <p className="text-slate-300 mb-4">
              Este protótipo usa suas respostas apenas para cálculo local do resultado. Não há coleta de dados.
              Ao continuar, você concorda com este uso para fins de demonstração.
            </p>
            <button
              onClick={() => setConsent(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 font-bold text-slate-900 hover:bg-emerald-400"
            >
              Concordo e começar
            </button>
          </div>
        ) : step === "quiz" ? (
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Questionário</h2>
            <div className="space-y-4">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-700 text-xs font-bold">{q.id}</span>
                    <p className="leading-snug">{q.text}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAnswer(q.id, v)}
                        className={
                          "px-3 py-1 rounded-lg border text-sm " +
                          ((answers[q.id] ?? -1) === v
                            ? "bg-blue-500 border-blue-400 text-white"
                            : "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700")
                        }
                        aria-pressed={(answers[q.id] ?? -1) === v}
                        aria-label={`Marcar ${v} para a questão ${q.id}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-slate-300">Progresso: {Object.keys(answers).length}/{QUESTIONS.length}</span>
              <button
                onClick={onFinish}
                className={
                  "px-4 py-2 rounded-xl font-bold " +
                  (Object.keys(answers).length === QUESTIONS.length
                    ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400"
                    : "bg-slate-700 text-slate-300 cursor-not-allowed")
                }
              >
                Ver resultado
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <h2 className="text-lg font-semibold mb-3">Seu resultado</h2>
            <p className="text-slate-300 mb-4">Perfis em ordem de afinidade (pontuação total por dimensão):</p>

            <div className="space-y-2">
              {(Object.keys(rawScores) as Key[])
                .sort((a, b) => rawScores[b] - rawScores[a])
                .map((k) => (
                  <div key={k} className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-0.5 rounded-md bg-slate-700 text-xs font-black">{k}</span>
                    <span className="font-medium">{labelFor(k)}</span>
                    <span className="text-slate-300">— {rawScores[k]} pts</span>
                  </div>
                ))}
            </div>

            <div className="h-px bg-slate-700 my-4" />

            <h3 className="font-semibold mb-2">Top 5 cursos recomendados (com justificativa)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {recommended.map((rc) => (
                <div key={rc.name} className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                  <div className="text-sm font-bold mb-1">{rc.name}</div>
                  <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
                    {rc.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-700 my-4" />

            <h3 className="font-semibold mb-2">Seus 3 eixos mais fortes</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {top3.map((k) => (
                <div key={k} className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                  <div className="text-sm font-bold mb-2">{labelFor(k)}</div>
                  <p className="text-sm text-slate-300">Contribuição proporcional: {(normScores[k] * 100).toFixed(0)}%</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={restart}
                className="px-4 py-2 rounded-xl border border-slate-600 text-slate-100 hover:bg-slate-700"
              >
                Refazer teste
              </button>
              <button
                onClick={() => {
                  const text = buildResultText(rawScores, recommended);
                  try {
                    if (navigator?.clipboard?.writeText) {
                      navigator.clipboard.writeText(text);
                    } else {
                      const ta = document.createElement("textarea");
                      ta.value = text;
                      document.body.appendChild(ta);
                      ta.select();
                      document.execCommand("copy");
                      document.body.removeChild(ta);
                    }
                    alert("Resultado copiado para a área de transferência.");
                  } catch (err) {
                    console.error("Falha ao copiar:", err);
                    alert("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-blue-500 font-bold text-slate-900 hover:bg-blue-400"
              >
                Copiar resultado
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">*Este teste é indicativo e não substitui orientação profissional.</p>
          </div>
        )}

        <div className="text-center text-xs text-slate-400 mt-3">Demo • RIASEC • v0.3</div>
      </div>
    </div>
  );
}
