function showComponent(componentId) {
    // Oculta todos los componentes
    const components = document.querySelectorAll('.component');
    components.forEach(component => {
        component.style.display = 'none';
    });

    // Muestra el componente correspondiente al botón clicado
    const targetComponent = document.getElementById(componentId + 'Component');
    if (targetComponent) {
        targetComponent.style.display = 'block';
    }

    // Cambia la clase activa en los botones
    const buttons = document.querySelectorAll('.nav-link');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.getElementById(componentId + 'Button');
    if (activeButton) {
        activeButton.classList.add('active');
    }
}