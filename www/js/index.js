let tiempoRestante;
let intervalo = null;

const app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.registerButtonListeners();
        timerDisplay = document.getElementById('timer');
    },

    // Función para registrar todos los listeners de los botones de la aplicación
    registerButtonListeners: function() {
        document.getElementById('agua-btn').addEventListener('click', ()=>this.inicializarTemporizador(180));
        document.getElementById('mollet-btn').addEventListener('click', ()=>this.inicializarTemporizador(300));
        document.getElementById('duro-btn').addEventListener('click', ()=>this.inicializarTemporizador(600));
    },

    // Función que inicializa el temporizador una vez se pulsa uno de las tres opciones disponibles
    inicializarTemporizador: function (segundos) {
        
        if (intervalo !== null) {
            clearInterval(intervalo);
            intervalo = null;
        }
        
        tiempoRestante = segundos;
        this.actualizarDisplay();
        
        intervalo = setInterval(() => {
            if(tiempoRestante <= 0) {
                clearInterval(intervalo);
                intervalo = null;
                this.showConfirmDialog();
                navigator.vibrate([1000, 1000, 1000, 1000, 1000])
            } else {
                tiempoRestante--;
                this.actualizarDisplay();
            }
        }, 1000);
    },

    // Función que va cambiando el tiempo restante en pantalla (la cuenta atrás que verá el usuario)
    actualizarDisplay: function () {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        timerDisplay.textContent = `${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
    },

    // Función para el cuadro de diálogo que aparecerá una vez termine el temporizador (junto con la vibración)
    showConfirmDialog: function() {
        const message = `¡Tu huevo ya está listo!\n` +
                        `Disfruta de la comida🧡`;
        navigator.notification.alert(message, null, 'Se acabó el tiempo', 'OK');
    },

};

app.initialize();