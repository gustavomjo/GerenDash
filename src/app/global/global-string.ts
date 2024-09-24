import { isValid } from 'date-fns';

export function cleanStringUnicode(input: string): string {
  // Remove caracteres de controle e caracteres Unicode indesejados
  return input.replace(/[\u0000-\u001F\u007F-\u009F\u0100-\u017F\u0180-\u1FFF\u2000-\u206F\u2C00-\u2FEF\u3000-\u303F\u3400-\u4DBF\u4E00-\uAFFF\uB000-\uBFFF\uC000-\uD7FF\uE000-\uF8FF\uF900-\uFAFF\uFB00-\uFBFF\uFC00-\uFFFF\u2000-\u206F]/g, '');
}
export function lpad(str: string, length: number, padChar: string = ' '): string {
  // Calcula quantos caracteres de preenchimento são necessários
  let padding = '';
  let padLength = length - str.length;

  // Concatena o caractere de preenchimento até alcançar o comprimento desejado
  while (padding.length < padLength) {
    padding += padChar;
  }

  // Adiciona o padding à esquerda da string original
  return padding.slice(0, padLength) + str;
}

function levenshtein(a: string, b: string): number {
  const matrix = [];

  // Inicia a primeira linha e coluna da matriz
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Preenche a matriz com os custos das operações
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]; // Não há custo se as letras forem iguais
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substituição
          matrix[i][j - 1] + 1,     // Inserção
          matrix[i - 1][j] + 1      // Remoção
        );
      }
    }
  }

  // Retorna o número de operações (distância de edição)
  return matrix[b.length][a.length];
}

export function similarityPercentage(word1: string, word2: string): number {
   // Função auxiliar para normalizar strings, removendo espaços e caracteres especiais
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

  const normalizedWord1 = normalize(word1);
  const normalizedWord2 = normalize(word2);

  const maxLen = Math.max(normalizedWord1.length, normalizedWord2.length);

  // Se ambas palavras forem iguais, 100% de semelhança
  if (maxLen === 0) return 100;

  const levDistance = levenshtein(normalizedWord1, normalizedWord2);

  // Se a distância for muito grande em relação ao tamanho da palavra, considera-se 0% similaridade
  if (levDistance > maxLen / 2) {
    return 0;
  }

  // Calcula a porcentagem de semelhança
  const similarity = ((maxLen - levDistance) / maxLen) * 100;
  return Math.round(similarity * 100) / 100; // Arredondado para 2 casas decimais
}

const excludedWords = [
  'teste', 'exame', 'procedimento', 'diagnostico', 'consulta', 'ergometrico', 'ultrassom',
  'ressonancia', 'tomografia', 'ecocardiograma', 'raio-x', 'cardiograma', 'eletro', 'hemodinamica',
  'audiometria', 'endoscopia', 'biometria', 'mamografia', 'colonoscopia', 'fisioterapia',
  'cirurgia', 'triagem', 'avaliacao', 'pulmonar', 'ortopedico', 'cardiologico', 'ginecologico',
  'oncologia', 'pediatria', 'neurologia', 'radiologia', 'psicologia', 'laboratorio',
  'patologia', 'hemograma', 'oftalmologia', 'dermatologia', 'pronto-atendimento', 'pronto-socorro'
];


export function isName(str: string): boolean {
  const trimmedStr = str.trim();
  const normalizedStr = trimmedStr.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")  // Remove acentos
    .replace(/[\x00]/g, "");          // Remove caracteres nulos

  const reasonableLength = normalizedStr.length >= 2 && normalizedStr.length <= 100;
  const parts = normalizedStr.split(/\s+/);
  const hasTwoValidParts = parts.length >= 1;
  const validChars = /^[\p{L} '-]+$/u.test(normalizedStr);

  const containsExcludedWords = excludedWords.some(word =>
    new RegExp(`\\b${word}\\b`, 'i').test(normalizedStr)
  );

  if (containsExcludedWords) {
    return false;
  }

  const isValidName = validChars && reasonableLength && hasTwoValidParts;
  if (!isValidName) {
    console.log('Resultado final:', isValidName);
    console.log(normalizedStr)
  }
  return isValidName;
}



















// if (!(validChars && reasonableLength && hasTwoValidParts)) {
//   console.log(trimmedStr)
//   console.log(validChars )
//   console.log(reasonableLength )
//   console.log(hasTwoValidParts)

// }




export function containsWord(sentence : string, word : string) {
  return sentence.toLowerCase().includes(word.toLowerCase());
}

