export function FallbackGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, rgba(255,90,31,0.22), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(108,123,255,0.16), transparent 60%), #07070A',
      }}
    />
  )
}
