import { useMemo } from 'react'
import { Bloom, ChromaticAberration, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { Vector2 } from 'three'

export function Effects() {
  // Décalage inférieur à 0.002 pour rester subtil
  const offset = useMemo(() => new Vector2(0.0012, 0.0012), [])

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.45} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
      <Vignette offset={0.3} darkness={0.7} />
      <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}
