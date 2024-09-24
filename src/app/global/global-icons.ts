import { isName } from './global-string';

export function searchIco(title: string): string {
  // Normalize o título para facilitar comparações e remover acentos
  const normalizedTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Mapeia condições a ícones
  const iconMap: { [key: string]: string } = {
    'medico': 'fa fa-user-md',
    'exame': 'bx bx-test-tube',
    'ergometrico': 'bx bx-run',
    'sangue': 'bx bx-blood',
    'radiografia': 'bx bx-ray',
    'raio-x': 'bx bx-ray',
    'ultrassonografia': 'bx bx-sound',
    'ultrassom': 'bx bx-sound',
    'consulta': 'fa fa-stethoscope',
    'vacina': 'bx-shield',
    'vacinação': 'bx bx-shield',
    'diagnostico': 'bx bx-notepad',
    'cardiologia': 'fa fa-heartbeat',
    'pediatria': 'fa fa-baby',
    'dermatologia': 'fa fa-skin',
    'ginecologia': 'fa fa-female',
    'ortopedia': 'fa fa-bone',
    'neurologia': 'fa fa-brain',
    'oftalmologia': 'fa fa-eye',
    'otorrinolaringologia': 'fa fa-ear',
    'endocrinologia': 'fa fa-apple-alt',
  };

  // Verifica se é um nome
  if (isName(title)) {
    return iconMap['medico']; // Ícone de médico
  }

  // Verifica cada condição no mapa
  for (const key in iconMap) {
    if (normalizedTitle.includes(key)) {
      return iconMap[key];
    }
  }

  // Retorna vazio se nenhuma condição for atendida
  return '';
}

