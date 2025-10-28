import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 20;
      posArray[i3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i3 + 2] = (Math.random() - 0.5) * 20;

      scaleArray[i] = Math.random() * 0.5 + 0.5;

      velocityArray[i3] = (Math.random() - 0.5) * 0.002;
      velocityArray[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocityArray[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      'scale',
      new THREE.BufferAttribute(scaleArray, 1)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00ffb2,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    const connectionGeometry = new THREE.BufferGeometry();
    const maxConnections = 200;
    const connectionPositions = new Float32Array(maxConnections * 6);
    connectionGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(connectionPositions, 3)
    );

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffb2,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const connectionLines = new THREE.LineSegments(
      connectionGeometry,
      connectionMaterial
    );
    scene.add(connectionLines);

    const geometry = new THREE.TorusGeometry(2, 0.4, 24, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffb2,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    const icosahedronGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d89e,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-3, 1.5, -2);
    scene.add(icosahedron);

    const octahedronGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c9a7,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(3, -1, -1.5);
    scene.add(octahedron);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      frameCount++;

      torus.rotation.x = elapsedTime * 0.08;
      torus.rotation.y = elapsedTime * 0.12;
      torus.rotation.z = elapsedTime * 0.04;

      icosahedron.rotation.x = -elapsedTime * 0.06;
      icosahedron.rotation.y = elapsedTime * 0.1;

      octahedron.rotation.x = elapsedTime * 0.09;
      octahedron.rotation.z = -elapsedTime * 0.07;

      const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocityArray[i3];
        positions[i3 + 1] += velocityArray[i3 + 1];
        positions[i3 + 2] += velocityArray[i3 + 2];

        if (Math.abs(positions[i3]) > 10) velocityArray[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 10) velocityArray[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 10) velocityArray[i3 + 2] *= -1;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      if (frameCount % 3 === 0) {
        let connectionIndex = 0;
        const maxDistance = 2;
        const connectionPos = connectionLines.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particlesCount && connectionIndex < maxConnections * 6; i++) {
          for (let j = i + 1; j < particlesCount && connectionIndex < maxConnections * 6; j++) {
            const i3 = i * 3;
            const j3 = j * 3;

            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < maxDistance) {
              connectionPos[connectionIndex] = positions[i3];
              connectionPos[connectionIndex + 1] = positions[i3 + 1];
              connectionPos[connectionIndex + 2] = positions[i3 + 2];
              connectionPos[connectionIndex + 3] = positions[j3];
              connectionPos[connectionIndex + 4] = positions[j3 + 1];
              connectionPos[connectionIndex + 5] = positions[j3 + 2];
              connectionIndex += 6;
            }
          }
        }

        connectionLines.geometry.setDrawRange(0, connectionIndex / 3);
        connectionLines.geometry.attributes.position.needsUpdate = true;
      }

      particlesMesh.rotation.y = elapsedTime * 0.015;

      targetX = mouseX * 0.4;
      targetY = mouseY * 0.4;

      camera.position.x += 0.03 * (targetX - camera.position.x);
      camera.position.y += 0.03 * (targetY - camera.position.y);
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      geometry.dispose();
      material.dispose();
      icosahedronGeometry.dispose();
      icosahedronMaterial.dispose();
      octahedronGeometry.dispose();
      octahedronMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          touchAction: 'auto',
        }}
      />
    </div>
  );
}
