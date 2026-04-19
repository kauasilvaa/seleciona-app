import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [candidatos, setCandidatos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("Todos");

  const [form, setForm] = useState({
    nome: "",
    area: "",
    nivel: "Iniciante",
    resumo: "",
    habilidades: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    const data = localStorage.getItem("candidatos");
    if (data) setCandidatos(JSON.parse(data));
  }, []);

  const gerarAvatar = (id) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

  const salvar = () => {
    if (!form.area || !form.habilidades) {
      alert("Preencha área e habilidades!");

      const calcularScore = (c) => {
  let score = 0;

  if (c.habilidades.length > 20) score += 30;
  if (c.resumo.length > 30) score += 20;
  if (c.nivel === "Avançado") score += 30;
  if (c.nivel === "Intermediário") score += 20;

  return score;
};

      return;
    }

    const novo = {
      ...form,
      id: Date.now(),
      contratado: false
    };

    const lista = [...candidatos, novo];
    setCandidatos(lista);
    localStorage.setItem("candidatos", JSON.stringify(lista));

    setForm({
      nome: "",
      area: "",
      nivel: "Iniciante",
      resumo: "",
      habilidades: "",
      email: "",
      telefone: ""
    });

    alert("Perfil criado!");
    setPage("home"); // NÃO vai mais pra empresa
  };

  const contratar = () => {
    const atualizados = candidatos.map((c) =>
      c.id === selecionado.id ? { ...c, contratado: true } : c
    );

    setCandidatos(atualizados);
    localStorage.setItem("candidatos", JSON.stringify(atualizados));
    setSelecionado({ ...selecionado, contratado: true });

    alert("🎉 CONTRATADO COM SUCESSO!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-green-400 font-bold text-xl">Seleciona+</h1>

        <div className="flex gap-8 text-gray-400">
          <span>Sobre</span>
          <span>Como funciona</span>
          <span>Contato</span>
        </div>

        <button className="border px-4 py-2 rounded-lg">Entrar</button>
      </div>

      {/* HOME */}
      {page === "home" && (
        <>
          <div className="px-20 py-20 flex justify-between items-center">

            <div>
              <h1 className="text-5xl font-bold leading-tight">
                Primeiro a <span className="text-green-400">habilidade</span>,
                <br /> depois a pessoa.
              </h1>

              <p className="text-gray-400 mt-4">
                Plataforma de contratação anônima baseada em mérito.
              </p>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setPage("candidato")}
                  className="bg-green-500 px-6 py-3 rounded-xl text-black font-semibold"
                >
                  Sou Candidato
                </button>

                <button
                  onClick={() => setPage("empresa")}
                  className="bg-slate-700 px-6 py-3 rounded-xl"
                >
                  Sou Empresa
                </button>
              </div>
            </div>

            <div className="w-80 h-80 rounded-full border border-gray-700 flex items-center justify-center">
              <div className="w-20 h-20 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* PARTE DE BAIXO (VOLTOU 👍) */}
          <div className="px-20 pb-20">

            <h2 className="text-center text-xl mb-10 text-gray-300">
              Por que usar o Seleciona+?
            </h2>

            <div className="grid grid-cols-3 gap-6">

              <div className="bg-slate-800 p-6 rounded-xl text-center">
                <h3 className="text-green-400 font-bold">Processo Justo</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Avaliação sem preconceitos
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-center">
                <h3 className="text-purple-400 font-bold">Foco</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Importa o que você sabe fazer
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-center">
                <h3 className="text-green-400 font-bold">Privacidade</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Dados só após contratação
                </p>
              </div>

            </div>

            <div className="mt-10 bg-slate-800 p-6 rounded-xl flex justify-around text-center">

              <div>
                <h3 className="text-green-400 text-2xl font-bold">
                  {candidatos.length}+
                </h3>
                <p className="text-gray-400 text-sm">Candidatos</p>
              </div>

              <div>
                <h3 className="text-green-400 text-2xl font-bold">85+</h3>
                <p className="text-gray-400 text-sm">Empresas</p>
              </div>

              <div>
                <h3 className="text-green-400 text-2xl font-bold">540+</h3>
                <p className="text-gray-400 text-sm">Contratações</p>
              </div>

            </div>
          </div>
        </>
      )}

      {/* CANDIDATO */}
      {page === "candidato" && (
        <div className="flex justify-center mt-10">

          <div className="bg-slate-800 p-8 rounded-2xl w-[600px]">

            <button onClick={() => setPage("home")} className="text-green-400 mb-4">
              ← Voltar
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Criar Perfil
            </h2>

            <div className="space-y-4">

              <input placeholder="Nome (oculto)"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />

              <input placeholder="Área"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />

              <textarea placeholder="Resumo"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.resumo}
                onChange={(e) => setForm({ ...form, resumo: e.target.value })}
              />

              <textarea placeholder="Habilidades"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.habilidades}
                onChange={(e) => setForm({ ...form, habilidades: e.target.value })}
              />

              <input placeholder="Email (oculto)"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input placeholder="Telefone (oculto)"
                className="w-full p-3 bg-slate-900 rounded-lg"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              />

              <button
                onClick={salvar}
                className="w-full bg-green-500 py-3 rounded-lg text-black font-semibold"
              >
                Salvar Perfil
              </button>

            </div>
          </div>
        </div>
      )}

      {/* EMPRESA */}
      {page === "empresa" && (
  <div className="px-16 mt-10">

    <button onClick={() => setPage("home")} className="text-green-400 mb-6">
      ← Voltar
    </button>

    <h2 className="text-2xl font-bold mb-8">Candidatos</h2>

    {/* GRID DE PERFIS */}
    <div className="grid grid-cols-3 gap-6">

      {candidatos.map((c) => (
        <div
          key={c.id}
          className="bg-slate-800 p-6 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg border border-slate-700"
        >

          {/* TOPO */}
          <div className="flex items-center gap-4 mb-4">

            <img
              src={gerarAvatar(c.id)}
              className="w-16 h-16 rounded-full border-2 border-green-500"
            />

            <div>
              <h3 className="font-bold text-lg">
                CAND-{c.id}
              </h3>

              <p className="text-gray-400 text-sm">
                {c.area}
              </p>
            </div>
          </div>

          {/* INFO */}
          <div className="text-sm text-gray-400 space-y-1 mb-4">
            <p>⭐ {c.nivel}</p>
            <p className="truncate">🧠 {c.habilidades}</p>
          </div>

          {/* STATUS */}
          <div className="mb-4">
            {c.contratado ? (
              <span className="text-green-400 text-xs font-bold">
                ✔ Contratado
              </span>
            ) : (
              <span className="text-yellow-400 text-xs font-bold">
                Disponível
              </span>
            )}
          </div>

          {/* BOTÃO */}
          <button
            onClick={() => {
              setSelecionado(c);
              setPage("perfil");
            }}
            className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-black font-semibold transition"
          >
            Ver Perfil
          </button>

        </div>
      ))}

    </div>
  </div>
)}

      {/* PERFIL */}
      {page === "perfil" && selecionado && (
        <div className="px-16 mt-10">

          <button onClick={() => setPage("empresa")} className="text-green-400 mb-6">
            ← Voltar
          </button>

          <div className="bg-slate-800 p-8 rounded-2xl flex gap-8">

            <img
              src={gerarAvatar(selecionado.id)}
              className="w-24 h-24 rounded-full border-2 border-green-500"
            />

            <div className="w-full">

              <h2 className="text-2xl font-bold">
                CAND-{selecionado.id}
              </h2>

              <p className="mt-4">{selecionado.resumo}</p>

              <p className="mt-4">
                <strong>Habilidades:</strong> {selecionado.habilidades}
              </p>

              <div className="mt-6 p-4 bg-slate-900 rounded-lg">

                {!selecionado.contratado ? (
                  <p className="text-gray-400">
                    🔒 Dados ocultos
                  </p>
                ) : (
                  <>
                    <p>👤 {selecionado.nome}</p>
                    <p>📧 {selecionado.email}</p>
                    <p>📱 {selecionado.telefone}</p>
                  </>
                )}

              </div>

              {!selecionado.contratado && (
                <button
                  onClick={contratar}
                  className="mt-6 bg-green-500 px-6 py-3 rounded-xl text-black font-bold"
                >
                  Contratar
                </button>
              )}

              {selecionado.contratado && (
                <p className="mt-6 text-green-400 font-bold">
                  ✅ CONTRATADO
                </p>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}