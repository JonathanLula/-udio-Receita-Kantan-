/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {generateSpeech} from './services/geminiService';
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  SpeakerIcon,
} from './components/icons';
import {Page} from './types';
import LoadingIndicator from './components/LoadingIndicator';

// --- Ebook Content ---
const EBOOK_PAGES: Page[] = [
  {
    id: 1,
    title: 'ADEUS CÓLICA EM 10 MINUTOS',
    content: (
      <p className="text-xl text-center">
        Descubra o Método Japonês Kantan para alívio rápido e natural.
      </p>
    ),
    narrationText:
      'ADEUS CÓLICA EM 10 MINUTOS. Descubra o Método Japonês Kantan para alívio rápido e natural.',
  },
  {
    id: 2,
    title: 'O SEGREDO DA FÓRMULA KANTAN',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Este chá anti-cólica rápido é baseado em evidências científicas,
          utilizando ingredientes com poderosas propriedades anti-inflamatórias
          e antiespasmódicas.
        </p>
        <div className="space-y-4 text-left p-4 border-l-4 border-pink-300">
          <p>
            <strong>AÇÃO RÁPIDA:</strong> Alívio em apenas 10 minutos.
          </p>
          <p>
            <strong>NATURAL E SEGURO:</strong> Sem efeitos colaterais de
            medicamentos.
          </p>
          <p>
            <strong>EVIDÊNCIA CIENTÍFICA:</strong> Ingredientes comprovados.
          </p>
        </div>
      </div>
    ),
    narrationText:
      'O SEGREDO DA FÓRMULA KANTAN. Este chá anti-cólica rápido é baseado em evidências científicas, utilizando ingredientes com poderosas propriedades anti-inflamatórias e antiespasmódicas. AÇÃO RÁPIDA: Alívio em apenas 10 minutos. NATURAL E SEGURO: Sem efeitos colaterais de medicamentos. EVIDÊNCIA CIENTÍFICA: Ingredientes comprovados.',
  },
  {
    id: 3,
    title: 'OS 4 PODEROSOS INGREDIENTES',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Cada componente tem uma função crucial para combater a dor e as
          contrações uterinas.
        </p>
        <ul className="space-y-4">
          <li>
            <strong>1. GENGIBRE:</strong> Potente analgésico e
            anti-inflamatório, comparável a alguns AINEs.
          </li>
          <li>
            <strong>2. CANELA:</strong> Ajuda a reduzir a intensidade das
            contrações uterinas e o sangramento.
          </li>
          <li>
            <strong>3. HORTELÃ:</strong> Relaxa os músculos lisos, aliviando o
            espasmo doloroso.
          </li>
          <li>
            <strong>4. FUNCHO:</strong> Atua como modulador hormonal e tem
            efeito antiespasmódico.
          </li>
        </ul>
      </div>
    ),
    narrationText:
      'OS 4 PODEROSOS INGREDIENTES. Cada componente tem uma função crucial para combater a dor e as contrações uterinas. 1. GENGIBRE: Potente analgésico e anti-inflamatório, comparável a alguns AINEs. 2. CANELA: Ajuda a reduzir a intensidade das contrações uterinas e o sangramento. 3. HORTELÃ: Relaxa os músculos lisos, aliviando o espasmo doloroso. 4. FUNCHO: Atua como modulador hormonal e tem efeito antiespasmódico.',
  },
  {
    id: 4,
    title: 'LISTA DE COMPRAS (COMPLETA)',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Tenha estes itens sempre à mão para as crises de cólica!
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Gengibre Fresco:</strong> 1 pedaço de 2cm ou 1/2 colher de
            chá (pó).
          </li>
          <li>
            <strong>Canela:</strong> 1 pau pequeno ou 1/2 colher de chá (pó).
          </li>
          <li>
            <strong>Hortelã:</strong> 2-3 folhas frescas ou 1 colher de chá
            (seca).
          </li>
          <li>
            <strong>Sementes de Funcho:</strong> 1 colher de chá (erva-doce).
          </li>
          <li>
            <strong>Água:</strong> 200ml.
          </li>
        </ul>
      </div>
    ),
    narrationText:
      'LISTA DE COMPRAS COMPLETA. Tenha estes itens sempre à mão para as crises de cólica! Gengibre Fresco: 1 pedaço de 2cm ou 1/2 colher de chá em pó. Canela: 1 pau pequeno ou 1/2 colher de chá em pó. Hortelã: 2 a 3 folhas frescas ou 1 colher de chá seca. Sementes de Funcho: 1 colher de chá. Água: 200ml.',
  },
  {
    id: 5,
    title: 'PREPARAÇÃO: O MÉTODO KANTAN',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          O segredo da eficácia está no tempo de infusão e na ordem dos
          ingredientes.
        </p>
        <ol className="space-y-4">
          <li>
            <strong>ETAPA 1: Fervura</strong>
            <p>Ferva a água com Gengibre e Canela por exatos 5 minutos.</p>
          </li>
          <li>
            <strong>ETAPA 2: Infusão</strong>
            <p>Desligue o fogo. Adicione Hortelã e Funcho.</p>
          </li>
          <li>
            <strong>ETAPA 3: Espera Ativa</strong>
            <p>Tampe e deixe em infusão por 8-10 minutos. Coe e beba morno.</p>
          </li>
        </ol>
      </div>
    ),
    narrationText:
      'PREPARAÇÃO: O MÉTODO KANTAN. O segredo da eficácia está no tempo de infusão e na ordem dos ingredientes. ETAPA 1: Fervura. Ferva a água com Gengibre e Canela por exatos 5 minutos. ETAPA 2: Infusão. Desligue o fogo. Adicione Hortelã e Funcho. ETAPA 3: Espera Ativa. Tampe e deixe em infusão por 8 a 10 minutos. Coe e beba morno.',
  },
  {
    id: 6,
    title: 'POR QUE ESTA COMBINAÇÃO É EXPLOSIVA?',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Os compostos se complementam para um alívio de 360° da cólica.
        </p>
        <ul className="space-y-3">
          <li>
            <strong>Ação Analgésica:</strong> Alívio da dor central.
          </li>
          <li>
            <strong>Antiespasmódico:</strong> Relaxa a musculatura lisa (útero).
          </li>
          <li>
            <strong>Anti-inflamatório:</strong> Combate a causa principal da
            cólica.
          </li>
          <li>
            <strong>Modulação Natural:</strong> Equilíbrio hormonal suave.
          </li>
          <li>
            <strong>EFEITO SINÉRGICO:</strong> Aumento da eficácia combinada.
          </li>
        </ul>
      </div>
    ),
    narrationText:
      'POR QUE ESTA COMBINAÇÃO É EXPLOSIVA? Os compostos se complementam para um alívio de 360 graus da cólica. Ação Analgésica: Alívio da dor central. Antiespasmódico: Relaxa a musculatura lisa do útero. Anti-inflamatório: Combate a causa principal da cólica. Modulação Natural: Equilíbrio hormonal suave. EFEITO SINÉRGICO: Aumento da eficácia combinada.',
  },
  {
    id: 7,
    title: 'DOSAGEM E MAXIMIZAÇÃO',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Use esta dose de forma estratégica para manter a cólica sob controle.
        </p>
        <div className="space-y-4">
          <p>
            <strong>Dose Inicial (1 xícara):</strong> Tome 1 xícara assim que a
            dor começar.
          </p>
          <p>
            <strong>Intervalo (4-6 horas):</strong> Repita a dose a cada 4 a 6
            horas durante a crise.
          </p>
          <p>
            <strong>Limite Diário (3 xícaras):</strong> Não exceda o máximo de 3
            xícaras por dia.
          </p>
        </div>
      </div>
    ),
    narrationText:
      'DOSAGEM E MAXIMIZAÇÃO. Use esta dose de forma estratégica para manter a cólica sob controle. Dose Inicial: 1 xícara. Tome 1 xícara assim que a dor começar. Intervalo: 4 a 6 horas. Repita a dose a cada 4 a 6 horas durante a crise. Limite Diário: 3 xícaras. Não exceda o máximo de 3 xícaras por dia.',
  },
  {
    id: 8,
    title: 'DICA AVANÇADA: O TIMING É TUDO!',
    content: (
      <div className="text-lg">
        <p className="mb-6">
          Não espere a dor ficar insuportável. A eficácia máxima depende da sua
          ação rápida.
        </p>
        <ul className="space-y-3">
          <li>
            <strong>1. Primeiros Sinais:</strong> Sinta o desconforto leve (o
            "presságio").
          </li>
          <li>
            <strong>2. Prepare o Chá Kantan:</strong> Inicie o preparo do chá
            imediatamente.
          </li>
          <li>
            <strong>3. Pico de Absorção:</strong> O chá começa a agir enquanto a
            cólica se intensifica.
          </li>
          <li>
            <strong>4. Alívio Máximo:</strong> Dor controlada e relaxamento
            muscular.
          </li>
        </ul>
      </div>
    ),
    narrationText:
      'DICA AVANÇADA: O TIMING É TUDO! Não espere a dor ficar insuportável. A eficácia máxima depende da sua ação rápida. 1. Primeiros Sinais: Sinta o desconforto leve, o "presságio". 2. Prepare o Chá Kantan: Inicie o preparo do chá imediatamente. 3. Pico de Absorção: O chá começa a agir enquanto a cólica se intensifica. 4. Alívio Máximo: Dor controlada e relaxamento muscular.',
  },
  {
    id: 9,
    title: 'VERSÃO EXPRESSA: SALVA-VIDAS',
    content: (
      <div className="text-lg text-center">
        <p className="mb-4">
          Sem tempo ou ingredientes? Priorize estes dois para 80% do benefício
          da fórmula completa.
        </p>
        <p className="p-4 bg-pink-100 rounded-lg border border-pink-200">
          <strong>Gengibre + Canela:</strong> Use apenas estes dois ingredientes
          para um potente chá <strong>analgésico e anti-inflamatório.</strong>
        </p>
      </div>
    ),
    narrationText:
      'VERSÃO EXPRESSA: SALVA-VIDAS. Sem tempo ou ingredientes? Priorize estes dois para 80% do benefício da fórmula completa. Gengibre mais Canela: Use apenas estes dois ingredientes para um potente chá analgésico e anti-inflamatório.',
  },
  {
    id: 10,
    title: 'SINAL VERMELHO: QUANDO PROCURAR AJUDA',
    content: (
      <div className="text-lg">
        <p className="mb-4">
          O Método Kantan é poderoso, mas a saúde sempre vem em primeiro lugar.
        </p>
        <p className="mb-6">
          Se a cólica não melhorar em 2-3 ciclos usando este método, ou se a dor
          piorar dramaticamente, é crucial procurar uma{' '}
          <strong>avaliação médica</strong> para investigar outras causas.
        </p>
        <p className="text-base text-gray-600">
          Compartilhe esta informação com quem precisa de alívio e salve este
          material para a próxima crise!
        </p>
      </div>
    ),
    narrationText:
      'SINAL VERMELHO: QUANDO PROCURAR AJUDA. O Método Kantan é poderoso, mas a saúde sempre vem em primeiro lugar. Se a cólica não melhorar em 2 ou 3 ciclos usando este método, ou se a dor piorar dramaticamente, é crucial procurar uma avaliação médica para investigar outras causas. Compartilhe esta informação com quem precisa de alívio e salve este material para a próxima crise!',
  },
];

// --- Audio Helper Functions (from guidelines) ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / 1; // numChannels = 1
  const buffer = ctx.createBuffer(1, frameCount, 24000); // sampleRate = 24000

  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

// --- Main App Component ---
const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioBuffers, setAudioBuffers] = useState<(AudioBuffer | null)[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const isNarrationReady = audioBuffers.length === EBOOK_PAGES.length;

  const playAudio = useCallback(
    (index: number) => {
      if (!isNarrationReady || !audioContextRef.current) return;
      if (index >= EBOOK_PAGES.length) {
        // End of book
        setIsPlaying(false);
        setCurrentPageIndex(0);
        return;
      }

      // Stop previous source if it exists
      if (currentSourceRef.current) {
        currentSourceRef.current.onended = null;
        currentSourceRef.current.stop();
      }

      const buffer = audioBuffers[index];
      if (!buffer) return;

      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        playAudio(index + 1);
      };
      source.start();

      currentSourceRef.current = source;
      setCurrentPageIndex(index);
      setIsPlaying(true);
    },
    [audioBuffers, isNarrationReady],
  );

  const handleStartNarration = async () => {
    setIsLoading(true);
    setError(null);

    // Initialize AudioContext on user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)({sampleRate: 24000});
    }

    try {
      const allAudioData = await Promise.all(
        EBOOK_PAGES.map((page) => generateSpeech(page.narrationText)),
      );
      const decodedBuffers = await Promise.all(
        allAudioData.map((base64) =>
          decodeAudioData(decode(base64), audioContextRef.current!),
        ),
      );
      setAudioBuffers(decodedBuffers);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error
          ? e.message
          : 'Falha ao gerar o áudio. Verifique sua chave de API e conexão.',
      );
      setIsLoading(false);
    }
  };

  // Effect to start playback once audio is loaded
  useEffect(() => {
    if (isNarrationReady && isLoading) {
      setIsLoading(false);
      playAudio(0);
    }
  }, [isNarrationReady, isLoading, playAudio]);

  const handlePlayPause = () => {
    if (!audioContextRef.current) return;
    if (isPlaying) {
      audioContextRef.current.suspend();
      setIsPlaying(false);
    } else {
      audioContextRef.current.resume();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentPageIndex + 1, EBOOK_PAGES.length - 1);
    playAudio(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentPageIndex - 1, 0);
    playAudio(prevIndex);
  };

  const currentPage = EBOOK_PAGES[currentPageIndex];

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#3D4A5C] flex flex-col items-center justify-center p-4 font-serif">
      <main className="w-full max-w-2xl mx-auto bg-white/70 shadow-2xl shadow-pink-200 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex-grow p-8 md:p-12 transition-all duration-500">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-pink-800">
            {currentPage.title}
          </h1>
          <div className="w-20 h-1 bg-pink-300 mx-auto mb-8 rounded-full"></div>
          <div className="prose lg:prose-xl max-w-none text-justify">
            {currentPage.content}
          </div>
        </div>

        <footer className="bg-gray-100/50 p-4 border-t border-gray-200">
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}

          {!isNarrationReady && !isLoading && (
            <button
              onClick={handleStartNarration}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors text-xl shadow-lg">
              <SpeakerIcon className="w-6 h-6" />
              Ouvir Narração
            </button>
          )}

          {isLoading && <LoadingIndicator />}

          {isNarrationReady && !isLoading && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePrev}
                  disabled={currentPageIndex === 0}
                  className="p-3 rounded-full hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous Page">
                  <PrevIcon className="w-8 h-8 text-pink-700" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-transform transform hover:scale-110 shadow-lg"
                  aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? (
                    <PauseIcon className="w-10 h-10" />
                  ) : (
                    <PlayIcon className="w-10 h-10" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPageIndex === EBOOK_PAGES.length - 1}
                  className="p-3 rounded-full hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next Page">
                  <NextIcon className="w-8 h-8 text-pink-700" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                {EBOOK_PAGES.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPageIndex
                        ? 'bg-pink-600 scale-125'
                        : 'bg-pink-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </footer>
      </main>
      <p className="text-center text-gray-400 text-sm mt-4">
        Método Kantan | Áudio gerado com a API Gemini
      </p>
    </div>
  );
};

export default App;
