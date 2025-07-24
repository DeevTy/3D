// main.js - Luty

// Animación de entrada al hacer scroll (fade/slide)
function revealOnScroll() {
  const elements = document.querySelectorAll('section, .servicio-card, .portfolio-card, .blog-card, .fundador-card');
  const trigger = window.innerHeight * 0.92;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Carrusel de testimonios
const testimonios = document.querySelectorAll('.testimonio');
let testimonioActual = 0;
function mostrarTestimonio(idx) {
  testimonios.forEach((t, i) => t.classList.toggle('activo', i === idx));
}
function siguienteTestimonio() {
  testimonioActual = (testimonioActual + 1) % testimonios.length;
  mostrarTestimonio(testimonioActual);
}
function anteriorTestimonio() {
  testimonioActual = (testimonioActual - 1 + testimonios.length) % testimonios.length;
  mostrarTestimonio(testimonioActual);
}
const btnPrev = document.querySelector('.carrusel-prev');
const btnNext = document.querySelector('.carrusel-next');
if (btnPrev && btnNext) {
  btnPrev.addEventListener('click', anteriorTestimonio);
  btnNext.addEventListener('click', siguienteTestimonio);
}
mostrarTestimonio(testimonioActual);

// Validación de formulario de contacto
const form = document.querySelector('.form-contacto');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const feedback = form.querySelector('.form-feedback');
    if (!nombre || !email || !mensaje) {
      feedback.textContent = 'Por favor, completa todos los campos.';
      feedback.style.color = '#B26BFF';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      feedback.textContent = 'Email inválido.';
      feedback.style.color = '#B26BFF';
      return;
    }
    feedback.textContent = '¡Mensaje enviado! (Simulado)';
    feedback.style.color = '#39FF14';
    form.reset();
  });
}

// Scroll suave para navegación
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Placeholder para integración 3D
function cargarVisualizador3D() {
  // Aquí se integrará Three.js o similar
  // Detectar si es desktop/tablet antes de cargar
}

// Microinteracciones y animaciones (placeholder)
// Ejemplo: efecto hover en botones, menú, etc. 

// === Noche Estrellada 3D con Three.js ===
function init3DNight() {
  const canvas = document.getElementById('starry-night-3d');
  const overlay = document.querySelector('.night-overlay');
  
  if (!canvas || !THREE) {
    console.error('Canvas o Three.js no encontrado');
    return;
  }

  // Configuración de la escena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);

  // Fondo estrellado
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  const starColors = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#00ffff'), 
    new THREE.Color('#b26bff'),
    new THREE.Color('#39ff14'),
    new THREE.Color('#ff6b9d')
  ];

  for (let i = 0; i < starCount; i++) {
    // Posiciones en una esfera
    const radius = 800 + Math.random() * 400;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    // Colores aleatorios
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Tamaños variables
    sizes[i] = Math.random() * 4 + 1;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Material para estrellas con shader personalizado
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Efecto de parpadeo
        float twinkle = sin(time * 2.0 + position.x * 0.01) * 0.5 + 0.5;
        gl_PointSize = size * (0.5 + twinkle * 0.5) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Luna 3D realista
  const moonGeometry = new THREE.SphereGeometry(25, 64, 64);
  
  // Crear textura de cráteres para la luna
  const moonCanvas = document.createElement('canvas');
  moonCanvas.width = 512;
  moonCanvas.height = 512;
  const moonCtx = moonCanvas.getContext('2d');
  
  // Gradiente base de la luna
  const moonGrad = moonCtx.createRadialGradient(150, 150, 0, 256, 256, 256);
  moonGrad.addColorStop(0, '#ffffff');
  moonGrad.addColorStop(0.7, '#e8e8e8');
  moonGrad.addColorStop(1, '#c0c0c0');
  moonCtx.fillStyle = moonGrad;
  moonCtx.fillRect(0, 0, 512, 512);
  
  // Añadir cráteres
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 40 + 5;
    
    const craterGrad = moonCtx.createRadialGradient(x, y, 0, x, y, size);
    craterGrad.addColorStop(0, '#999999');
    craterGrad.addColorStop(0.7, '#bbbbbb');
    craterGrad.addColorStop(1, '#dddddd');
    
    moonCtx.fillStyle = craterGrad;
    moonCtx.beginPath();
    moonCtx.arc(x, y, size, 0, Math.PI * 2);
    moonCtx.fill();
  }

  const moonTexture = new THREE.CanvasTexture(moonCanvas);
  const moonMaterial = new THREE.MeshPhongMaterial({ 
    map: moonTexture,
    shininess: 30,
    transparent: true,
    opacity: 0.9
  });

  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(60, 30, -100);
  scene.add(moon);

  // Luz de la luna
  const moonLight = new THREE.PointLight(0xffffff, 0.8, 200);
  moonLight.position.copy(moon.position);
  scene.add(moonLight);

  // Luz ambiental suave
  const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
  scene.add(ambientLight);

  // Nebulosa/Aurora en el fondo
  const auroraGeometry = new THREE.PlaneGeometry(400, 200, 32, 16);
  const auroraMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#00ffff') },
      color2: { value: new THREE.Color('#b26bff') },
      color3: { value: new THREE.Color('#39ff14') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos.z += sin(pos.x * 0.02 + time) * 10.0;
        pos.z += cos(pos.y * 0.02 + time * 0.7) * 8.0;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 uv = vUv;
        
        float wave1 = sin(uv.x * 3.0 + time * 0.5) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.0 + time * 0.3) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.5 + time * 0.4) * 0.5 + 0.5;
        
        vec3 color = mix(color1, color2, wave1);
        color = mix(color, color3, wave2 * wave3);
        
        float alpha = (wave1 * wave2 * wave3) * 0.3;
        alpha *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  const aurora = new THREE.Mesh(auroraGeometry, auroraMaterial);
  aurora.position.set(0, 50, -200);
  aurora.rotation.x = -Math.PI / 6;
  scene.add(aurora);

  // Partículas flotantes
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 300;
    particlePositions[i * 3 + 1] = Math.random() * 100 - 50;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    
    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.2,
      y: Math.random() * 0.3 + 0.1,
      z: (Math.random() - 0.5) * 0.2
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 2,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Posición inicial de la cámara
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  // Variables de animación
  let time = 0;
  let mouseX = 0;
  let mouseY = 0;

  // Interacción con el mouse
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  });

  // Función de animación
  function animate() {
    time += 0.016;

    // Actualizar uniforms
    starMaterial.uniforms.time.value = time;
    auroraMaterial.uniforms.time.value = time;

    // Rotación lenta de las estrellas
    stars.rotation.y += 0.0002;

    // Rotación de la luna
    moon.rotation.y += 0.005;

    // Movimiento suave de la aurora
    aurora.rotation.z = Math.sin(time * 0.1) * 0.1;

    // Actualizar partículas
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const velocity = particleVelocities[i];
      
      positions[i * 3] += velocity.x;
      positions[i * 3 + 1] += velocity.y;
      positions[i * 3 + 2] += velocity.z;

      // Reiniciar partículas que salen del área
      if (positions[i * 3 + 1] > 100) {
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = -50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Movimiento suave de cámara basado en mouse
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  // Redimensionar canvas
  function handleResize() {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', handleResize);

  // Ocultar overlay y comenzar animación
  setTimeout(() => {
    overlay.classList.add('hidden');
    animate();
  }, 1500);
}

// === Animación de código CSS ===
function initCodeAnimation() {
  const codeContainer = document.querySelector('.css-code-animation');
  const codeDisplay = document.getElementById('css-code-display');
  const cursor = document.querySelector('.cursor-blink');
  
  if (!codeContainer || !codeDisplay || !cursor) return;
  
  // Código CSS que se mostrará con efectos neón
  const cssCode = `<span class="css-comment">/* Efectos neón vanguardistas */</span>
<span class="css-selector">.btn-neon</span> <span class="css-bracket">{</span>
  <span class="css-property">background</span>: <span class="css-value">#000</span>;
  <span class="css-property">color</span>: <span class="css-value">#00FFFF</span>;
  <span class="css-property">border</span>: <span class="css-value">2px solid #00FFFF</span>;
  <span class="css-property">box-shadow</span>: 
    <span class="css-value">0 0 8px #00FFFF</span>,
    <span class="css-value">0 0 24px #00FFFF33</span>;
  <span class="css-property">transition</span>: <span class="css-value">all 0.3s ease</span>;
<span class="css-bracket">}</span>

<span class="css-selector">.btn-neon:hover</span> <span class="css-bracket">{</span>
  <span class="css-property">background</span>: <span class="css-value">#00FFFF</span>;
  <span class="css-property">color</span>: <span class="css-value">#000</span>;
  <span class="css-property">box-shadow</span>: 
    <span class="css-value">0 0 16px #00FFFF</span>,
    <span class="css-value">0 0 48px #00FFFF66</span>;
  <span class="css-property">transform</span>: <span class="css-value">scale(1.05)</span>;
<span class="css-bracket">}</span>

<span class="css-comment">/* Animación de estrellas */</span>
<span class="css-selector">@keyframes star-twinkle</span> <span class="css-bracket">{</span>
  <span class="css-value">0%</span> <span class="css-bracket">{</span> <span class="css-property">opacity</span>: <span class="css-value">0.7</span>; <span class="css-bracket">}</span>
  <span class="css-value">50%</span> <span class="css-bracket">{</span> <span class="css-property">opacity</span>: <span class="css-value">1</span>; <span class="css-bracket">}</span>
  <span class="css-value">100%</span> <span class="css-bracket">{</span> <span class="css-property">opacity</span>: <span class="css-value">0.7</span>; <span class="css-bracket">}</span>
<span class="css-bracket">}</span>`;

  let currentText = '';
  let charIndex = 0;
  let isAnimating = false;
  
  // Función de typing
  function typeCode() {
    if (charIndex < cssCode.length) {
      // Agregar carácter por carácter, pero respetando las etiquetas HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cssCode.substring(0, charIndex + 1);
      currentText = tempDiv.innerHTML;
      
      codeDisplay.innerHTML = currentText;
      charIndex++;
      
      // Posicionar cursor al final del texto
      const textLength = codeDisplay.textContent.length;
      const lines = codeDisplay.textContent.split('\n');
      const lastLine = lines[lines.length - 1];
      
      // Calcular posición del cursor
      const lineHeight = 1.6; // línea definida en CSS
      const charWidth = 0.6; // aproximado para monospace
      
      cursor.style.top = `${20 + (lines.length - 1) * lineHeight * 16}px`;
      cursor.style.left = `${20 + lastLine.length * charWidth * 14}px`;
      
      // Velocidad variable para hacer más realista
      let speed = Math.random() * 50 + 30;
      
      // Pausa más larga en ciertos caracteres
      if (cssCode[charIndex - 1] === '\n') speed += 200;
      if (cssCode[charIndex - 1] === ';') speed += 100;
      if (cssCode[charIndex - 1] === '{' || cssCode[charIndex - 1] === '}') speed += 150;
      
      setTimeout(typeCode, speed);
    } else {
      // Animación terminada
      isAnimating = false;
      cursor.style.animation = 'blink 1s infinite';
    }
  }
  
  // Función para iniciar la animación
  function startCodeAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    charIndex = 0;
    currentText = '';
    codeDisplay.innerHTML = '';
    
    // Agregar clase de animación al contenedor
    codeContainer.classList.add('animate');
    
    // Comenzar typing después de un pequeño delay
    setTimeout(() => {
      typeCode();
    }, 500);
  }
  
  // Detectar cuando la sección esté visible
  function checkCodeAnimationVisibility() {
    const rect = codeContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    
    if (isVisible && !isAnimating && !codeContainer.classList.contains('animate')) {
      startCodeAnimation();
    }
  }
  
  // Agregar listener de scroll
  window.addEventListener('scroll', checkCodeAnimationVisibility);
  window.addEventListener('DOMContentLoaded', checkCodeAnimationVisibility);
  
  // Reiniciar animación cuando se hace click en la ventana de código
  codeContainer.addEventListener('click', () => {
    if (!isAnimating) {
      codeContainer.classList.remove('animate');
      setTimeout(() => {
        startCodeAnimation();
      }, 100);
    }
  });
}

// Inicializar cuando se cargue la página
window.addEventListener('DOMContentLoaded', init3DNight);
window.addEventListener('DOMContentLoaded', initCodeAnimation); 