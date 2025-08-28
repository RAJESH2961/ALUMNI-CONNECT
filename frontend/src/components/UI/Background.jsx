// src/components/UI/Background.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Background = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default Background;
