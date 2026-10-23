import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import type { ModelEntry } from '../data/models';
import { disposeObject } from './dispose';
import { isProceduralId, proceduralFactories } from './procedural';

const TARGET_SIZE = 2.6;

export interface LoadedModel {
  object: THREE.Object3D;
  source: 'glb' | 'procedural';
  dispose: () => void;
}

function prepareModel(object: THREE.Object3D, entry: ModelEntry) {
  object.name = entry.key;
  object.rotation.y = entry.rotationY ?? 0;
  object.updateMatrixWorld(true);

  const initialBox = new THREE.Box3().setFromObject(object);
  const size = initialBox.getSize(new THREE.Vector3());
  const largest = Math.max(size.x, size.y, size.z);

  if (!Number.isFinite(largest) || largest <= 0) {
    throw new Error('Model 3D tidak memiliki geometri yang bisa ditampilkan.');
  }

  object.scale.multiplyScalar((TARGET_SIZE / largest) * (entry.scale ?? 1));
  object.updateMatrixWorld(true);

  const fitted = new THREE.Box3().setFromObject(object);
  object.position.x -= (fitted.min.x + fitted.max.x) / 2;
  object.position.z -= (fitted.min.z + fitted.max.z) / 2;
  object.position.y -= fitted.min.y;
  object.position.y += entry.yOffset ?? 0;
}

async function loadGlb(file: string) {
  const draco = new DRACOLoader();

  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  loader.setMeshoptDecoder(MeshoptDecoder);

  try {
    const gltf = await loader.loadAsync(file);
    return gltf.scene;
  } finally {
    draco.dispose();
  }
}

function createProcedural(entry: ModelEntry) {
  if (entry.fallback !== 'procedural' || !entry.proceduralId) {
    return null;
  }

  if (!isProceduralId(entry.proceduralId)) {
    return null;
  }

  return proceduralFactories[entry.proceduralId]();
}

export async function loadModel(entry: ModelEntry): Promise<LoadedModel | null> {
  let object: THREE.Object3D | null = null;
  let source: LoadedModel['source'] = 'procedural';

  if (entry.file) {
    try {
      object = await loadGlb(entry.file);
      source = 'glb';
    } catch {
      object = null;
    }
  }

  if (!object) {
    object = createProcedural(entry);
    source = 'procedural';
  }

  if (!object) {
    return null;
  }

  try {
    prepareModel(object, entry);
  } catch {
    disposeObject(object);
    return null;
  }

  const prepared = object;

  return {
    object: prepared,
    source,
    dispose: () => disposeObject(prepared),
  };
}
