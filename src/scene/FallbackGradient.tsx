export function FallbackGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 25% 15%, rgba(255,90,31,0.14), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(108,123,255,0.1), transparent 65%), #07070A',
      }}
    />
  )
}
