class Forca {
  constructor(palavraSecreta){
    this.palavraSecreta = palavraSecreta;
    this.vidas = 6;
    this.letrasChutadas = [];
    
    //Defininddo tamanho da PALAVRA e inicializando
    this.palavra = new Array(palavraSecreta.length);
    for(let i = 0; i< this.palavra.length; i++){ 
      this.palavra[i] = '_';
    }
  }

// Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
// Avalia o estado do jogo seguindo as regras
  buscarEstado() { 
    if (this.vidas > 0){
      // Condição que PALAVRA seja igual a PALAVRA SECRETA
      if(this.palavra.join('') == this.palavraSecreta)
        return "ganhou";
      else
        return "aguardando chute";
    }else  
      return "perdeu";
  } 

// Analiza se a letra já foi usada
// Se foi retorna FALSE, senão retorna TRUE 
  procurarRepeticao(letra){
    for(let i = 0; i < this.letrasChutadas.length; i++){
      if(this.letrasChutadas[i] == letra) 
        return false;
    }
    return true;
  }

// Verifica se o chute é válido
  verificarChute(letra){
    let posicoes = [];
    var boolean =  true;
    // Condição que o chute tenha somente uma letra
    // E que a letra não tenha sido usada
    if(letra.length == 1 && this.procurarRepeticao(letra)){
      // Adiciona o chute as LETRAS CHUTADAS
      this.letrasChutadas.push(letra);
    
      for(let i = 0; i < this.palavraSecreta.length; i++){
      // Se a LETRA estiver na PALAVRA SECRETA, POSICOES vai 
      // Receber a(s) posição(ões) correspondente(s) i
        if(letra == this.palavraSecreta.charAt(i)){
          posicoes.push(i);
          boolean = false;
        }
      }

      // Condição que a LETRA nao  esteja na PALAVRA SECRETA 
      // E que a VIDA seja maior que 0
      if(boolean  && this.vidas > 0) this.vidas --;
    }
    return posicoes;
  }

// Preenche a palavra com a letra chutada de acordo com
// A(s) posição(ões)
  preencherPalavra(letra){
    const posicoes = this.verificarChute(letra);

    for (let i = 0; i < posicoes.length; i++) {
      this.palavra[posicoes[i]] = this.palavraSecreta[posicoes[i]];
    }
  }
  
// Realiza chute de acoro com as regras do jogo 
  chutar(letra) { 
    this.preencherPalavra(letra);
  }  

// Retorna os dados do jogo
  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.palavra
      // Deve ser um array com as letras que já foram 
      // acertadas ou o valor "_" para as letras não identificadas
    }
   
  }
}
module.exports = Forca;