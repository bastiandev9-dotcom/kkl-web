import * as THREE from 'three';

export function createCandiBentar(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'procedural-candi-bentar';

  const brick = new THREE.MeshStandardMaterial({ color: 0x9b5a3c, roughness: 0.9 });
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x66412f, roughness: 0.95 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.22, 1.3), stone);
  base.position.y = 0.11;
  group.add(base);

  const buildSide = (x: number) => {
    let y = 0.22;

    for (let index = 0; index < 5; index += 1) {
      const width = 0.95 - index * 0.09;
      const height = 0.48 - index * 0.045;

      const block = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.92 - index * 0.07),
        index === 1 ? dark : brick,
      );
      block.position.set(x, y + height / 2, 0);
      group.add(block);
      y += height + 0.025;
    }

    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), stone);
    cap.position.set(x, y + 0.16, 0);
    cap.rotation.y = Math.PI / 4;
    group.add(cap);

    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 4), stone);
    finial.position.set(x, y + 0.46, 0);
    finial.rotation.y = Math.PI / 4;
    group.add(finial);
  };

  buildSide(-1.15);
  buildSide(1.15);

  const stair = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.95), stone);
  stair.position.set(0, 0.3, 0.02);
  group.add(stair);

  const landing = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 1.1), stone);
  landing.position.set(0, 0.18, 0.02);
  group.add(landing);

  return group;
}
