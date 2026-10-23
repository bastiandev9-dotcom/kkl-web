import * as THREE from 'three';

export function createPenjor(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'procedural-penjor';

  const bamboo = new THREE.MeshStandardMaterial({ color: 0x8a8b4a, roughness: 0.8 });
  const leaf = new THREE.MeshStandardMaterial({ color: 0x4a6741, roughness: 0.9 });
  const cloth = new THREE.MeshStandardMaterial({
    color: 0xd9f18a,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const white = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const wood = new THREE.MeshStandardMaterial({ color: 0x7d4b32, roughness: 0.95 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 0.18, 12), wood);
  base.position.y = 0.09;
  group.add(base);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 3.2, 10), bamboo);
  pole.position.y = 1.75;
  group.add(pole);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 3.25, 0),
    new THREE.Vector3(0, 3.58, 0.12),
    new THREE.Vector3(0, 3.68, 0.48),
    new THREE.Vector3(0, 3.45, 0.76),
  ]);
  const arch = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.045, 7, false), bamboo);
  group.add(arch);

  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.32, 8), leaf);
  tip.position.set(0, 3.38, 0.82);
  tip.rotation.x = -Math.PI / 2;
  group.add(tip);

  for (let index = 0; index < 7; index += 1) {
    const height = 0.72 + index * 0.34;
    const side = index % 2 === 0 ? 1 : -1;
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.34), index % 3 === 0 ? cloth : white);
    strip.position.set(side * 0.1, height, 0.02);
    strip.rotation.y = Math.PI / 2;
    strip.rotation.z = side * 0.16;
    group.add(strip);
  }

  const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.04, 0.38, 8), cloth);
  tassel.position.set(0, 2.95, 0.03);
  group.add(tassel);

  for (let index = 0; index < 4; index += 1) {
    const leafMesh = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.7, 5), leaf);
    leafMesh.position.set(0, 3.18 + index * 0.06, -0.16 - index * 0.06);
    leafMesh.rotation.x = -0.5 - index * 0.08;
    leafMesh.rotation.z = (index - 1.5) * 0.25;
    group.add(leafMesh);
  }

  return group;
}
