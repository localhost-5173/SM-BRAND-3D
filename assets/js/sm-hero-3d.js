/* ============================================================
   SM BRAND — Three.js Hero 3D Industrial Strapping Machine
   Procedural engineering 3D model of SM-801 Auto Arch Machine
   Features:
   - High-precision industrial cabinet with muted industrial orange accents (#D96B32)
   - Brushed stainless steel table bed with individual cylindrical rollers
   - Structural overhead arch with precision track channel
   - Side-mounted strap dispenser reel with polycarbonate flanges & orange PP coil
   - Operator console with backlit digital readout & emergency stop button
   - Corrugated carton box strapped on the table bed
   - Balanced studio lighting: key white light + soft fill + restrained warm rim
   - Smooth mouse parallax and gentle idle breathing
   - WebGL detection with graceful static fallback
   ============================================================ */
(function () {
  'use strict';

  function hasWebGL() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  function initHero3D() {
    var container = document.getElementById('hero3dContainer');
    if (!container) return;

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!window.THREE || !hasWebGL() || reduce) {
      var wrapper = document.getElementById('hero3dWrapper');
      if (wrapper) wrapper.classList.add('fallback-mode');
      return;
    }

    var width = container.clientWidth || 540;
    var height = container.clientHeight || 540;

    // --- Scene, Camera, Renderer ---
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(3.4, 2.5, 4.3);
    camera.lookAt(0, 0.45, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Materials Palette (Industrial & Balanced) ---
    var darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      roughness: 0.42,
      metalness: 0.72
    });

    var cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x202328,
      roughness: 0.52,
      metalness: 0.55
    });

    var orangeAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd96b32,
      roughness: 0.35,
      metalness: 0.25,
      emissive: 0xd96b32,
      emissiveIntensity: 0.05
    });

    var stainlessMat = new THREE.MeshStandardMaterial({
      color: 0xd2d6dc,
      roughness: 0.22,
      metalness: 0.88
    });

    var chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe8ecf0,
      roughness: 0.12,
      metalness: 0.95
    });

    var blackRubberMat = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.82,
      metalness: 0.05
    });

    var strapOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xd96b32,
      roughness: 0.38,
      metalness: 0.15,
      emissive: 0xd96b32,
      emissiveIntensity: 0.06
    });

    var reelFlangeMat = new THREE.MeshPhysicalMaterial({
      color: 0xccd4dd,
      transparent: true,
      opacity: 0.5,
      roughness: 0.2,
      transmission: 0.35,
      metalness: 0.1
    });

    var screenMat = new THREE.MeshStandardMaterial({
      color: 0x091c1d,
      emissive: 0x0ea5a0,
      emissiveIntensity: 0.6,
      roughness: 0.25
    });

    var greenBtnMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      emissive: 0x22c55e,
      emissiveIntensity: 0.45,
      roughness: 0.35
    });

    var redBtnMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      emissive: 0xef4444,
      emissiveIntensity: 0.35,
      roughness: 0.35
    });

    var cartonMat = new THREE.MeshStandardMaterial({
      color: 0xc49d68,
      roughness: 0.75,
      metalness: 0.02
    });

    // --- Machine Root Group ---
    var machine = new THREE.Group();
    scene.add(machine);
    machine.position.y = -0.3;

    // 1. Lower Cabinet Body
    var cabinetWidth = 1.6;
    var cabinetHeight = 1.05;
    var cabinetDepth = 1.1;

    var cabinetGeo = new THREE.BoxGeometry(cabinetWidth, cabinetHeight, cabinetDepth);
    var cabinetMesh = new THREE.Mesh(cabinetGeo, cabinetMat);
    cabinetMesh.position.y = cabinetHeight / 2;
    cabinetMesh.castShadow = true;
    cabinetMesh.receiveShadow = true;
    machine.add(cabinetMesh);

    // Front maintenance access door & handle
    var doorFaceGeo = new THREE.BoxGeometry(cabinetWidth * 0.75, cabinetHeight * 0.8, 0.02);
    var doorFaceMesh = new THREE.Mesh(doorFaceGeo, darkSteelMat);
    doorFaceMesh.position.set(0, cabinetHeight * 0.48, cabinetDepth / 2 + 0.012);
    doorFaceMesh.castShadow = true;
    machine.add(doorFaceMesh);

    var doorHandleGeo = new THREE.BoxGeometry(0.04, 0.22, 0.04);
    var doorHandle = new THREE.Mesh(doorHandleGeo, chromeMat);
    doorHandle.position.set(cabinetWidth * 0.28, cabinetHeight * 0.55, cabinetDepth / 2 + 0.035);
    machine.add(doorHandle);

    // Ventilation louvers on cabinet left
    for (var l = 0; l < 4; l++) {
      var louverGeo = new THREE.BoxGeometry(0.015, 0.02, 0.45);
      var louver = new THREE.Mesh(louverGeo, darkSteelMat);
      louver.position.set(-cabinetWidth / 2 - 0.008, 0.35 + l * 0.08, 0);
      machine.add(louver);
    }

    // Industrial Orange Trim Line
    var trimGeo = new THREE.BoxGeometry(cabinetWidth + 0.015, 0.05, cabinetDepth + 0.015);
    var trimMesh = new THREE.Mesh(trimGeo, orangeAccentMat);
    trimMesh.position.y = cabinetHeight * 0.88;
    machine.add(trimMesh);

    // 2. Heavy-Duty Corner Leveling Casters
    var legPositions = [
      [-cabinetWidth / 2 + 0.08, -cabinetDepth / 2 + 0.08],
      [cabinetWidth / 2 - 0.08, -cabinetDepth / 2 + 0.08],
      [-cabinetWidth / 2 + 0.08, cabinetDepth / 2 - 0.08],
      [cabinetWidth / 2 - 0.08, cabinetDepth / 2 - 0.08]
    ];

    legPositions.forEach(function (pos) {
      var legStemGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16);
      var legStem = new THREE.Mesh(legStemGeo, chromeMat);
      legStem.position.set(pos[0], -0.07, pos[1]);
      legStem.castShadow = true;
      machine.add(legStem);

      var wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);
      wheelGeo.rotateZ(Math.PI / 2);
      var wheel = new THREE.Mesh(wheelGeo, blackRubberMat);
      wheel.position.set(pos[0], -0.15, pos[1]);
      wheel.castShadow = true;
      machine.add(wheel);
    });

    // 3. Stainless Steel Work Tabletop
    var tableWidth = 1.76;
    var tableDepth = 1.24;
    var tableThick = 0.07;
    var tableGeo = new THREE.BoxGeometry(tableWidth, tableThick, tableDepth);
    var tableMesh = new THREE.Mesh(tableGeo, stainlessMat);
    tableMesh.position.y = cabinetHeight + tableThick / 2;
    tableMesh.castShadow = true;
    tableMesh.receiveShadow = true;
    machine.add(tableMesh);

    // Stainless Steel Rollers
    var rollerGroup = new THREE.Group();
    var numRollers = 10;
    var rollerSpacing = (tableDepth - 0.22) / (numRollers - 1);
    var rollerRadius = 0.022;
    var rollerLength = tableWidth - 0.22;

    for (var r = 0; r < numRollers; r++) {
      var rollerGeo = new THREE.CylinderGeometry(rollerRadius, rollerRadius, rollerLength, 16);
      rollerGeo.rotateZ(Math.PI / 2);
      var rollerMesh = new THREE.Mesh(rollerGeo, chromeMat);
      var zPos = -tableDepth / 2 + 0.11 + r * rollerSpacing;
      if (Math.abs(zPos) > 0.08) {
        rollerMesh.position.set(0, cabinetHeight + tableThick + rollerRadius * 0.7, zPos);
        rollerMesh.castShadow = true;
        rollerGroup.add(rollerMesh);
      }
    }
    machine.add(rollerGroup);

    // Strapping Slot on Table
    var slitGeo = new THREE.BoxGeometry(tableWidth - 0.15, 0.012, 0.06);
    var slitMesh = new THREE.Mesh(slitGeo, darkSteelMat);
    slitMesh.position.set(0, cabinetHeight + tableThick + 0.006, 0);
    machine.add(slitMesh);

    // 4. Overhead Automatic Strapping Arch
    var archGroup = new THREE.Group();
    var archHeight = 1.15;
    var archThickness = 0.08;
    var archBeamDepth = 0.08;
    var archSpan = 1.25;

    var leftColGeo = new THREE.BoxGeometry(archThickness, archHeight, archBeamDepth);
    var leftCol = new THREE.Mesh(leftColGeo, darkSteelMat);
    leftCol.position.set(-archSpan / 2, cabinetHeight + archHeight / 2, 0);
    leftCol.castShadow = true;
    archGroup.add(leftCol);

    var rightColGeo = new THREE.BoxGeometry(archThickness, archHeight, archBeamDepth);
    var rightCol = new THREE.Mesh(rightColGeo, darkSteelMat);
    rightCol.position.set(archSpan / 2, cabinetHeight + archHeight / 2, 0);
    rightCol.castShadow = true;
    archGroup.add(rightCol);

    var topBeamGeo = new THREE.BoxGeometry(archSpan + archThickness, archThickness, archBeamDepth);
    var topBeam = new THREE.Mesh(topBeamGeo, darkSteelMat);
    topBeam.position.set(0, cabinetHeight + archHeight - archThickness / 2, 0);
    topBeam.castShadow = true;
    archGroup.add(topBeam);

    // Interior Arch Guide Track
    var innerTrackGeo = new THREE.BoxGeometry(archSpan - 0.03, 0.02, 0.02);
    var innerTrack = new THREE.Mesh(innerTrackGeo, orangeAccentMat);
    innerTrack.position.set(0, cabinetHeight + archHeight - archThickness - 0.01, 0);
    archGroup.add(innerTrack);

    var innerTrackLeftGeo = new THREE.BoxGeometry(0.02, archHeight - archThickness - 0.05, 0.02);
    var innerTrackLeft = new THREE.Mesh(innerTrackLeftGeo, orangeAccentMat);
    innerTrackLeft.position.set(-archSpan / 2 + archThickness / 2 + 0.01, cabinetHeight + (archHeight - archThickness) / 2, 0);
    archGroup.add(innerTrackLeft);

    var innerTrackRight = innerTrackLeft.clone();
    innerTrackRight.position.x = archSpan / 2 - archThickness / 2 - 0.01;
    archGroup.add(innerTrackRight);

    // Top Beacon Tower Light
    var beaconBaseGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.05, 16);
    var beaconBase = new THREE.Mesh(beaconBaseGeo, chromeMat);
    beaconBase.position.set(archSpan / 2, cabinetHeight + archHeight + 0.025, 0);
    archGroup.add(beaconBase);

    var beaconRunGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.06, 16);
    var beaconRunMat = new THREE.MeshStandardMaterial({
      color: 0x1f9d55,
      emissive: 0x1f9d55,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    var beaconRun = new THREE.Mesh(beaconRunGeo, beaconRunMat);
    beaconRun.position.set(archSpan / 2, cabinetHeight + archHeight + 0.08, 0);
    archGroup.add(beaconRun);

    machine.add(archGroup);

    // 5. Side-Mounted Strap Dispenser Reel
    var reelGroup = new THREE.Group();
    var reelRadius = 0.38;
    var reelWidth = 0.16;
    var reelCenter = new THREE.Vector3(-cabinetWidth / 2 - 0.16, cabinetHeight * 0.46, 0);

    var armGeo = new THREE.BoxGeometry(0.18, 0.08, 0.08);
    var armMesh = new THREE.Mesh(armGeo, darkSteelMat);
    armMesh.position.set(reelCenter.x + 0.08, reelCenter.y, reelCenter.z);
    armMesh.castShadow = true;
    reelGroup.add(armMesh);

    var spindleGeo = new THREE.CylinderGeometry(0.045, 0.045, reelWidth + 0.08, 18);
    spindleGeo.rotateZ(Math.PI / 2);
    var spindle = new THREE.Mesh(spindleGeo, chromeMat);
    spindle.position.copy(reelCenter);
    reelGroup.add(spindle);

    var flangeGeo = new THREE.CylinderGeometry(reelRadius, reelRadius, 0.012, 28);
    flangeGeo.rotateZ(Math.PI / 2);
    var flangeOuter = new THREE.Mesh(flangeGeo, reelFlangeMat);
    flangeOuter.position.set(reelCenter.x - reelWidth / 2, reelCenter.y, reelCenter.z);
    reelGroup.add(flangeOuter);

    var flangeInner = new THREE.Mesh(flangeGeo, reelFlangeMat);
    flangeInner.position.set(reelCenter.x + reelWidth / 2, reelCenter.y, reelCenter.z);
    reelGroup.add(flangeInner);

    var coilGeo = new THREE.CylinderGeometry(0.34, 0.34, reelWidth * 0.9, 28);
    coilGeo.rotateZ(Math.PI / 2);
    var coilMesh = new THREE.Mesh(coilGeo, strapOrangeMat);
    coilMesh.position.copy(reelCenter);
    coilMesh.castShadow = true;
    reelGroup.add(coilMesh);

    machine.add(reelGroup);

    // 6. Operator Control Console
    var consoleGroup = new THREE.Group();
    var consoleWidth = 0.52;
    var consoleHeight = 0.28;
    var consoleDepth = 0.14;

    var consoleGeo = new THREE.BoxGeometry(consoleWidth, consoleHeight, consoleDepth);
    var consoleMesh = new THREE.Mesh(consoleGeo, darkSteelMat);
    consoleMesh.position.set(cabinetWidth * 0.22, cabinetHeight + 0.02, cabinetDepth / 2 + 0.06);
    consoleMesh.rotation.x = -Math.PI / 7;
    consoleMesh.castShadow = true;
    consoleGroup.add(consoleMesh);

    var lcdGeo = new THREE.BoxGeometry(0.24, 0.1, 0.015);
    var lcdMesh = new THREE.Mesh(lcdGeo, screenMat);
    lcdMesh.position.set(-0.1, 0.04, consoleDepth / 2 + 0.008);
    consoleMesh.add(lcdMesh);

    var startBtnGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.025, 16);
    startBtnGeo.rotateX(Math.PI / 2);
    var startBtn = new THREE.Mesh(startBtnGeo, greenBtnMat);
    startBtn.position.set(0.12, 0.04, consoleDepth / 2 + 0.012);
    consoleMesh.add(startBtn);

    var eStopCapGeo = new THREE.CylinderGeometry(0.042, 0.03, 0.03, 16);
    eStopCapGeo.rotateX(Math.PI / 2);
    var eStopCap = new THREE.Mesh(eStopCapGeo, redBtnMat);
    eStopCap.position.set(0.18, -0.05, consoleDepth / 2 + 0.028);
    consoleMesh.add(eStopCap);

    machine.add(consoleGroup);

    // 7. Packaged Carton Box on Table Bed
    var boxGroup = new THREE.Group();
    var boxWidth = 0.58;
    var boxHeight = 0.46;
    var boxDepth = 0.46;

    var boxGeo = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    var boxMesh = new THREE.Mesh(boxGeo, cartonMat);
    boxMesh.position.set(0, cabinetHeight + tableThick + boxHeight / 2 + 0.01, 0);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    boxGroup.add(boxMesh);

    // Strap band wrapped around the box
    var strapBandGeo = new THREE.BoxGeometry(0.03, boxHeight + 0.012, boxDepth + 0.012);
    var strapBand = new THREE.Mesh(strapBandGeo, strapOrangeMat);
    strapBand.position.copy(boxMesh.position);
    boxGroup.add(strapBand);

    machine.add(boxGroup);

    // 8. Soft Ground Shadow Plane
    var shadowGeo = new THREE.PlaneGeometry(3.6, 2.8);
    var shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    var sctx = shadowCanvas.getContext('2d');
    var sgrad = sctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    sgrad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    sgrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    sgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 256, 256);

    var shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    var shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    var floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = -0.22;
    machine.add(floorShadow);

    // --- Balanced Studio Lighting ---
    // 1. Key Directional Light (Neutral Warm White)
    var keyLight = new THREE.DirectionalLight(0xfff8f2, 2.0);
    keyLight.position.set(3.8, 4.8, 3.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -2.5;
    keyLight.shadow.camera.right = 2.5;
    keyLight.shadow.camera.top = 2.5;
    keyLight.shadow.camera.bottom = -1.5;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // 2. Soft Ambient / Fill Light
    var hemiLight = new THREE.HemisphereLight(0x282d36, 0x101113, 1.25);
    scene.add(hemiLight);

    // 3. Subtle Warm Industrial Rim Light (Restrained & Elegant)
    var warmRim = new THREE.DirectionalLight(0xd96b32, 1.35);
    warmRim.position.set(-3.2, 2.8, -2.6);
    scene.add(warmRim);

    // --- Subtle Parallax Physics ---
    var mouseX = 0, mouseY = 0;
    var targetRotX = 0.05, targetRotY = -0.32;
    var baseRotY = -0.32;
    var time = 0;

    function onPointerMove(e) {
      var rect = container.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      var y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', function () {
      mouseX = 0;
      mouseY = 0;
    });

    // --- Entrance Animation with GSAP ---
    if (window.gsap && !reduce) {
      machine.position.y = -0.8;
      machine.rotation.y = -0.65;
      machine.scale.set(0.85, 0.85, 0.85);

      gsap.to(machine.position, { y: -0.3, duration: 1.4, ease: 'expo.out', delay: 0.2 });
      gsap.to(machine.rotation, { y: baseRotY, duration: 1.5, ease: 'expo.out', delay: 0.2 });
      gsap.to(machine.scale, { x: 1, y: 1, z: 1, duration: 1.4, ease: 'expo.out', delay: 0.2 });
    }

    // --- Viewport Visibility Observer ---
    var isVisible = true;
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    // --- Render Loop ---
    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      var delta = clock.getDelta();
      time += delta;

      // Gentle breathing idle float
      var floatOffset = Math.sin(time * 1.2) * 0.02;
      machine.position.y = -0.3 + floatOffset;

      // Slow continuous strap coil rotation
      coilMesh.rotation.x += 0.002;

      // Smooth mouse parallax with damping
      targetRotY = baseRotY + mouseX * 0.35;
      targetRotX = 0.05 - mouseY * 0.2;

      machine.rotation.y += (targetRotY - machine.rotation.y) * 0.05;
      machine.rotation.x += (targetRotX - machine.rotation.x) * 0.05;

      renderer.render(scene, camera);
    }

    animate();

    // --- Resize Handling ---
    function onResize() {
      if (!container) return;
      var w = container.clientWidth || 540;
      var h = container.clientHeight || 540;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }
})();
