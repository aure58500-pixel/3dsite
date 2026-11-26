import { Component, type ErrorInfo, type ReactNode } from 'react'
import { BRAND_NAME } from '../config/brand'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/** Dernier filet de sécurité : page statique lisible si l'application plante */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Erreur fatale', error, info.componentStack)
  }

  render(): ReactNode {
    if (!this.state.failed) return this.props.children
    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '24px',
          textAlign: 'center',
          background: '#07070A',
          color: '#EDEDE8',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '28px', margin: 0 }}>{BRAND_NAME}</h1>
        <p style={{ margin: 0, opacity: 0.8, maxWidth: '420px' }}>
          Le site n’a pas pu s’afficher correctement. Rechargez la page pour réessayer.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            border: '1px solid #EDEDE8',
            borderRadius: '999px',
            background: 'transparent',
            color: '#EDEDE8',
            fontSize: '16px',
          }}
        >
          Recharger
        </button>
      </div>
    )
  }
}
