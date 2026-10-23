import * as THREE from 'three';

export function createMeru(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'procedural-meru';

  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.85 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x7d4b32, roughness: 0.8 });
  const thatch = new THREE.MeshStandardMaterial({ color: 0x3d4a3a, roughness: 0.95 });
  const gold = new THREE.MeshStandardMaterial({
    color: 0xc8a24a,
    metalness: 0.35,
    roughness: 0.4,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.22, 2.1), stone);
  base.position.y = 0.11;
  group.add(base);

  const step = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 1.7), stone);
  step.position.y = 0.28;
  group.add(step);

  let y = 0.34;

  for (let index = 0; index < 7; index += 1) {
    const width = 1.65 - index * 0.15;
    const depth = 1.25 - index * 0.11;
    const bodyHeight = 0.3;

    const body = new THREE.Mesh(new THREE.BoxGeometry(width, bodyHeight, depth), wood);
    body.position.y = y + bodyHeight / 2;
    group.add(body);

    if (index === 0) {
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.4, 0.03), thatch);
      door.position.set(0, y + bodyHeight / 2, depth / 2 + 0.015);
      group.add(door);
    }

    y += bodyHeight;

    const roof = new THREE.Mesh(new THREE.ConeGeometry(width * 0.88, 0.3, 4), thatch);
    roof.position.y = y + 0.15;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    y += 0.3;
  }

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.11, 0.55, 8), gold);
  spire.position.y = y + 0.275;
  group.add(spire);

  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 8), gold);
  finial.position.y = y + 0.58;
  group.add(finial);

  return group;
}
