const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
  console.log("Hola, mundo!");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
  console.log("Hola, mundo!");

});

function registro() {
  const ventanaFlotante = document.querySelector('.container');
  ventanaFlotante.classList.remove("right-panel-active") ;
}

