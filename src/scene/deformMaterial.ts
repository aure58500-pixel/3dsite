import { Color, MeshPhysicalMaterial } from 'three'
import type { IUniform } from 'three'

export interface DeformUniforms {
  uTime: IUniform<number>
  uDeform: IUniform<number>
}

export interface DeformMaterial {
  material: MeshPhysicalMaterial
  uniforms: DeformUniforms
}

const NOISE_GLSL = /* glsl */ `
uniform float uTime;
uniform float uDeform;

float hash3(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x),
        mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x),
        mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
`

/**
 * Matériau physique (verre ou métal brossé) dont les sommets sont déplacés
 * par un bruit pilotable via uDeform. Les normales ne sont pas recalculées,
 * l'amplitude reste faible pour que l'effet soit crédible.
 */
export function createDeformMaterial(glass: boolean, color: string): DeformMaterial {
  const uniforms: DeformUniforms = {
    uTime: { value: 0 },
    uDeform: { value: 0 },
  }

  const material = glass
    ? new MeshPhysicalMaterial({
        color: new Color('#ffffff'),
        transmission: 1,
        thickness: 0.8,
        roughness: 0.2,
        ior: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        attenuationColor: new Color(color),
        attenuationDistance: 2.5,
      })
    : new MeshPhysicalMaterial({
        color: new Color(color).lerp(new Color('#ffffff'), 0.55),
        metalness: 1,
        roughness: 0.4,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uDeform = uniforms.uDeform
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${NOISE_GLSL}`)
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float n = vnoise(position * 2.2 + vec3(uTime * 0.9)) - 0.5;
        transformed += normal * n * 0.9 * uDeform;`,
      )
  }

  return { material, uniforms }
}
