// 'http://localhost:3000/computeCone'
// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import * as THREE from 'three';

function App() {
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [segments, setSegments] = useState('');
  const [triangles, setTriangles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  const handleCompute = async () => {
    setLoading(true);
    try {
      /*       const response = await axios.post('http://localhost:3000/computeCone', {
        height,
        radius,
        segments,
      }); */

      /* setTriangles(response.data.triangles); */
      renderCone(/* response.data.triangles */);
    } catch (error) {
      console.error('Error computing cone:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCone = (triangleData) => {
    console.log(scene);
    if (!scene || !camera || !renderer) return;

    while (scene.children.length) {
      scene.remove(scene.children[0]);
    }

    // Создаем конус
    const geometry = new THREE.ConeGeometry(radius, height, segments);
    const material = new THREE.MeshBasicMaterial({ color: 0x0790cd });
    const cone = new THREE.Mesh(geometry, material);

    scene.add(cone);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cone.rotation.x += 0.005;
      cone.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
  };

  return (
    <div className="App">
      <h1>3D Cone Viewer</h1>
      <form>
        <label htmlFor="height">Height:</label>
        <input
          type="number"
          id="height"
          step="0.1"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <br />

        <label htmlFor="radius">Radius:</label>
        <input
          type="number"
          id="radius"
          step="0.1"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          required
        />
        <br />

        <label htmlFor="segments">Segments:</label>
        <input
          type="number"
          id="segments"
          value={segments}
          onChange={(e) => setSegments(e.target.value)}
          required
        />
        <br />

        <button type="button" onClick={handleCompute} disabled={loading}>
          {loading ? 'Computing...' : 'Compute Cone'}
        </button>
      </form>

      <div
        id="viewer"
        ref={(ref) => {
          if (ref && !scene) {
            // Создать сцену
            const scene = new THREE.Scene();

            // Создать камеру
            const camera = new THREE.PerspectiveCamera(
              75,
              window.innerWidth / window.innerHeight,
              0.1,
              1000
            );
            camera.position.z = 5;

            // Создать рендерер
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            setScene(scene);
            setCamera(camera);
            setRenderer(renderer);
          }
        }}>
        {/* 3D-вид будет отображен здесь */}
      </div>
    </div>
  );
}

export default App;
