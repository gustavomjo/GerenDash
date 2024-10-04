import { isName } from './global-string';

export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Refatorando as funções searchIco e searchIcoColor para usar removeAccents
export function searchIco(title: string): string {
  // Normalize o título para facilitar comparações e remover acentos
  const normalizedTitle = removeAccents(title.toLowerCase());

  // Mapeia condições a ícones
  const iconMap: { [key: string]: string } = {
    'acupuntura': 'fa fa-user-md',
    'cardiologia': 'fa fa-heartbeat',
    'cirurgia': 'fa fa-scissors',
    'consulta': 'fa fa-stethoscope',
    'dermatologia': 'fa fa-skin',
    'endocrinologia': 'fa fa-apple-alt',
    'ergometrico': 'bx bx-run',
    'estetica': 'fa fa-spa',
    'exame': 'fa fa-file-medical',
    'fisioterapia': 'fa fa-user-injured',
    'fonoaudiologia': 'fa fa-comments',
    'ginecologia': 'fa fa-female',
    'medicina do trabalho': 'fa fa-briefcase-medical',
    'medico': 'fa fa-user-md',
    'nutricao': 'fa fa-apple-alt',
    'neurologia': 'fa fa-brain',
    'oftalmologia': 'fa fa-eye',
    'ortopedia': 'fa fa-bone',
    'otorrinolaringologia': 'fa fa-ear',
    'pediatria': 'fa fa-baby',
    'psicologia': 'fa fa-head-side-mask',
    'psicoterapia': 'fa fa-head-side-mask',
    'quiropratica': 'fa fa-user-md',
    'representante': 'fa fa-user-tie',
    'radiologia': 'fa fa-x-ray',
    'retorno': 'fa fa-arrow-circle-right',
    'sangue': 'fa fa-tint',
    'traumatologia': 'fa fa-user-injured',
    'ultrassonografia': 'fa fa-signal',
    'ultrassom': 'fa fa-signal',
    'vacina': 'fa fa-shield-alt',
    'vacinacao': 'fa fa-shield-alt',
    'diagnostico': 'fa fa-notes-medical',

    // Atividades relacionadas ao yoga e reiki
    'yoga': 'fa fa-yoga',
    'meditacao': 'fa fa-pray',
    'relaxamento': 'fa fa-spa',
    'alongamento': 'fa fa-arrows-alt-v',
    'respiracao': 'fa fa-lungs',
    'reiki': 'fa fa-hands', // Representação para Reiki
  };

  // Verifica se é um nome
  if (isName(title)) {
    return iconMap['medico'];
  }

  // Verifica cada condição no mapa
  for (const key in iconMap) {
    if (normalizedTitle.includes(removeAccents(key))) {
      return iconMap[key];
    }
  }

  // Retorna vazio se nenhuma condição for atendida
  return '';
}

export function searchIcoColor(title: string): string {
  // Normalize o título para facilitar comparações e remover acentos
  const normalizedTitle = removeAccents(title.toLowerCase());

  // Mapeia condições a ícones
  const icoColor: { [key: string]: string } = {
    'acupuntura': '#4CAF50',
    'cardiologia': '#F44336',
    'cirurgia': '#FF9800',
    'consulta': '#2196F3',
    'dermatologia': '#03A9F4',
    'endocrinologia': '#4CAF50',
    'ergometrico': '#FF9800',
    'estetica': '#E91E63',
    'exame': '#9E9E9E',
    'fisioterapia': '#FF9800',
    'fonoaudiologia': '#03A9F4',
    'ginecologia': '#E91E63',
    'medicina do trabalho': '#3F51B5',
    'medico': '#9E9E9E',
    'nutricao': '#4CAF50',
    'neurologia': '#673AB7',
    'oftalmologia': '#2196F3',
    'ortopedia': '#4CAF50',
    'otorrinolaringologia': '#2196F3',
    'pediatria': '#FFEB3B',
    'psicologia': '#4CAF50',
    'psicoterapia': '#673AB7',
    'quiropratica': '#4CAF50',
    'representante': '#9E9E9E',
    'radiologia': '#673AB7',
    'retorno': '#FFC107',
    'sangue': '#F44336',
    'traumatologia': '#FF9800',
    'ultrassonografia': '#2196F3',
    'ultrassom': '#2196F3',
    'vacina': '#4CAF50',
    'vacinacao': '#4CAF50',
    'diagnostico': '#9E9E9E',

    // Atividades relacionadas ao yoga e reiki
    'yoga': '#673AB7',
    'meditacao': '#4CAF50',
    'relaxamento': '#E91E63',
    'alongamento': '#FF9800',
    'respiracao': '#2196F3',
    'reiki': '#4CAF50', // Cor para Reiki
  };

  // Verifica se é um nome
  if (isName(title)) {
    return icoColor['medico'];
  }

  // Verifica cada condição no mapa
  for (const key in icoColor) {
    if (normalizedTitle.includes(removeAccents(key))) {
      return icoColor[key];
    }
  }

  // Retorna vazio se nenhuma condição for atendida
  return '';
}
