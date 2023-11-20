/**EVENT LISTENER
 * 
 * ao digitar alguma coisa na caixa de texto, o texto da caixa1
 * seja alterado para o que foi digitado dentro da caixa letra por letra,enQuanto
 * você digita.
 * 
 * Ao clicar em qualquer lugar fora da caixa, 
 * após digitar alguma coisa na mesma,
 *o texto da caixa 2 seja alterado.
 * 
 * Altere apenas o javascript , criando o event listener adequado e caso precise,
 * visite o link com todos os elementos.
 */

var textoprincipal = document.getElementById('campoPrincipal');
var caixaum = document.getElementById('caixaum');
var caixadois = document.getElementById('caixadois');


textoprincipal.addEventListener('keyup', () => {

    caixaum.innerText += textoprincipal.value


})


textoprincipal.addEventListener('onchange',()=>{


caixadois.innerText = textoprincipal.value;
})

