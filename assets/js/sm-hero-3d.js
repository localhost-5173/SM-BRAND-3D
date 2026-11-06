/* ============================================================
   SM BRAND — Three.js Hero 3D Industrial Strapping Machine
   Procedural high-fidelity 3D automatic strapping machine (SM-801 / SM-601 Pro)
   Features:
   - High-precision industrial cabinet with orange brand accents
   - Stainless steel roller table bed with cylindrical rollers
   - Structural overhead strapping arch with track channel & warning decals
   - Side-mounted strap dispenser reel with translucent flanges & orange PP coil
   - Operator control console with glowing backlit LCD & industrial buttons
   - Packaged carton box with strap wrapped tightly around it
   - Dual-color status beacon tower (Run/Ready)
   - Cinematic 3-point lighting + orange rim light + contact shadow plane
   - Interactive mouse parallax, continuous idle breathing, hover/click cycle pulse
   - Automatic WebGL detection and graceful fallback
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
      if (container) container.classList.add('fallback-mode');
      return;
    }

    var width = container.clientWidth || 560;
    var height = container.clientHeight || 560;

    // --- Scene, Camera, Renderer ---
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.4, 2.6, 4.4);
    camera.lookAt(0, 0.5, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Materials Palette ---
    var darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x14171d,
      roughness: 0.38,
      metalness: 0.72
    });

    var cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x181b22,
      roughness: 0.42,
      metalness: 0.65
    });

    var orangeAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff6b16,
      roughness: 0.28,
      metalness: 0.35,
      emissive: 0xff4800,
      emissiveIntensity: 0.15
    });

    var stainlessMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde4,
      roughness: 0.18,
      metalness: 0.92
    });

    var chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf0f2f5,
      roughness: 0.1,
      metalness: 0.98
    });

    var blackRubberMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0d,
      roughness: 0.85,
      metalness: 0.05
    });

    var strapOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xff7300,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0xff4000,
      emissiveIntensity: 0.22
    });

    var reelFlangeMat = new THREE.MeshPhysicalMaterial({
      color: 0xdde5ed,
      transparent: true,
      opacity: 0.55,
      roughness: 0.15,
      transmission: 0.4,
      metalness: 0.1
    });

    var screenMat = new THREE.MeshStandardMaterial({
      color: 0x051d1e,
      emissive: 0x0fe3d8,
      emissiveIntensity: 0.85,
      roughness: 0.2
    });

    var greenBtnMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      emissive: 0x22c55e,
      emissiveIntensity: 0.75,
      roughness: 0.3
    });

    var redBtnMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      emissive: 0xef4444,
      emissiveIntensity: 0.55,
      roughness: 0.3
    });

    var cartonMat = new THREE.MeshStandardMaterial({
      color: 0xc89d66,
      roughness: 0.78,
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

    // Front access door seam & handle
    var doorFaceGeo = new THREE.BoxGeometry(cabinetWidth * 0.75, cabinetHeight * 0.8, 0.02);
    var doorFaceMesh = new THREE.Mesh(doorFaceGeo, darkSteelMat);
    doorFaceMesh.position.set(0, cabinetHeight * 0.48, cabinetDepth / 2 + 0.012);
    doorFaceMesh.castShadow = true;
    machine.add(doorFaceMesh);

    var doorHandleGeo = new THREE.BoxGeometry(0.04, 0.22, 0.05);
    var doorHandle = new THREE.Mesh(doorHandleGeo, chromeMat);
    doorHandle.position.set(cabinetWidth * 0.28, cabinetHeight * 0.55, cabinetDepth / 2 + 0.04);
    machine.add(doorHandle);

    // Ventilation louvers on cabinet left
    for (var l = 0; l < 4; l++) {
      var louverGeo = new THREE.BoxGeometry(0.015, 0.02, 0.45);
      var louver = new THREE.Mesh(louverGeo, darkSteelMat);
      louver.position.set(-cabinetWidth / 2 - 0.008, 0.35 + l * 0.08, 0);
      machine.add(louver);
    }

    // Orange Brand Accent Trim (horizontal racing stripe on cabinet)
    var trimGeo = new THREE.BoxGeometry(cabinetWidth + 0.02, 0.06, cabinetDepth + 0.02);
    var trimMesh = new THREE.Mesh(trimGeo, orangeAccentMat);
    trimMesh.position.y = cabinetHeight * 0.88;
    machine.add(trimMesh);

    // Brand Plate on Cabinet
    var brandPlateGeo = new THREE.BoxGeometry(0.38, 0.1, 0.015);
    var brandPlate = new THREE.Mesh(brandPlateGeo, darkSteelMat);
    brandPlate.position.set(-0.25, cabinetHeight * 0.75, cabinetDepth / 2 + 0.02);
    machine.add(brandPlate);

    // 2. Corner Legs with Industrial Casters
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

      var wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 18);
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

    // Stainless Rollers on table bed
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
      // Leave gap for central strapping slit
      if (Math.abs(zPos) > 0.08) {
        rollerMesh.position.set(0, cabinetHeight + tableThick + rollerRadius * 0.7, zPos);
        rollerMesh.castShadow = true;
        rollerGroup.add(rollerMesh);
      }
    }
    machine.add(rollerGroup);

    // Central Strapping Track Slit on Table
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

    // Left arch column
    var leftColGeo = new THREE.BoxGeometry(archThickness, archHeight, archBeamDepth);
    var leftCol = new THREE.Mesh(leftColGeo, darkSteelMat);
    leftCol.position.set(-archSpan / 2, cabinetHeight + archHeight / 2, 0);
    leftCol.castShadow = true;
    archGroup.add(leftCol);

    // Right arch column
    var rightColGeo = new THREE.BoxGeometry(archThickness, archHeight, archBeamDepth);
    var rightCol = new THREE.Mesh(rightColGeo, darkSteelMat);
    rightCol.position.set(archSpan / 2, cabinetHeight + archHeight / 2, 0);
    rightCol.castShadow = true;
    archGroup.add(rightCol);

    // Top arch crossbeam
    var topBeamGeo = new THREE.BoxGeometry(archSpan + archThickness, archThickness, archBeamDepth);
    var topBeam = new THREE.Mesh(topBeamGeo, darkSteelMat);
    topBeam.position.set(0, cabinetHeight + archHeight - archThickness / 2, 0);
    topBeam.castShadow = true;
    archGroup.add(topBeam);

    // Interior Arch Guide Track (Orange neon inner guide channel)
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

    // Arch Corner Brackets with orange accent chamfers
    var bracketLeftGeo = new THREE.BoxGeometry(0.12, 0.12, archBeamDepth + 0.01);
    var bracketLeft = new THREE.Mesh(bracketLeftGeo, orangeAccentMat);
    bracketLeft.position.set(-archSpan / 2, cabinetHeight + archHeight - archThickness / 2, 0);
    archGroup.add(bracketLeft);

    var bracketRight = bracketLeft.clone();
    bracketRight.position.x = archSpan / 2;
    archGroup.add(bracketRight);

    // 5. Dual-Color Status Beacon Light Tower on top of Arch
    var beaconBaseGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16);
    var beaconBase = new THREE.Mesh(beaconBaseGeo, chromeMat);
    beaconBase.position.set(archSpan / 2, cabinetHeight + archHeight + 0.03, 0);
    archGroup.add(beaconBase);

    var beaconRunGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.07, 16);
    var beaconRunMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.95,
      roughness: 0.1
    });
    var beaconRun = new THREE.Mesh(beaconRunGeo, beaconRunMat);
    beaconRun.position.set(archSpan / 2, cabinetHeight + archHeight + 0.09, 0);
    archGroup.add(beaconRun);

    var beaconAmberGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.05, 16);
    var beaconAmberMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8c00,
      emissiveIntensity: 0.6,
      roughness: 0.1
    });
    var beaconAmber = new THREE.Mesh(beaconAmberGeo, beaconAmberMat);
    beaconAmber.position.set(archSpan / 2, cabinetHeight + archHeight + 0.15, 0);
    archGroup.add(beaconAmber);

    machine.add(archGroup);

    // 6. Side-Mounted Strap Dispenser Reel Assembly
    var reelGroup = new THREE.Group();
    var reelRadius = 0.38;
    var reelWidth = 0.16;
    var reelCenter = new THREE.Vector3(-cabinetWidth / 2 - 0.16, cabinetHeight * 0.46, 0);

    // Spindle / Mounting Arm from cabinet
    var armGeo = new THREE.BoxGeometry(0.18, 0.08, 0.08);
    var armMesh = new THREE.Mesh(armGeo, darkSteelMat);
    armMesh.position.set(reelCenter.x + 0.08, reelCenter.y, reelCenter.z);
    armMesh.castShadow = true;
    reelGroup.add(armMesh);

    // Spindle shaft
    var spindleGeo = new THREE.CylinderGeometry(0.045, 0.045, reelWidth + 0.08, 20);
    spindleGeo.rotateZ(Math.PI / 2);
    var spindle = new THREE.Mesh(spindleGeo, chromeMat);
    spindle.position.copy(reelCenter);
    reelGroup.add(spindle);

    // Outer Flange Discs (translucent polycarbonate look)
    var flangeGeo = new THREE.CylinderGeometry(reelRadius, reelRadius, 0.012, 32);
    flangeGeo.rotateZ(Math.PI / 2);
    var flangeOuter = new THREE.Mesh(flangeGeo, reelFlangeMat);
    flangeOuter.position.set(reelCenter.x - reelWidth / 2, reelCenter.y, reelCenter.z);
    reelGroup.add(flangeOuter);

    var flangeInner = new THREE.Mesh(flangeGeo, reelFlangeMat);
    flangeInner.position.set(reelCenter.x + reelWidth / 2, reelCenter.y, reelCenter.z);
    reelGroup.add(flangeInner);

    // Polypropylene Strapping Coil (Bright Orange)
    var coilInnerR = 0.14;
    var coilOuterR = 0.34;
    var coilGeo = new THREE.CylinderGeometry(coilOuterR, coilOuterR, reelWidth * 0.9, 32);
    coilGeo.rotateZ(Math.PI / 2);
    var coilMesh = new THREE.Mesh(coilGeo, strapOrangeMat);
    coilMesh.position.copy(reelCenter);
    coilMesh.castShadow = true;
    reelGroup.add(coilMesh);

    // Dancer arm & guide rollers
    var dancerGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.28, 12);
    dancerGeo.rotateZ(Math.PI / 4);
    var dancerArm = new THREE.Mesh(dancerGeo, chromeMat);
    dancerArm.position.set(reelCenter.x, reelCenter.y + 0.32, reelCenter.z + 0.12);
    reelGroup.add(dancerArm);

    var guideRollerGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.05, 16);
    guideRollerGeo.rotateZ(Math.PI / 2);
    var guideRoller = new THREE.Mesh(guideRollerGeo, orangeAccentMat);
    guideRoller.position.set(reelCenter.x + 0.09, reelCenter.y + 0.42, reelCenter.z + 0.2);
    reelGroup.add(guideRoller);

    machine.add(reelGroup);

    // 7. Operator Control Console on Front
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

    // Backlit LCD Display Screen
    var lcdGeo = new THREE.BoxGeometry(0.24, 0.1, 0.015);
    var lcdMesh = new THREE.Mesh(lcdGeo, screenMat);
    lcdMesh.position.set(-0.1, 0.04, consoleDepth / 2 + 0.008);
    consoleMesh.add(lcdMesh);

    // Green Start Button
    var startBtnGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.025, 16);
    startBtnGeo.rotateX(Math.PI / 2);
    var startBtn = new THREE.Mesh(startBtnGeo, greenBtnMat);
    startBtn.position.set(0.12, 0.04, consoleDepth / 2 + 0.012);
    consoleMesh.add(startBtn);

    // Emergency Stop Mushroom Button (Red on Yellow ring)
    var eStopBaseGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 16);
    eStopBaseGeo.rotateX(Math.PI / 2);
    var eStopBaseMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
    var eStopBase = new THREE.Mesh(eStopBaseGeo, eStopBaseMat);
    eStopBase.position.set(0.18, -0.05, consoleDepth / 2 + 0.01);
    consoleMesh.add(eStopBase);

    var eStopCapGeo = new THREE.CylinderGeometry(0.042, 0.03, 0.03, 16);
    eStopCapGeo.rotateX(Math.PI / 2);
    var eStopCap = new THREE.Mesh(eStopCapGeo, redBtnMat);
    eStopCap.position.set(0.18, -0.05, consoleDepth / 2 + 0.028);
    consoleMesh.add(eStopCap);

    machine.add(consoleGroup);

    // 8. Packaged Carton Box on Table (Inside Arch)
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

    // Box Tape Seam
    var tapeGeo = new THREE.BoxGeometry(boxWidth + 0.004, 0.045, boxDepth + 0.004);
    var tapeMat = new THREE.MeshStandardMaterial({ color: 0xd4a359, roughness: 0.5 });
    var tape = new THREE.Mesh(tapeGeo, tapeMat);
    tape.position.copy(boxMesh.position);
    boxGroup.add(tape);

    // Strapping band wrapped tightly around the box
    var strapBandGeo = new THREE.BoxGeometry(0.03, boxHeight + 0.012, boxDepth + 0.012);
    var strapBand = new THREE.Mesh(strapBandGeo, strapOrangeMat);
    strapBand.position.copy(boxMesh.position);
    boxGroup.add(strapBand);

    machine.add(boxGroup);

    // 9. Soft Contact Floor Shadow Plane
    var shadowGeo = new THREE.PlaneGeometry(3.6, 2.8);
    var shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    var sctx = shadowCanvas.getContext('2d');
    var sgrad = sctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    sgrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    sgrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
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

    // 10. Subtle Floating Industrial Sparkles / Dust in 3D Space
    var particleCount = 45;
    var particleGeo = new THREE.BufferGeometry();
    var particlePos = new Float32Array(particleCount * 3);
    for (var p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 5;
      particlePos[p * 3 + 1] = Math.random() * 3 - 0.2;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    var particleMat = new THREE.PointsMaterial({
      color: 0xff9944,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    var particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Cinematic Lights ---
    // 1. Key Directional Light (Warm White)
    var keyLight = new THREE.DirectionalLight(0xfff6ea, 2.4);
    keyLight.position.set(4, 5, 4);
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

    // 2. High-Impact Orange Rim Light (Back-Left)
    var orangeRim = new THREE.SpotLight(0xff6b16, 4.8, 12, Math.PI / 3, 0.45);
    orangeRim.position.set(-3.5, 3.2, -2.8);
    orangeRim.target = machine;
    scene.add(orangeRim);

    // 3. Ambient / Fill Light
    var hemiLight = new THREE.HemisphereLight(0x283244, 0x08090c, 1.35);
    scene.add(hemiLight);

    // 4. Subtle Orange Table Spot
    var orangeAccentLight = new THREE.PointLight(0xff7a28, 1.8, 4.5);
    orangeAccentLight.position.set(0.6, 1.8, 1.4);
    scene.add(orangeAccentLight);

    // --- Interactive Mouse & Rotation Physics ---
    var mouseX = 0, mouseY = 0;
    var targetRotX = 0.05, targetRotY = -0.35;
    var baseRotY = -0.35;
    var time = 0;
    var isHovered = false;
    var isCycleActive = false;

    function onPointerMove(e) {
      var rect = container.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      var y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', function () { isHovered = true; });
    container.addEventListener('pointerleave', function () {
      isHovered = false;
      mouseX = 0;
      mouseY = 0;
    });

    // Trigger cycle animation on click or badge click
    function triggerStrappingCycle() {
      if (isCycleActive) return;
      isCycleActive = true;

      // Pulse reel rotation, beacon flash, arch glow
      if (window.gsap) {
        gsap.to(coilMesh.rotation, { x: coilMesh.rotation.x + Math.PI * 2, duration: 1.2, ease: 'power2.inOut' });
        gsap.to(strapOrangeMat, { emissiveIntensity: 1.5, duration: 0.3, yoyo: true, repeat: 3 });
        gsap.to(beaconRunMat, { emissiveIntensity: 2.2, duration: 0.2, yoyo: true, repeat: 5, onComplete: function () {
          beaconRunMat.emissiveIntensity = 0.95;
          strapOrangeMat.emissiveIntensity = 0.22;
          isCycleActive = false;
        }});
      } else {
        setTimeout(function () { isCycleActive = false; }, 1200);
      }
    }

    container.addEventListener('click', triggerStrappingCycle);
    window.SM = window.SM || {};
    window.SM.trigger3DCycle = triggerStrappingCycle;

    // --- Entrance Animation with GSAP ---
    if (window.gsap && !reduce) {
      machine.position.y = -1.2;
      machine.rotation.y = -0.9;
      machine.scale.set(0.7, 0.7, 0.7);
      keyLight.intensity = 0;
      orangeRim.intensity = 0;

      gsap.to(machine.position, { y: -0.3, duration: 1.6, ease: 'expo.out', delay: 0.3 });
      gsap.to(machine.rotation, { y: baseRotY, duration: 1.8, ease: 'expo.out', delay: 0.3 });
      gsap.to(machine.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'expo.out', delay: 0.3 });
      gsap.to(keyLight, { intensity: 2.4, duration: 1.4, delay: 0.5 });
      gsap.to(orangeRim, { intensity: 4.8, duration: 1.4, delay: 0.5 });
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

      // Gentle floating / idle breathing
      var floatOffset = Math.sin(time * 1.5) * 0.035;
      machine.position.y = -0.3 + floatOffset;

      // Gentle coil slow rotation
      coilMesh.rotation.x += 0.003;

      // Particles float upward
      var positions = particleGeo.attributes.position.array;
      for (var i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.0035;
        if (positions[i] > 2.8) positions[i] = -0.2;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth mouse parallax lerp
      targetRotY = baseRotY + mouseX * 0.45;
      targetRotX = 0.05 - mouseY * 0.28;

      machine.rotation.y += (targetRotY - machine.rotation.y) * 0.06;
      machine.rotation.x += (targetRotX - machine.rotation.x) * 0.06;

      renderer.render(scene, camera);
    }

    animate();

    // --- Resize Handling ---
    function onResize() {
      if (!container) return;
      var w = container.clientWidth || 560;
      var h = container.clientHeight || 560;
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
