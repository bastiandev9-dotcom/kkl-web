import * as THREE from 'three';

function disposeMaterial(material: THREE.Material, textures: Set<THREE.Texture>) {
  for (const value of Object.values(material)) {
    if (value instanceof THREE.Texture && !textures.has(value)) {
      textures.add(value);
      value.dispose();
    }
  }

  material.dispose();
}

export function disposeObject(root: THREE.Object3D) {
  const textures = new Set<THREE.Texture>();

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];

    for (const material of materials) {
      disposeMaterial(material, textures);
    }
  });
}
