/**
 * Procedural 3D Cupcake Scene using Three.js
 * "Code & Cupcakes — thoughtfully crafted software."
 * 
 * Lightweight, procedural, accessible, and performant.
 */

import * as THREE from 'three';

export class CupcakeScene {
  constructor(options = {}) {
    this.canvas = options.canvas || document.getElementById('cupcake-canvas');
    this.fallbackContainer = options.fallbackContainer || document.getElementById('cupcake-fallback');
    this.flavorButtons = options.flavorButtons || document.querySelectorAll('.flavor-btn');
    this.pauseButton = options.pauseButton || document.getElementById('btn-pause-cupcake');
    this.toggle3dButton = options.toggle3dButton || document.getElementById('btn-toggle-3d');

    // State
    this.isMotionPaused = false;
    this.isSceneActive = true;
    this.isHeroInView = true;
    this.currentFlavorHex = 0x8B5CF6;
    this.animationFrameId = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer Interaction State
    this.targetRotationX = 0.2;
    this.targetRotationY = 0;
    this.currentRotationX = 0.2;
    this.currentRotationY = 0;
    this.isPointerDown = false;
    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.pointerMoveListener = null;

    // Three.js Core Objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cupcakeGroup = null;
    this.frostingMesh = null;
    this.frostingMaterial = null;
    this.clock = new THREE.Clock();

    // Check if reduced motion or mobile view prefers fallback by default
    if (this.prefersReducedMotion) {
      this.isMotionPaused = true;
    }
  }

  /**
   * Check WebGL support
   */
  static isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  /**
   * Initialize Scene
   */
  init() {
    if (!this.canvas || !CupcakeScene.isWebGLAvailable()) {
      this.showFallback();
      return false;
    }

    try {
      this.setupRenderer();
      this.setupScene();
      this.setupCamera();
      this.setupLights();
      this.createCupcakeModel();
      this.setupEventListeners();
      this.setupVisibilityObservers();
      this.startRenderLoop();
      return true;
    } catch (err) {
      console.warn('WebGL Initialization failed, using SVG fallback:', err);
      this.showFallback();
      return false;
    }
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.updateDimensions();
  }

  updateDimensions() {
    if (!this.renderer || !this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const width = rect.width || 380;
    const height = rect.height || 380;

    this.renderer.setSize(width, height, false);
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.cupcakeGroup = new THREE.Group();
    // Center the cupcake vertically in the camera's viewport
    this.cupcakeGroup.position.set(0, -0.2, 0);
    this.scene.add(this.cupcakeGroup);
  }

  setupCamera() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const aspect = (rect.width || 380) / (rect.height || 380);
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(0, 1.4, 5.2);
    this.camera.lookAt(0, 0.4, 0);
  }

  setupLights() {
    // Soft violet ambient fill
    const ambientLight = new THREE.AmbientLight(0x2E1065, 1.6);
    this.scene.add(ambientLight);

    // Cyan key light from top-right
    const keyLight = new THREE.DirectionalLight(0x06B6D4, 2.8);
    keyLight.position.set(3.5, 4.5, 3.5);
    this.scene.add(keyLight);

    // Violet/pink rim light from bottom-left for dramatic edge glow
    const rimLight = new THREE.PointLight(0x8B5CF6, 3.2, 10);
    rimLight.position.set(-3.5, 1.0, -2.5);
    this.scene.add(rimLight);

    // Gentle front-top fill
    const fillLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    fillLight.position.set(0, 3, 4);
    this.scene.add(fillLight);
  }

  /**
   * Procedural Cupcake Geometry Construction
   */
  createCupcakeModel() {
    // 1. Tapered Pleated Wrapper
    const wrapperGeo = new THREE.CylinderGeometry(1.35, 0.95, 1.15, 32, 4, false);
    const pos = wrapperGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      if (r > 0.1) {
        const theta = Math.atan2(z, x);
        const pleatedR = r + Math.sin(theta * 32) * 0.045;
        pos.setX(i, Math.cos(theta) * pleatedR);
        pos.setZ(i, Math.sin(theta) * pleatedR);
      }
    }
    wrapperGeo.computeVertexNormals();

    const wrapperMat = new THREE.MeshStandardMaterial({
      color: 0x1E1B4B, // Deep indigo/violet pleated wrapper
      roughness: 0.55,
      metalness: 0.2
    });
    const wrapperMesh = new THREE.Mesh(wrapperGeo, wrapperMat);
    wrapperMesh.position.y = 0;
    this.cupcakeGroup.add(wrapperMesh);

    // 2. Sponge Cake Base (Chocolate Brown peeking over the wrapper)
    const cakeGeo = new THREE.CylinderGeometry(1.38, 1.32, 0.35, 32);
    const cakeMat = new THREE.MeshStandardMaterial({
      color: 0x3D2314, // Rich chocolate sponge
      roughness: 0.9,
      metalness: 0.05
    });
    const cakeMesh = new THREE.Mesh(cakeGeo, cakeMat);
    cakeMesh.position.y = 0.65;
    this.cupcakeGroup.add(cakeMesh);

    // 3. Procedural Frosting Swirl using tapered TubeGeometry
    const spiralPoints = [];
    const loops = 3.6;
    const steps = 75;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * loops;
      const radius = 1.15 * Math.pow(1 - t * 0.82, 0.85);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.72 + t * 1.35;
      spiralPoints.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(spiralPoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 70, 0.38, 10, false);

    // Taper the tube from base to apex
    const tubePos = tubeGeo.attributes.position;
    const radialSegments = 10;
    const tubularSegments = 70;
    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const scale = Math.max(0.14, (1 - t * 0.82) * (1 - t * 0.18));
      const center = curve.getPointAt(t);
      for (let j = 0; j <= radialSegments; j++) {
        const idx = i * (radialSegments + 1) + j;
        const vx = tubePos.getX(idx);
        const vy = tubePos.getY(idx);
        const vz = tubePos.getZ(idx);
        tubePos.setXYZ(
          idx,
          center.x + (vx - center.x) * scale,
          center.y + (vy - center.y) * scale,
          center.z + (vz - center.z) * scale
        );
      }
    }
    tubeGeo.computeVertexNormals();

    this.frostingMaterial = new THREE.MeshStandardMaterial({
      color: this.currentFlavorHex,
      roughness: 0.32,
      metalness: 0.12
    });
    this.frostingMesh = new THREE.Mesh(tubeGeo, this.frostingMaterial);
    this.cupcakeGroup.add(this.frostingMesh);

    // 4. Glossy Cherry on Top
    const cherryGeo = new THREE.SphereGeometry(0.25, 20, 20);
    const cherryMat = new THREE.MeshStandardMaterial({
      color: 0xDC2626, // Glossy red
      roughness: 0.18,
      metalness: 0.15
    });
    const cherryMesh = new THREE.Mesh(cherryGeo, cherryMat);
    const topPoint = spiralPoints[spiralPoints.length - 1];
    cherryMesh.position.set(topPoint.x, topPoint.y + 0.15, topPoint.z);
    this.cupcakeGroup.add(cherryMesh);

    // Stem on cherry
    const stemCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.22, 0),
      new THREE.Vector3(0.12, 0.42, 0.05),
      new THREE.Vector3(0.08, 0.52, 0.12)
    );
    const stemGeo = new THREE.TubeGeometry(stemCurve, 8, 0.02, 6, false);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803D, roughness: 0.7 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(topPoint.x, topPoint.y + 0.15, topPoint.z);
    this.cupcakeGroup.add(stemMesh);

    // 5. Instanced Sprinkles along the Frosting
    const sprinkleGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.13, 6);
    const sprinkleMat = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 });
    const sprinkleCount = 28;
    const sprinkleMesh = new THREE.InstancedMesh(sprinkleGeo, sprinkleMat, sprinkleCount);

    const sprinkleColors = [
      new THREE.Color(0x06B6D4), // Cyan
      new THREE.Color(0xF472B6), // Strawberry Pink
      new THREE.Color(0xC4B5FD), // Lavender
      new THREE.Color(0xFEF08A), // Vanilla Yellow
      new THREE.Color(0xFFFFFF)  // Pearl White
    ];

    const dummy = new THREE.Object3D();
    for (let i = 0; i < sprinkleCount; i++) {
      const t = 0.08 + (i / sprinkleCount) * 0.82;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      
      // Calculate outward offset from curve center
      const normal = new THREE.Vector3(-tangent.z, 0.1, tangent.x).normalize();
      const radiusOffset = 0.28 * Math.max(0.2, (1 - t * 0.75));
      const posSprinkle = point.clone().add(normal.multiplyScalar(radiusOffset));

      dummy.position.copy(posSprinkle);
      dummy.rotation.set(
        Math.sin(i * 1.7) * Math.PI,
        Math.cos(i * 2.3) * Math.PI,
        (i * 0.4)
      );
      dummy.updateMatrix();

      sprinkleMesh.setMatrixAt(i, dummy.matrix);
      sprinkleMesh.setColorAt(i, sprinkleColors[i % sprinkleColors.length]);
    }
    sprinkleMesh.instanceMatrix.needsUpdate = true;
    if (sprinkleMesh.instanceColor) sprinkleMesh.instanceColor.needsUpdate = true;
    this.cupcakeGroup.add(sprinkleMesh);
  }

  /**
   * Set Frosting Color
   */
  setFrostingFlavor(hexColor, buttonEl = null) {
    this.currentFlavorHex = hexColor;
    if (this.frostingMaterial) {
      this.frostingMaterial.color.setHex(hexColor);
      if (this.isMotionPaused) {
        this.renderOnce();
      }
    }

    if (this.flavorButtons) {
      this.flavorButtons.forEach(btn => {
        const isMatch = btn === buttonEl || btn.dataset.colorHex === hexColor.toString(16);
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });
    }
  }

  /**
   * Toggle Motion Play/Pause
   */
  toggleMotion() {
    this.isMotionPaused = !this.isMotionPaused;
    if (this.pauseButton) {
      this.pauseButton.setAttribute('aria-label', this.isMotionPaused ? 'Resume 3D animation' : 'Pause 3D animation');
      this.pauseButton.setAttribute('title', this.isMotionPaused ? 'Resume 3D animation' : 'Pause 3D animation');
      
      const icon = this.pauseButton.querySelector('svg');
      if (icon) {
        // SVG icon will update via interactions
        this.pauseButton.classList.toggle('paused', this.isMotionPaused);
      }
    }

    if (!this.isMotionPaused && !this.animationFrameId) {
      this.startRenderLoop();
    } else if (this.isMotionPaused) {
      this.renderOnce();
    }
  }

  /**
   * Setup Event Listeners for Interaction
   */
  setupEventListeners() {
    const canvas = this.canvas;

    // Resize Observer on canvas container
    const resizeObserver = new ResizeObserver(() => {
      this.updateDimensions();
      if (this.isMotionPaused) this.renderOnce();
    });
    resizeObserver.observe(canvas.parentElement);

    // Pointer Drag / Tilt
    canvas.addEventListener('pointerdown', (e) => {
      this.isPointerDown = true;
      this.pointerStartX = e.clientX;
      this.pointerStartY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', (e) => {
      if (this.isPointerDown) {
        const deltaX = (e.clientX - this.pointerStartX) * 0.008;
        const deltaY = (e.clientY - this.pointerStartY) * 0.008;
        this.targetRotationY += deltaX;
        this.targetRotationX = Math.max(-0.4, Math.min(0.6, this.targetRotationX + deltaY));
        this.pointerStartX = e.clientX;
        this.pointerStartY = e.clientY;

        if (this.isMotionPaused) {
          this.currentRotationY = this.targetRotationY;
          this.currentRotationX = this.targetRotationX;
          this.renderOnce();
        }
      } else {
        // Subtle tilt on pointer hover
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        this.targetRotationY += nx * 0.003;
        this.targetRotationX = 0.2 + ny * 0.15;

        if (this.isMotionPaused) {
          this.renderOnce();
        }
      }
    });

    const endPointer = (e) => {
      if (this.isPointerDown) {
        this.isPointerDown = false;
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}
      }
    };

    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);

    // Flavor buttons click handler
    if (this.flavorButtons) {
      this.flavorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const hex = parseInt(btn.dataset.flavorHex, 16);
          this.setFrostingFlavor(hex, btn);
        });
      });
    }

    // Pause button click handler
    if (this.pauseButton) {
      this.pauseButton.addEventListener('click', () => {
        this.toggleMotion();
      });
    }

    // Toggle 2D / 3D
    if (this.toggle3dButton) {
      this.toggle3dButton.addEventListener('click', () => {
        this.toggle2d3dView();
      });
    }
  }

  /**
   * Visibility & Screen Observer: pause loop when off-screen or tab hidden
   */
  setupVisibilityObservers() {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        this.isHeroInView = entries[0].isIntersecting;
        if (this.isHeroInView && !this.isMotionPaused && !this.animationFrameId) {
          this.startRenderLoop();
        } else if (!this.isHeroInView && this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      }, { threshold: 0.05 });

      heroObserver.observe(heroSection);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      } else if (!document.hidden && this.isHeroInView && !this.isMotionPaused && !this.animationFrameId) {
        this.startRenderLoop();
      }
    });
  }

  /**
   * Render Loop
   */
  startRenderLoop() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    const tick = () => {
      if (!this.isHeroInView || this.isMotionPaused) {
        this.animationFrameId = null;
        return;
      }

      const elapsed = this.clock.getElapsedTime();

      // Idle Rotation & Floating
      this.targetRotationY += 0.007;

      // Smooth Lerp Rotation
      this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.08;
      this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.08;

      if (this.cupcakeGroup) {
        this.cupcakeGroup.rotation.y = this.currentRotationY;
        this.cupcakeGroup.rotation.x = this.currentRotationX;
        this.cupcakeGroup.position.y = -0.2 + Math.sin(elapsed * 1.6) * 0.07;
      }

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(tick);
    };

    this.animationFrameId = requestAnimationFrame(tick);
  }

  /**
   * Render Once (when paused or updated via static interaction)
   */
  renderOnce() {
    if (!this.renderer || !this.scene || !this.camera) return;
    if (this.cupcakeGroup) {
      this.cupcakeGroup.rotation.y = this.targetRotationY;
      this.cupcakeGroup.rotation.x = this.targetRotationX;
    }
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Toggle between 2D SVG Fallback and 3D Canvas
   */
  toggle2d3dView() {
    const isCurrently3d = this.canvas.style.display !== 'none';
    if (isCurrently3d) {
      this.showFallback();
    } else {
      this.show3d();
    }
  }

  showFallback() {
    if (this.canvas) this.canvas.style.display = 'none';
    if (this.fallbackContainer) this.fallbackContainer.style.display = 'flex';
    if (this.toggle3dButton) {
      this.toggle3dButton.setAttribute('aria-label', 'Switch to 3D cupcake view');
      this.toggle3dButton.setAttribute('title', 'Switch to 3D cupcake view');
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  show3d() {
    if (this.fallbackContainer) this.fallbackContainer.style.display = 'none';
    if (this.canvas) {
      this.canvas.style.display = 'block';
      this.updateDimensions();
      if (!this.isMotionPaused) {
        this.startRenderLoop();
      } else {
        this.renderOnce();
      }
    }
    if (this.toggle3dButton) {
      this.toggle3dButton.setAttribute('aria-label', 'Switch to 2D illustration');
      this.toggle3dButton.setAttribute('title', 'Switch to 2D illustration');
    }
  }

  /**
   * Resource Cleanup
   */
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
