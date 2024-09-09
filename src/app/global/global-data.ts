import { parse } from 'date-fns';
import moment from 'moment';

export const globalData = {
  gbMeses: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  gbData_atual : new Date(),
  gbDataHoje : moment(new Date()).format('DD-MM-YYYY'),
  gbMes_atual : mes_dia_atual(new Date(),'M'),
  gbDia_atual : mes_dia_atual(new Date(),'D'),
  gbAno : new Date().getFullYear(),

  convertToDate(dateString: string): Date {
    return parse(dateString, 'dd-MM-yyyy', new Date());
  },

  convertToDiaMes(dateString: string): String{
    const gbMeses: string[] = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    // Converte a string para um objeto Date
    const dt: Date = new Date(dateString);

    // Obtém o dia do mês e o mês
    const dia: number = dt.getDate(); // Dia do mês
    const mes: number = dt.getMonth(); // Mês (0-11)

    // Retorna o formato desejado
    return `${dia+1}/${gbMeses[mes]}`;
  }
};


function mes_dia_atual(dt: Date,dia_mes :string): string {
  let str = '';
  switch(dia_mes){
    case 'D' :
      str = String(dt.getDate());
      break;
    case 'M' :
      str = String(dt.getMonth()+1);
      break;
  }
  let length = 2;
  let padding = '';
  let padLength = length - str.length;


  // Concatena o caractere de preenchimento até alcançar o comprimento desejado
  while (padding.length < padLength) {
    padding += '0';
  }

  // Adiciona o padding à esquerda da string original
  return padding.slice(0, padLength) + str;
}
